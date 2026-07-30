import {
    FaUserTie,
    FaPen,
    FaTrash,
    FaUserFriends
} from "react-icons/fa";

function MemberCard({ member, onEdit, onDelete }) {
    return (
        <div className="member-card">
            <img
                src={member.avatar || "https://i.pravatar.cc/150"}
                alt={member.name}
                className="member-avatar"
            />
            <h2>{member.name}</h2>
            <span
                className={
                    // Sửa điều kiện so sánh thành "Lead"
                    member.role === "Lead"
                        ? "role lead"
                        : "role member"
                }
            >
                <FaUserTie />
                {/* Dịch role ra tiếng Việt để hiển thị */}
                {member.role === "Lead" ? "Trưởng nhóm" : "Thành viên"}
            </span>
            <div className="member-info">
                <p>
                    <strong>Nhiệm vụ</strong>
                </p>
                <p>{member.job || "Chưa phân công"}</p>
            </div>
            <div className="member-footer">
                {/* Nút sửa đã gọi hàm đúng */}
                <button className="edit-btn" onClick={() => onEdit(member)}>
                    <FaPen /> Sửa
                </button>
                <button className="delete-btn" onClick={() => onDelete(member._id)}>
                    <FaTrash /> Xóa
                </button>
            </div>
        </div>
    );
}

export default MemberCard;