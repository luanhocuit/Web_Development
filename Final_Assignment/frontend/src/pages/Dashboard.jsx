import { useState, useEffect } from "react";
import { FaCalendarCheck, FaUsers, FaMoneyBillWave, FaPlayCircle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalMembers: 0,
        totalCost: 0,
        ongoingEvents: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // HÀM PHỤ TRỢ: Format lấy giờ (VD: 09:53)
    const formatTimeOnly = (dateString) => {
        if (!dateString) return "--:--";
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // HÀM PHỤ TRỢ: Format lấy ngày (VD: 31/07/2026)
    const formatDateOnly = (dateString) => {
        if (!dateString) return "--/--/----";
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { "Authorization": `Bearer ${token}` };
                const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";

                const [statsRes, eventsRes] = await Promise.all([
                    fetch(`${apiUrl}/api/stats/dashboard`, { headers }),
                    fetch(`${apiUrl}/api/events/today`, { headers })
                ]);

                if (statsRes.ok && eventsRes.ok) {
                    const statsData = await statsRes.json();
                    const eventsData = await eventsRes.json();
                    setStats(statsData);
                    setEvents(eventsData.events || eventsData);
                }
            } catch (error) {
                console.error("Lỗi tải dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Đang tải dữ liệu tổng quan...</p>;

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Tổng quan chuyến đi của nhóm.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <FaCalendarCheck />
                    <h2>{stats.totalEvents || 0}</h2>
                    <p>Tổng sự kiện</p>
                </div>
                <div className="dashboard-card">
                    <FaUsers />
                    <h2>{stats.totalMembers || 0}</h2>
                    <p>Thành viên</p>
                </div>
                <div className="dashboard-card">
                    <FaMoneyBillWave />
                    <h2>{(stats?.totalCost || 0).toLocaleString('vi-VN')}đ</h2>
                    <p>Tổng chi phí</p>
                </div>
                <div className="dashboard-card">
                    <FaPlayCircle />
                    <h2>{stats.ongoingEvents || 0}</h2>
                    <p>Đang diễn ra</p>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="timeline">
                    <div className="section-title">
                        <h2>Lịch trình hôm nay</h2>
                    </div>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div className="timeline-item" key={event._id || event.id}>
                                {/* SỬA LẠI ĐỂ LẤY GIỜ CHUẨN TỪ startTime */}
                                <div className="timeline-time">{formatTimeOnly(event.startTime)}</div>
                                <div className="timeline-content">
                                    <h3>{event.title}</h3>
                                    <p>📍 {event.location || event.place || "Chưa xác định"}</p>
                                    <span>{event.status}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ marginTop: "10px" }}>Hôm nay không có sự kiện nào.</p>
                    )}
                </div>

                <div className="dashboard-right">
                    <div className="summary-card">
                        <h3>Sự kiện tiếp theo</h3>
                        <h2>{events[0]?.title || "Chưa có sự kiện"}</h2>
                        
                        {/* SỬA LẠI ĐỂ RENDER CHUỖI THỜI GIAN ĐẸP */}
                        <p>
                            {events[0] ? `${formatTimeOnly(events[0].startTime)} - ${formatTimeOnly(events[0].endTime)} (${formatDateOnly(events[0].startTime)})` : "--:-- - --:--"}
                        </p>
                        
                        <button onClick={() => navigate("/su-kien")}>
                            Xem chi tiết <FaArrowRight />
                        </button>
                    </div>
                    <div className="summary-card">
                        <h3>Thông báo</h3>
                        <ul>
                            <li>✔ Đã đồng bộ dữ liệu.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;