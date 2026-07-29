import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import "../styles/statistic.css";

function ThongKe() {
    // Dữ liệu tĩnh của bạn được dùng làm fallback/giá trị khởi tạo
    const [overview, setOverview] = useState({
        totalEvents: 15,
        totalMembers: 8,
        totalCost: 5500000,
        liveEventsCount: 1
    });

    const [eventData, setEventData] = useState([
        { name: "Ăn uống", value: 5 },
        { name: "Ngắm cảnh", value: 3 },
        { name: "Bonding", value: 4 },
        { name: "Di chuyển", value: 2 }
    ]);

    const [statusData, setStatusData] = useState([
        { name: "Đã hoàn thành", value: 8 },
        { name: "Đang diễn ra", value: 2 },
        { name: "Sắp diễn ra", value: 5 },
        { name: "Tạm hoãn", value: 1 }
    ]);

    const [liveEvent, setLiveEvent] = useState({
        title: "Tắm biển Mỹ Khê",
        time: "09:00 - 11:00",
        status: "Đang diễn ra"
    });

    const COLORS = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#ef4444"
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                // Gọi API lấy thống kê từ Backend của bạn
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    
                    // Cập nhật state nếu backend trả về dữ liệu hợp lệ
                    if (data.overview) setOverview(data.overview);
                    if (data.eventByCategory?.length > 0) setEventData(data.eventByCategory);
                    if (data.eventByStatus?.length > 0) setStatusData(data.eventByStatus);
                    if (data.liveEvent) setLiveEvent(data.liveEvent);
                }
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
                    <h2>Số lượng sự kiện</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={eventData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                fill="#2563eb"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="chart-card">
                    <h2>Trạng thái sự kiện</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                outerRadius={110}
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
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