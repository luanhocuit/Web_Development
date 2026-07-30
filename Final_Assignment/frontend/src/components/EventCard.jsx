import {
    FaClock,
    FaMapMarkerAlt,
    FaTag,
    FaUsers,
    FaMoneyBillWave,
    FaUserTie,
    FaCheckCircle,
    FaTimes, // THÊM ICON NÀY
    FaEdit,
    FaTrash
} from "react-icons/fa";

function EventCard({ event, onEdit, onDelete }) {
    const getStatusClass = (status) => {
        switch (status) {
            case "Đang diễn ra": return "badge badge-success";
            case "Sắp tới": return "badge badge-info";
            case "Đã xong": return "badge badge-warning";
            case "Tạm hoãn": return "badge badge-secondary";
            case "Hủy": return "badge badge-danger";
            case "Chờ duyệt": return "badge badge-dark";
            default: return "badge";
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return "--:--";
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString('vi-VN');
    };

    // Kiểm tra xem sự kiện đã diễn ra/hoàn thành chưa để chọn icon
    const isEventActiveOrDone = ["Đang diễn ra", "Đã xong"].includes(event.status);

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
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </span>
                </div>
                <div className="event-item">
                    <FaMapMarkerAlt />
                    <span>{event.location || "Chưa xác định"}</span>
                </div>
                <div className="event-item">
                    <FaTag />
                    <span>{event.type || "Chung"}</span>
                </div>
                <div className="event-item">
                    <FaUsers />
                    <span>
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
                    <span>{event.payer?.name || "Chưa có"}</span>
                </div>
            </div>
            <div className="event-footer">
                <div className="left-actions">
                    {/* LOGIC ĐỔI ICON Ở ĐÂY */}
                    {isEventActiveOrDone ? (
                        <button className="icon-button success">
                            <FaCheckCircle />
                        </button>
                    ) : (
                        <button className="icon-button" style={{ color: "#6c757d", backgroundColor: "#e9ecef" }}>
                            <FaTimes />
                        </button>
                    )}
                </div>
                <div className="right-actions">
                    {/* ĐÃ XÓA 2 NÚT MŨI TÊN LÊN/XUỐNG Ở ĐÂY */}
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