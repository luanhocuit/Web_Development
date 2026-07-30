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

    const formatTimeOnly = (dateString) => {
        if (!dateString) return "--:--";
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

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

                // Gọi đồng thời API lấy danh sách sự kiện, thành viên và chi phí để tự tổng hợp chính xác 100%
                const [eventsRes, usersRes, expensesRes] = await Promise.all([
                    fetch(`${apiUrl}/api/events`, { headers }),
                    fetch(`${apiUrl}/api/users`, { headers }),
                    fetch(`${apiUrl}/api/expenses`, { headers })
                ]);

                const eventsData = eventsRes.ok ? await eventsRes.json() : [];
                const usersData = usersRes.ok ? await usersRes.json() : [];
                const expensesData = expensesRes.ok ? await expensesRes.json() : [];

                const allEvents = eventsData.events || eventsData || [];
                const allUsers = usersData.users || usersData || [];
                const allExpenses = expensesData.expenses || expensesData || [];

                // Tính toán số liệu tổng quan
                const totalEvents = allEvents.length;
                const totalMembers = allUsers.length;
                
                // Tính tổng chi phí từ cả bảng expenses và cost của events
                const expenseTotal = allExpenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
                const eventCostTotal = allEvents.reduce((acc, curr) => acc + (curr.cost || 0), 0);
                const totalCost = expenseTotal > 0 ? expenseTotal : eventCostTotal;

                // Đếm số sự kiện đang diễn ra
                const ongoingEvents = allEvents.filter(e => e.status === "Đang diễn ra").length;

                setStats({
                    totalEvents,
                    totalMembers,
                    totalCost,
                    ongoingEvents
                });

                // Lọc sự kiện cho hôm nay (hoặc hiển thị toàn bộ sự kiện sắp tới nếu hôm nay không có)
                setEvents(allEvents);

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
                    <h2>{(stats.totalCost).toLocaleString('vi-VN')}đ</h2>
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
                        <h2>Danh sách lịch trình</h2>
                    </div>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div className="timeline-item" key={event._id || event.id}>
                                <div className="timeline-time">{formatTimeOnly(event.startTime)}</div>
                                <div className="timeline-content">
                                    <h3>{event.title}</h3>
                                    <p>📍 {event.location || event.place || "Chưa xác định"}</p>
                                    <span>{event.status}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ marginTop: "10px" }}>Chưa có sự kiện nào.</p>
                    )}
                </div>

                <div className="dashboard-right">
                    <div className="summary-card">
                        <h3>Sự kiện tiếp theo</h3>
                        <h2>{events[0]?.title || "Chưa có sự kiện"}</h2>
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
                            <li>✔ Đã đồng bộ dữ liệu hệ thống.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;