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
                    member.role === "Trưởng nhóm"
                        ? "role lead"
                        : "role member"
                }
            >
                <FaUserTie />
                {member.role || "Thành viên"}
            </span>
            <div className="member-info">
                <p>
                    <strong>Nhiệm vụ</strong>
                </p>
                <p>{member.job || "Chưa phân công"}</p>
            </div>
            <div className="member-footer">
                <button className="edit-btn" onClick={() => onEdit(member)}>
                    <FaPen /> Sửa
                </button>
                <button className="delete-btn" onClick={() => onDelete(member._id || member.id)}>
                    <FaTrash /> Xóa
                </button>
            </div>
        </div>
    );
}

export default MemberCard;