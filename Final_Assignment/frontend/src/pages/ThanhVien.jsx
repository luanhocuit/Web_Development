import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import MemberCard from "../components/MemberCard";
import "../styles/member.css";

function ThanhVien() {
    const [search, setSearch] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/users", {
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
                <button className="btn">
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
        </div>
    );
}

export default ThanhVien;