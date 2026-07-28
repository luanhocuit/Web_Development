import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaEdit, FaCamera, FaCalendarAlt, FaMedal, FaWallet } from "react-icons/fa";
import "../styles/profile.css";

function HoSo() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                // Gọi API lấy thông tin của chính User đang login
                const response = await fetch("https://final-assignment-x6nf.onrender.com/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setProfile(data.user || data);
                }
            } catch (error) {
                console.error("Lỗi lấy thông tin hồ sơ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Đang tải hồ sơ cá nhân...</p>;
    if (!profile) return <p>Không thể tải thông tin. Vui lòng đăng nhập lại.</p>;

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