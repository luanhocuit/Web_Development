import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaEdit, FaCamera, FaCalendarAlt, FaMedal, FaWallet } from "react-icons/fa";
import "../styles/profile.css";

function HoSo() {
    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "Người dùng",
        role: localStorage.getItem("role") === "Lead" ? "Trưởng nhóm" : "Thành viên",
        email: "kailou@example.com",
        phone: "Chưa cập nhật",
        address: "Đà Nẵng, Việt Nam",
        avatar: "https://i.pravatar.cc/250?img=15",
        // Đưa các thông số về mặc định là 0 như yêu cầu
        eventsAttended: 0,
        totalSpent: 0,
        friendsCount: 0,
        createdAt: "2026"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profile);

    // Đồng bộ form khi modal chỉnh sửa mở ra
    const handleOpenEdit = () => {
        setEditForm(profile);
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Xử lý lưu thông tin chỉnh sửa (cập nhật trực tiếp giao diện và localStorage)
    const handleSaveEdit = (e) => {
        e.preventDefault();
        setProfile(editForm);
        if (editForm.name) {
            localStorage.setItem("userName", editForm.name);
        }
        setIsEditing(false);
        alert("Cập nhật hồ sơ thành công!");
    };

    // Hàm đổi ảnh đại diện nhanh bằng cách nhập URL ảnh mới
    const handleAvatarChange = () => {
        const newAvatarUrl = prompt("Nhập đường dẫn (URL) ảnh đại diện mới của bạn:", profile.avatar);
        if (newAvatarUrl) {
            setProfile(prev => ({ ...prev, avatar: newAvatarUrl }));
            alert("Đổi ảnh đại diện thành công!");
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                const apiUrl = import.meta.env.VITE_API_URL;

                if (!token || !userId) return;

                const response = await fetch(`${apiUrl}/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const userData = data.user || data;
                    setProfile(prev => ({
                        ...prev,
                        ...userData
                    }));
                }
            } catch (error) {
                console.error("Lỗi đồng bộ hồ sơ ngầm:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1 className="page-title">Hồ sơ cá nhân</h1>
            <p className="page-subtitle">Thông tin thành viên tham gia chuyến đi.</p>

            <div className="profile-container">
                <div className="profile-left">
                    <div className="profile-card">
                        <img
                            src={profile.avatar || "https://i.pravatar.cc/250?img=15"}
                            alt="avatar"
                            className="profile-avatar"
                        />
                        {/* Nút icon máy ảnh đổi ảnh hoạt động */}
                        <button className="avatar-btn" onClick={handleAvatarChange} title="Đổi ảnh đại diện">
                            <FaCamera />
                        </button>
                        <h2>{profile.name || "Người dùng"}</h2>
                        <span className="profile-role">{profile.role || "Thành viên"}</span>
                        {/* Nút Chỉnh sửa hồ sơ hoạt động */}
                        <button className="btn" onClick={handleOpenEdit}>
                            <FaEdit /> Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <div className="profile-right">
                    <div className="profile-info card">
                        <h2>Thông tin cá nhân</h2>
                        <div className="info-grid">
                            <div>
                                <FaUser />
                                <span>{profile.name}</span>
                            </div>
                            <div>
                                <FaEnvelope />
                                <span>{profile.email}</span>
                            </div>
                            <div>
                                <FaPhone />
                                <span>{profile.phone || "Chưa cập nhật"}</span>
                            </div>
                            <div>
                                <FaMapMarkerAlt />
                                <span>{profile.address || "Chưa cập nhật"}</span>
                            </div>
                            <div>
                                <FaUserTie />
                                <span>{profile.role || "Thành viên"}</span>
                            </div>
                            <div>
                                <FaCalendarAlt />
                                <span>Tham gia từ {new Date(profile.createdAt || Date.now()).getFullYear()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3 thông số dưới đã về mặc định 0 */}
                    <div className="profile-stats">
                        <div className="stat-box">
                            <FaMedal />
                            <h3>{profile.eventsAttended || 0}</h3>
                            <p>Sự kiện tham gia</p>
                        </div>
                        <div className="stat-box">
                            <FaWallet />
                            <h3>{(profile.totalSpent || 0).toLocaleString()}đ</h3>
                            <p>Đã thanh toán</p>
                        </div>
                        <div className="stat-box">
                            <FaUser />
                            <h3>{profile.friendsCount || 0}</h3>
                            <p>Bạn đồng hành</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL CHỈNH SỬA HỒ SƠ */}
            {isEditing && (
                <div className="modal-overlay">
                    <div className="event-modal" style={{ maxWidth: '450px' }}>
                        <div className="modal-header">
                            <h2>Chỉnh sửa hồ sơ</h2>
                            <button className="close-btn" onClick={() => setIsEditing(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editForm.address}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} style={{ padding: '8px 16px', background: '#ccc', borderRadius: '8px' }}>
                                    Hủy
                                </button>
                                <button type="submit" className="save-btn" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', borderRadius: '8px' }}>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HoSo;