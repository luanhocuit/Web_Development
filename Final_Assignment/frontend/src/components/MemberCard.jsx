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
                    member.role === "Lead"
                        ? "role lead"
                        : "role member"
                }
            >
                <FaUserTie />
                {member.role === "Lead" ? "Trưởng nhóm" : "Thành viên"}
            </span>
            <div className="member-info">
                <p>
                    {/* ĐÃ ĐỔI TÊN Ở ĐÂY */}
                    <strong>Tham gia hoạt động</strong>
                </p>
                {/* Có thể bạn cần map danh sách các sự kiện mà member này tham gia ở đây, tạm thời để cứng */}
                <p>{member.events ? member.events.length + " hoạt động" : "Chưa có hoạt động"}</p>
            </div>
            <div className="member-footer">
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