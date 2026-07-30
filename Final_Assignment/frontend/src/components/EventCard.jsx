import {
    FaClock,
    FaMapMarkerAlt,
    FaTag,
    FaUsers,
    FaMoneyBillWave,
    FaUserTie,
    FaCheckCircle,
    FaArrowUp,
    FaArrowDown,
    FaEdit,
    FaTrash
} from "react-icons/fa";

function EventCard({ event, onEdit, onDelete }) {
    // 1. Cập nhật lại switch/case cho khớp với Enum status của Backend
    const getStatusClass = (status) => {
        switch (status) {
            case "Đang diễn ra":
                return "badge badge-success";
            case "Sắp tới":
                return "badge badge-info";
            case "Đã xong":
                return "badge badge-warning";
            case "Tạm hoãn":
                return "badge badge-secondary";
            case "Hủy":
                return "badge badge-danger";
            case "Chờ duyệt":
                return "badge badge-dark"; // Bạn có thể CSS thêm class này
            default:
                return "badge";
        }
    };

    // Hàm phụ: Format ngày giờ từ MongoDB (ISO String) sang HH:MM DD/MM/YYYY
    const formatTime = (dateString) => {
        if (!dateString) return "--:--";
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="event-card">
            <div className="event-header">
                <div>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </div>
                <span className={getStatusClass(event.status)}>
                    {event.status}
                </span>
            </div>
            <div className="event-body">
                <div className="event-item">
                    <FaClock />
                    <span>
                        {/* Đổi thành startTime và endTime */}
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                </div>
                <div className="event-item">
                    <FaMapMarkerAlt />
                    <span>{event.location || "Chưa xác định"}</span>
                </div>
                <div className="event-item">
                    <FaTag />
                    {/* Đổi category thành type */}
                    <span>{event.type || "Chung"}</span>
                </div>
                <div className="event-item">
                    <FaUsers />
                    <span>
                        {/* Đổi members thành assignees, và lấy name vì đã được populate */}
                        {event.assignees && event.assignees.length > 0
                            ? event.assignees.map(user => user.name).join(", ")
                            : "Cả nhóm"}
                    </span>
                </div>
                <div className="event-item">
                    <FaMoneyBillWave />
                    <span>
                        {event.cost ? event.cost.toLocaleString() : 0} VNĐ
                    </span>
                </div>
                <div className="event-item">
                    <FaUserTie />
                    {/* Lấy name của payer vì đã được populate */}
                    <span>{event.payer?.name || "Chưa có"}</span>
                </div>
            </div>
            <div className="event-footer">
                <div className="left-actions">
                    <button className="icon-button success">
                        <FaCheckCircle />
                    </button>
                </div>
                <div className="right-actions">
                    <button className="icon-button">
                        <FaArrowUp />
                    </button>
                    <button className="icon-button">
                        <FaArrowDown />
                    </button>
                    {/* Nút sửa đã gọi hàm đúng */}
                    <button className="icon-button edit" onClick={() => onEdit(event)}>
                        <FaEdit />
                    </button>
                    <button className="icon-button delete" onClick={() => onDelete(event._id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventCard;