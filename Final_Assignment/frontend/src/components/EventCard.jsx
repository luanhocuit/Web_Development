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
    const getStatusClass = (status) => {
        switch (status) {
            case "Đang diễn ra":
                return "badge badge-success";
            case "Sắp diễn ra":
                return "badge badge-info";
            case "Đã hoàn thành":
                return "badge badge-warning";
            case "Tạm hoãn":
                return "badge badge-secondary";
            case "Hủy":
                return "badge badge-danger";
            default:
                return "badge";
        }
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
                        {event.start || "--:--"} - {event.end || "--:--"}
                    </span>
                </div>
                <div className="event-item">
                    <FaMapMarkerAlt />
                    <span>{event.location || "Chưa xác định"}</span>
                </div>
                <div className="event-item">
                    <FaTag />
                    <span>{event.category || "Chung"}</span>
                </div>
                <div className="event-item">
                    <FaUsers />
                    <span>
                        {/* Nếu members là mảng thì map ra tên, nếu là string thì in thẳng */}
                        {Array.isArray(event.members) 
                            ? event.members.join(", ") 
                            : (event.members || "Cả nhóm")}
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
                    <span>{event.payer || "Chưa có"}</span>
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
                    <button className="icon-button edit" onClick={() => onEdit(event)}>
                        <FaEdit />
                    </button>
                    <button className="icon-button delete" onClick={() => onDelete(event._id || event.id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventCard;