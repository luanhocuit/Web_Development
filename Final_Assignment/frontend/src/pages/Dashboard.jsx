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

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { "Authorization": `Bearer ${token}` };
                const apiUrl = import.meta.env.VITE_API_URL;

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
                    <h2>{stats.totalEvents}</h2>
                    <p>Tổng sự kiện</p>
                </div>
                <div className="dashboard-card">
                    <FaUsers />
                    <h2>{stats.totalMembers}</h2>
                    <p>Thành viên</p>
                </div>
                <div className="dashboard-card">
                    <FaMoneyBillWave />
                    <h2>{stats.totalCost.toLocaleString()}đ</h2>
                    <p>Tổng chi phí</p>
                </div>
                <div className="dashboard-card">
                    <FaPlayCircle />
                    <h2>{stats.ongoingEvents}</h2>
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
                                <div className="timeline-time">{event.time || "00:00"}</div>
                                <div className="timeline-content">
                                    <h3>{event.title}</h3>
                                    <p>📍 {event.place || event.location}</p>
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
                        <p>{events[0]?.time || "--:--"} - {events[0]?.endTime || "--:--"}</p>
                        {/* Gắn sự kiện chuyển hướng sang trang Quản lý Sự kiện khi bấm nút */}
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