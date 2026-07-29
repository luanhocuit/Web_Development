import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaEdit, FaCamera, FaCalendarAlt, FaMedal, FaWallet } from "react-icons/fa";
import "../styles/profile.css";

function HoSo() {
    // Khởi tạo sẵn thông tin từ localStorage để trang web luôn mượt mà, không bị trắng trang
    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "Người dùng",
        role: localStorage.getItem("role") === "Lead" ? "Trưởng nhóm" : "Thành viên",
        email: "kailou@example.com",
        phone: "Chưa cập nhật",
        address: "Đà Nẵng, Việt Nam",
        avatar: "https://i.pravatar.cc/250?img=15",
        eventsAttended: 5,
        totalSpent: 2500000,
        friendsCount: 8,
        createdAt: "2026"
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                const apiUrl = import.meta.env.VITE_API_URL;

                if (!token || !userId) return;

                // Thử gọi ngầm API lấy dữ liệu chi tiết từ backend
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
                    // Cập nhật lại bằng dữ liệu thật từ Database nếu có
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
                        <button className="avatar-btn">
                            <FaCamera />
                        </button>
                        <h2>{profile.name || "Người dùng"}</h2>
                        <span className="profile-role">{profile.role || "Thành viên"}</span>
                        <button className="btn">
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
        </div>
    );
}

export default HoSo;