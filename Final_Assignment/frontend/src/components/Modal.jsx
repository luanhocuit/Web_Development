import { useState } from "react";
import "../styles/modal.css";

function Modal({
    isOpen,
    onClose,
    onSave,
    type = "event", // "event", "member", hoặc "expense"
    event = null
}) {
    // State chung cho các loại form
    const [form, setForm] = useState({
        title: event?.title || "",
        description: event?.description || "",
        start: event?.start || "",
        end: event?.end || "",
        location: event?.location || "",
        category: event?.category || "Ăn uống",
        status: event?.status || "Sắp diễn ra",
        members: event?.members || [],
        cost: event?.cost || "",
        payer: event?.payer || "",
        // Thêm trường cho Thành viên mới
        name: "",
        email: "",
        password: "",
        role: "Thành viên",
        // Thêm trường cho Khoản chi mới
        amount: "",
        expenseTitle: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleMembersChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setForm({
            ...form,
            members: selectedOptions
        });
    };

    // Xử lý gửi API tùy theo loại Modal (Event, Member, hay Expense)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL;
            
            let url = "";
            let method = "POST";
            let bodyData = {};

            if (type === "member") {
                url = `${apiUrl}/api/users`; // API thêm thành viên
                bodyData = {
                    name: form.name,
                    email: form.email,
                    password: form.password || "123456", // Mật khẩu mặc định nếu không nhập
                    role: form.role
                };
            } else if (type === "expense") {
                url = `${apiUrl}/api/expenses`; // API thêm khoản chi
                bodyData = {
                    title: form.expenseTitle,
                    amount: Number(form.amount),
                    payer: form.payer
                };
            } else {
                // Mặc định là Sự kiện
                url = event ? `${apiUrl}/api/events/${event._id}` : `${apiUrl}/api/events`;
                method = event ? "PUT" : "POST";
                bodyData = form;
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });

            if (response.ok) {
                onSave(); // Load lại dữ liệu trang cha
                onClose(); // Đóng modal
            } else {
                const data = await response.json();
                alert(`Lỗi: ${data.message || "Không thể thực hiện thao tác"}`);
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Lỗi kết nối đến máy chủ!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="event-modal">
                <div className="modal-header">
                    <h2>
                        {type === "member" && "Thêm thành viên mới"}
                        {type === "expense" && "Thêm khoản chi tiêu"}
                        {type === "event" && (event ? "Chỉnh sửa sự kiện" : "Thêm sự kiện")}
                    </h2>
                    <button className="close-btn" onClick={onClose} disabled={isLoading}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* FORM THÊM THÀNH VIÊN */}
                    {type === "member" && (
                        <div className="form-grid">
                            <div>
                                <label>Họ và tên *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập tên thành viên"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Mật khẩu khởi tạo</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mặc định: 123456"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Vai trò</label>
                                <select name="role" value={form.role} onChange={handleChange}>
                                    <option value="Thành viên">Thành viên</option>
                                    <option value="Lead">Trưởng nhóm</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* FORM THÊM KHOẢN CHI */}
                    {type === "expense" && (
                        <div className="form-grid">
                            <div className="full-width">
                                <label>Tên khoản chi *</label>
                                <input
                                    type="text"
                                    name="expenseTitle"
                                    placeholder="Ví dụ: Ăn hải sản Mỹ Khê"
                                    value={form.expenseTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Số tiền (VNĐ) *</label>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Ví dụ: 500000"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Người chi trả</label>
                                <input
                                    type="text"
                                    name="payer"
                                    placeholder="Tên người thanh toán"
                                    value={form.payer}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* FORM SỰ KIỆN (Mặc định) */}
                    {type === "event" && (
                        <>
                            <div className="form-grid">
                                <div>
                                    <label>Tiêu đề *</label>
                                    <input type="text" name="title" value={form.title} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label>Loại hoạt động</label>
                                    <select name="category" value={form.category} onChange={handleChange}>
                                        <option>Ăn uống</option>
                                        <option>Ngắm cảnh</option>
                                        <option>Bonding</option>
                                        <option>Di chuyển</option>
                                        <option>Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Giờ bắt đầu</label>
                                    <input type="time" name="start" value={form.start} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Giờ kết thúc</label>
                                    <input type="time" name="end" value={form.end} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Địa điểm</label>
                                    <input type="text" name="location" value={form.location} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Trạng thái</label>
                                    <select name="status" value={form.status} onChange={handleChange}>
                                        <option>Sắp diễn ra</option>
                                        <option>Đang diễn ra</option>
                                        <option>Đã hoàn thành</option>
                                        <option>Tạm hoãn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="full-width">
                                <label>Mô tả</label>
                                <textarea name="description" value={form.description} onChange={handleChange} />
                            </div>
                        </>
                    )}

                    <div className="modal-footer" style={{ marginTop: "20px" }}>
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={isLoading}>
                            Hủy
                        </button>
                        <button type="submit" className="save-btn" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Lưu lại"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;