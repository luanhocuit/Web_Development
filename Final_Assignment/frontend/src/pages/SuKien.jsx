import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import EventCard from "../components/EventCard";
import Modal from "../components/Modal"; 
import "../styles/event.css";

function SuKien() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Tất cả");
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // State điều khiển Modal và Dữ liệu đang Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null); 

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://final-assignment-x6nf.onrender.com/api/events", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
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

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEdit = (eventData) => {
        setEditingEvent(eventData); 
        setIsModalOpen(true);       
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) return;
        
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://final-assignment-x6nf.onrender.com/api/events/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchEvents(); 
            } else {
                alert("Xóa thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi kết nối khi xóa:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const result = events.filter((event) => {
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
                <button className="btn" onClick={() => {
                    setEditingEvent(null); 
                    setIsModalOpen(true);
                }}>
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
                        <option>Chờ duyệt</option>
                        <option>Sắp tới</option>
                        <option>Đang diễn ra</option>
                        <option>Đã xong</option>
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
                        // ĐÃ CHÈN LOGIC TỰ ĐỘNG SẮP XẾP VÀO ĐÂY
                        result
                            .slice()
                            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                            .map((event) => (
                                <EventCard
                                    key={event._id || event.id} 
                                    event={event}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                    ) : (
                        <p>Không tìm thấy sự kiện nào.</p>
                    )}
                </div>
            )}

            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    editingEvent={editingEvent} 
                    onClose={handleCloseModal} 
                    onSave={() => {
                        fetchEvents(); 
                        handleCloseModal(); 
                    }} 
                />
            )}
        </div>
    );
}

export default SuKien;