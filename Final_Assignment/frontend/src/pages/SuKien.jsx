import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import EventCard from "../components/EventCard";
import Modal from "../components/Modal"; // Import Modal vào đây
import "../styles/event.css";

function SuKien() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Tất cả");
    
    // State lưu trữ dữ liệu thật từ API
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // State điều khiển đóng/mở Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm gọi API lấy danh sách sự kiện
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            
            // Thay đổi URL này nếu Backend của bạn chạy ở port khác
            const response = await fetch("http://localhost:5000/api/events", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Gắn token để qua ải middleware
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Giả sử API trả về data là mảng sự kiện hoặc { events: [...] }
                setEvents(data.events || data);
            } else {
                console.error("Lỗi lấy sự kiện:", data.message);
            }
        } catch (error) {
            console.error("Lỗi kết nối máy chủ:", error);
        } finally {
            setLoading(false);
        }
    };

    // Chạy fetchEvents 1 lần duy nhất khi render component
    useEffect(() => {
        fetchEvents();
    }, []);

    // Logic filter
    const result = events.filter((event) => {
        // Dùng fallback chuỗi rỗng để tránh lỗi toLowerCase of undefined
        const title = event.title || ""; 
        const matchSearch = title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "Tất cả" || event.status === status;
        return matchSearch && matchStatus;
    });

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản lý sự kiện</h1>
                    <p className="page-subtitle">Tạo và quản lý toàn bộ lịch trình chuyến đi.</p>
                </div>
                {/* Thêm onClick để mở Modal */}
                <button className="btn" onClick={() => setIsModalOpen(true)}>
                    <FaPlus /> Thêm sự kiện
                </button>
            </div>

            <div className="filter-box card">
                <div className="search-input">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sự kiện..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="status-filter">
                    <FaFilter />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Tất cả</option>
                        <option>Sắp diễn ra</option>
                        <option>Đang diễn ra</option>
                        <option>Đã hoàn thành</option>
                        <option>Tạm hoãn</option>
                        <option>Hủy</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="event-list">
                    {result.length > 0 ? (
                        result.map((event) => (
                            <EventCard
                                /* MongoDB thường dùng _id thay vì id */
                                key={event._id || event.id} 
                                event={event}
                            />
                        ))
                    ) : (
                        <p>Không tìm thấy sự kiện nào.</p>
                    )}
                </div>
            )}

            {/* Khối gọi Modal đặt ở cuối cùng trước khi đóng thẻ div */}
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={() => {
                        fetchEvents(); // Tải lại danh sách sự kiện từ server
                        setIsModalOpen(false); // Đóng modal sau khi lưu xong
                    }} 
                />
            )}
        </div>
    );
}

export default SuKien;