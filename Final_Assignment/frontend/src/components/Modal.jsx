import { useState, useEffect } from "react";
import "../styles/modal.css";

function Modal({
    isOpen,
    onClose,
    onSave,
    type = "event", 
    editingEvent = null // 1. ĐÃ SỬA: Đổi tên prop cho khớp với SuKien.jsx truyền xuống
}) {
    // Hàm phụ trợ: Format ngày giờ từ MongoDB ra chuẩn HTML5 datetime-local (YYYY-MM-DDThh:mm)
    const formatDateTimeLocal = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Trừ đi offset để lấy đúng giờ Local, tránh bị lệch múi giờ (UTC)
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    // Khởi tạo state với các giá trị rỗng mặc định
    const [form, setForm] = useState({
        title: "",
        description: "",
        start: "", 
        end: "",   
        location: "",
        category: "Ăn uống", 
        status: "Sắp tới", 
        members: [],
        cost: "",
        payer: "",
        name: "",
        email: "",
        password: "",
        role: "Thành viên",
        amount: "",
        expenseTitle: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    // 2. ĐÃ THÊM: Theo dõi biến editingEvent, nếu có dữ liệu thì nạp vào form
    useEffect(() => {
        if (editingEvent) {
            setForm({
                ...form,
                title: editingEvent.title || "",
                description: editingEvent.description || "",
                // Áp dụng hàm format thời gian
                start: formatDateTimeLocal(editingEvent.startTime),
                end: formatDateTimeLocal(editingEvent.endTime),
                location: editingEvent.location || "",
                category: editingEvent.type || "Ăn uống",
                status: editingEvent.status || "Sắp tới",
                cost: editingEvent.cost || "",
                // Nếu payer đã được populate ở Backend, nó sẽ là object. Cần lấy _id
                payer: editingEvent.payer?._id || editingEvent.payer || ""
            });
        }
    }, [editingEvent]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleMembersChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setForm({ ...form, members: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";
            
            let url = "";
            let method = "POST";
            let bodyData = {};

            if (type === "member") {
                url = `${apiUrl}/api/users`;
                bodyData = {
                    name: form.name,
                    email: form.email,
                    password: form.password || "123456",
                    role: form.role
                };
            } else if (type === "expense") {
                url = `${apiUrl}/api/expenses`;
                bodyData = {
                    title: form.expenseTitle,
                    amount: Number(form.amount),
                    payer: form.payer
                };
            } else {
                // Sự kiện: Kiểm tra nếu có editingEvent thì là PUT, không thì POST
                url = editingEvent ? `${apiUrl}/api/events/${editingEvent._id}` : `${apiUrl}/api/events`;
                method = editingEvent ? "PUT" : "POST";
                
                bodyData = {
                    title: form.title,
                    type: form.category,       
                    startTime: form.start,     
                    endTime: form.end,         
                    location: form.location,
                    status: form.status,
                    description: form.description
                };

                if (form.cost) {
                    bodyData.cost = Number(form.cost);
                }

                if (form.payer && form.payer.trim() !== "") {
                    bodyData.payer = form.payer;
                }
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
                onSave(); 
                onClose(); 
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
                        {type === "event" && (editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện")}
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
                                <input type="text" name="name" placeholder="Nhập tên thành viên" value={form.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input type="email" name="email" placeholder="email@example.com" value={form.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Mật khẩu khởi tạo</label>
                                <input type="password" name="password" placeholder="Mặc định: 123456" value={form.password} onChange={handleChange} />
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
                                <input type="text" name="expenseTitle" placeholder="Ví dụ: Ăn hải sản Mỹ Khê" value={form.expenseTitle} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Số tiền (VNĐ) *</label>
                                <input type="number" name="amount" placeholder="Ví dụ: 500000" value={form.amount} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Người chi trả</label>
                                <input type="text" name="payer" placeholder="Tên người thanh toán" value={form.payer} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* FORM SỰ KIỆN */}
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
                                        <option value="Ăn uống">Ăn uống</option>
                                        <option value="Ngắm cảnh">Ngắm cảnh</option>
                                        <option value="Bonding">Bonding</option>
                                        <option value="Di chuyển">Di chuyển</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Giờ bắt đầu *</label>
                                    <input type="datetime-local" name="start" value={form.start} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label>Giờ kết thúc *</label>
                                    <input type="datetime-local" name="end" value={form.end} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label>Địa điểm</label>
                                    <input type="text" name="location" value={form.location} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Trạng thái</label>
                                    {/* 3. ĐÃ SỬA: Cập nhật các option chuẩn theo Backend Enum */}
                                    <select name="status" value={form.status} onChange={handleChange}>
                                        <option value="Chờ duyệt">Chờ duyệt</option>
                                        <option value="Sắp tới">Sắp tới</option>
                                        <option value="Đang diễn ra">Đang diễn ra</option>
                                        <option value="Đã xong">Đã xong</option>
                                        <option value="Tạm hoãn">Tạm hoãn</option>
                                        <option value="Hủy">Hủy</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Chi phí dự kiến (VNĐ)</label>
                                    <input type="number" name="cost" placeholder="VD: 500000" value={form.cost} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Người phụ trách/Chi trả</label>
                                    <input type="text" name="payer" placeholder="Nhập tên người phụ trách" value={form.payer} onChange={handleChange} />
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