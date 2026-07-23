import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBirthdayCake,
    FaUserEdit,
    FaSave
} from "react-icons/fa";

function ProfileCard({ user, edit, onChange, onEdit, onSave }) {
    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar">
                    <FaUserCircle />
                    <span className="online"></span>
                </div>
                <h2>
                    {edit ? (
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={onChange}
                            className="profile-name-input"
                            placeholder="Full Name"
                        />
                    ) : (
                        user.name
                    )}
                </h2>
                <p>AI Agent Member</p>
            </div>

            <div className="profile-info">
                <div className="info-item">
                    <FaEnvelope />
                    <span>{user.email}</span>
                </div>

                <div className="info-item">
                    <FaPhone />
                    {edit ? (
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={onChange}
                            placeholder="Phone number"
                        />
                    ) : (
                        <span>{user.phone || "Chưa cập nhật"}</span>
                    )}
                </div>

                <div className="info-item">
                    <FaMapMarkerAlt />
                    {edit ? (
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={onChange}
                            placeholder="Address"
                        />
                    ) : (
                        <span>{user.address || "Chưa cập nhật"}</span>
                    )}
                </div>

                <div className="info-item">
                    <FaBirthdayCake />
                    {edit ? (
                        <input
                            type="text"
                            name="birthday"
                            value={user.birthday}
                            onChange={onChange}
                            placeholder="Birthday (DD/MM/YYYY)"
                        />
                    ) : (
                        <span>{user.birthday || "Chưa cập nhật"}</span>
                    )}
                </div>
            </div>

            {edit ? (
                <button className="edit-btn" onClick={onSave}>
                    <FaSave /> Save Changes
                </button>
            ) : (
                <button className="edit-btn" onClick={onEdit}>
                    <FaUserEdit /> Edit Profile
                </button>
            )}
        </div>
    );
}

export default ProfileCard;