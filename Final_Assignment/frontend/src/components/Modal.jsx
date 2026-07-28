import { useState } from "react";
import "../styles/modal.css";

function Modal({
    isOpen,
    onClose,
    onSave,
    event = null
}) {
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
        payer: event?.payer || ""
    });

    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Hàm riêng để xử lý việc chọn nhiều thành viên trong <select multiple>
    const handleMembersChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setForm({
            ...form,
            members: selectedOptions
        });
    };

    // Xử lý gửi API lên Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            
            // Tự động nhận diện: Nếu có truyền event vào thì là Sửa (PUT), không thì là Thêm mới (POST)
            const url = event 
                ? `https://final-assignment-x6nf.onrender.com/api/events/${event._id}` 
                : "https://final-assignment-x6nf.onrender.com/api/events";
            
            const method = event ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                // Thành công thì gọi onSave để reload lại danh sách ở SuKien.jsx, sau đó đóng Modal
                onSave();
                onClose();
            } else {
                const data = await response.json();
                alert(`Lỗi: ${data.message || "Không thể lưu sự kiện"}`);
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
                        {event ? "Chỉnh sửa sự kiện" : "Thêm sự kiện"}
                    </h2>
                    <button className="close-btn" onClick={onClose} disabled={isLoading}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div>
                            <label>Tiêu đề *</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Loại hoạt động</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option>Ăn uống</option>
                                <option>Ngắm cảnh</option>
                                <option>Bonding</option>
                                <option>Di chuyển</option>
                                <option>Khác</option>
                            </select>
                        </div>
                        <div>
                            <label>Giờ bắt đầu</label>
                            <input
                                type="time"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Giờ kết thúc</label>
                            <input
                                type="time"
                                name="end"
                                value={form.end}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Địa điểm</label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Trạng thái</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option>Sắp diễn ra</option>
                                <option>Đang diễn ra</option>
                                <option>Đã hoàn thành</option>
                                <option>Tạm hoãn</option>
                                <option>Hủy</option>
                            </select>
                        </div>
                        <div>
                            <label>Chi phí (VNĐ)</label>
                            <input
                                type="number"
                                name="cost"
                                value={form.cost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Người thanh toán</label>
                            <input
                                type="text"
                                name="payer"
                                value={form.payer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="full-width">
                        <label>Mô tả</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="full-width">
                        <label>Thành viên tham gia</label>
                        <select 
                            multiple 
                            name="members"
                            value={form.members}
                            onChange={handleMembersChange}
                            style={{ height: '80px' }}
                        >
                            <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                            <option value="Trần Văn B">Trần Văn B</option>
                            <option value="Lê Văn C">Lê Văn C</option>
                            <option value="Phạm Văn D">Phạm Văn D</option>
                        </select>
                        <small style={{ color: '#666', fontSize: '12px' }}>* Giữ Ctrl (hoặc Cmd) để chọn nhiều người</small>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="save-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Lưu sự kiện"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;