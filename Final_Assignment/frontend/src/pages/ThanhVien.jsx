import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import MemberCard from "../components/MemberCard";
import Modal from "../components/Modal";
import "../styles/member.css";

function ThanhVien() {
    const [search, setSearch] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State quản lý Modal và dữ liệu đang sửa
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null); 

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";

            const response = await fetch(`${apiUrl}/api/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setMembers(data.users || data);
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách thành viên:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // HÀM XỬ LÝ SỬA THÀNH VIÊN
    const handleEdit = (memberData) => {
        setEditingMember(memberData);
        setIsModalOpen(true);
    };

    // HÀM XỬ LÝ XÓA THÀNH VIÊN
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) return;
        
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";
            
            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchMembers(); // Tải lại danh sách sau khi xóa
            } else {
                const data = await response.json();
                alert(`Xóa thất bại: ${data.message || "Vui lòng thử lại!"}`);
            }
        } catch (error) {
            console.error("Lỗi kết nối khi xóa:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const result = members.filter((member) => {
        const name = member.name || "";
        return name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản lý thành viên</h1>
                    <p className="page-subtitle">Danh sách tất cả thành viên tham gia chuyến đi.</p>
                </div>
                <button className="btn" onClick={() => {
                    setEditingMember(null);
                    setIsModalOpen(true);
                }}>
                    <FaPlus /> Thêm thành viên
                </button>
            </div>

            <div className="member-search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Tìm kiếm thành viên..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Đang tải danh sách thành viên...</p>
            ) : (
                <div className="member-grid">
                    {result.length > 0 ? (
                        result.map((member) => (
                            <MemberCard 
                                key={member._id || member.id} 
                                member={member} 
                                onEdit={handleEdit}      // TRUYỀN HÀM XUỐNG
                                onDelete={handleDelete}  // TRUYỀN HÀM XUỐNG
                            />
                        ))
                    ) : (
                        <p>Không tìm thấy thành viên nào.</p>
                    )}
                </div>
            )}

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    editingEvent={editingMember} // Dùng chung prop truyền data cũ
                    onClose={handleCloseModal}
                    onSave={fetchMembers}
                    type="member"
                />
            )}
        </div>
    );
}

export default ThanhVien;