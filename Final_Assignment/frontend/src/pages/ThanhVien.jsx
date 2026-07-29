import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import MemberCard from "../components/MemberCard";
import Modal from "../components/Modal";
import "../styles/member.css";

function ThanhVien() {
    const [search, setSearch] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái đóng/mở Modal

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL;

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
                {/* Nút bật Modal Thêm thành viên */}
                <button className="btn" onClick={() => setIsModalOpen(true)}>
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
                            <MemberCard key={member._id || member.id} member={member} />
                        ))
                    ) : (
                        <p>Không tìm thấy thành viên nào.</p>
                    )}
                </div>
            )}

            {/* Gọi Component Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={fetchMembers}
                type="member"
            />
        </div>
    );
}

export default ThanhVien;