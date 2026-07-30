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
    const [editingEvent, setEditingEvent] = useState(null); // THÊM MỚI: Lưu dữ liệu sự kiện cần sửa

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

    // THÊM MỚI: Hàm xử lý khi bấm nút Sửa trên EventCard
    const handleEdit = (eventData) => {
        setEditingEvent(eventData); // Lưu dữ liệu cũ vào state
        setIsModalOpen(true);       // Mở modal lên
    };

    // THÊM MỚI: Hàm xử lý khi bấm nút Xóa trên EventCard
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
                fetchEvents(); // Tải lại danh sách sau khi xóa thành công
            } else {
                alert("Xóa thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi kết nối khi xóa:", error);
        }
    };

    // THÊM MỚI: Hàm xử lý khi đóng Modal (phải reset lại editingEvent)
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
                    setEditingEvent(null); // Đảm bảo bấm "Thêm mới" thì form trống
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
                        {/* ĐÃ SỬA: Đổi tên các option khớp với Enum Backend */}
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
                        result.map((event) => (
                            <EventCard
                                key={event._id || event.id} 
                                event={event}
                                /* ĐÃ THÊM: Truyền hàm xuống cho EventCard */
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
                    editingEvent={editingEvent} /* ĐÃ THÊM: Bơm dữ liệu cũ vào Modal */
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