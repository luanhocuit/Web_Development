import { useState, useEffect } from "react";
import {
    BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import "../styles/statistic.css";

function ThongKe() {
    const [overview, setOverview] = useState({
        totalEvents: 0,
        totalMembers: 0,
        totalCost: 0,
        liveEventsCount: 0
    });

    const [eventData, setEventData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [liveEvent, setLiveEvent] = useState(null);

    const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                };

                // TỰ ĐỘNG GỌI 3 API CÓ SẴN ĐỂ TÍNH TOÁN (Không cần API Stats riêng)
                const [eventsRes, usersRes, expensesRes] = await Promise.all([
                    fetch(`${apiUrl}/api/events`, { headers }),
                    fetch(`${apiUrl}/api/users`, { headers }), 
                    fetch(`${apiUrl}/api/expenses`, { headers })
                ]);

                const eventsData = await eventsRes.json();
                const usersData = await usersRes.json();
                const expensesData = await expensesRes.json();

                const events = eventsRes.ok ? (eventsData.events || eventsData) : [];
                const users = usersRes.ok ? (usersData.users || usersData) : [];
                const expenses = expensesRes.ok ? (expensesData.expenses || expensesData) : [];

                // 1. Tính toán Tổng quan (Overview)
                let totalCostCalc = 0;
                expenses.forEach(exp => totalCostCalc += (exp.amount || 0));
                events.forEach(ev => { if (ev.cost) totalCostCalc += ev.cost; });

                const liveEventsList = events.filter(ev => ev.status === "Đang diễn ra");

                setOverview({
                    totalEvents: events.length,
                    totalMembers: users.length,
                    totalCost: totalCostCalc,
                    liveEventsCount: liveEventsList.length
                });

                // Cập nhật sự kiện đang diễn ra
                if (liveEventsList.length > 0) {
                    setLiveEvent({
                        title: liveEventsList[0].title,
                        time: new Date(liveEventsList[0].startTime).toLocaleDateString("vi-VN"),
                        status: liveEventsList[0].status
                    });
                } else {
                    setLiveEvent(null);
                }

                // 2. Tính toán Biểu đồ tròn (Pie Chart - Theo trạng thái)
                const statusCount = { "Sắp diễn ra": 0, "Đang diễn ra": 0, "Đã kết thúc": 0, "Đã hủy": 0 };
                events.forEach(ev => {
                    const st = ev.status || "Sắp diễn ra";
                    if (statusCount[st] !== undefined) statusCount[st]++;
                    else statusCount["Sắp diễn ra"]++;
                });
                
                const pieData = Object.keys(statusCount)
                    .filter(key => statusCount[key] > 0)
                    .map(key => ({ name: key, value: statusCount[key] }));
                setStatusData(pieData);

                // 3. Tính toán Biểu đồ cột (Bar Chart - Số lượng sự kiện theo tháng)
                const monthCount = {};
                events.forEach(ev => {
                    const date = new Date(ev.startTime || ev.createdAt || Date.now());
                    const month = `Tháng ${date.getMonth() + 1}`;
                    monthCount[month] = (monthCount[month] || 0) + 1;
                });
                const barData = Object.keys(monthCount).map(key => ({
                    name: key,
                    value: monthCount[key]
                }));
                setEventData(barData.length > 0 ? barData : [{ name: "Chưa có", value: 0 }]);

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu thống kê:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="page-title">Thống kê chuyến đi</h1>
            <p className="page-subtitle">Tổng hợp nhanh các dữ liệu của chuyến đi.</p>

            <div className="stats-overview">
                <div className="stats-card">
                    <h3>Tổng sự kiện</h3>
                    <h2>{overview.totalEvents}</h2>
                </div>
                <div className="stats-card">
                    <h3>Tổng thành viên</h3>
                    <h2>{overview.totalMembers}</h2>
                </div>
                <div className="stats-card">
                    <h3>Tổng chi phí</h3>
                    <h2>{overview.totalCost.toLocaleString()}đ</h2>
                </div>
                <div className="stats-card">
                    <h3>Đang diễn ra</h3>
                    <h2>{overview.liveEventsCount}</h2>
                </div>
            </div>

            <div className="chart-grid">
                <div className="chart-card">
                    <h2>Số lượng sự kiện theo tháng</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={eventData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="chart-card">
                    <h2>Trạng thái sự kiện</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" outerRadius={110} label>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {liveEvent && (
                <div className="chart-card">
                    <h2>Sự kiện đang diễn ra</h2>
                    <div className="live-event">
                        <h3>🏖️ {liveEvent.title}</h3>
                        <p>{liveEvent.time}</p>
                        <span>{liveEvent.status}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ThongKe;