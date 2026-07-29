import {
    FaBell,
    FaSearch,
    FaMoon,
    FaSun,
    FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    // Lấy chức vụ từ localStorage để hiển thị linh hoạt
    const currentRole = localStorage.getItem("role");
    const roleDisplay = currentRole === "Lead" ? "Trưởng nhóm" : "Thành viên";

    const currentName = localStorage.getItem("userName") || "Thành viên ẩn danh";

    const today = new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    // Hàm xử lý Đăng xuất
    const handleLogout = () => {
        // Xóa sạch dữ liệu lưu ở LocalStorage
        localStorage.clear();
        // Điều hướng về trang đăng nhập
        navigate("/dang-nhap");
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <h2>Chuyến đi Đà Nẵng 2026</h2>
                <span>{today}</span>
            </div>
            <div className="navbar-right">
                <div className="search-box">
                    <FaSearch />
                    <input type="text" placeholder="Tìm kiếm..." />
                </div>
                
                <button 
                    className="icon-btn" 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                
                <button className="icon-btn">
                    <FaBell />
                    <span className="notify">3</span>
                </button>

                <div className="user-box">
                    <img
                        src="https://i.pravatar.cc/100?img=15"
                        alt="avatar"
                    />
                    <div>
                        <h4>{currentName}</h4>
                        <span>{roleDisplay}</span>
                    </div>
                </div>

                {/* Nút Đăng xuất */}
                <button 
                    className="icon-btn logout-btn" 
                    onClick={handleLogout}
                    title="Đăng xuất"
                    style={{ marginLeft: '10px', color: '#ff4d4f' }}
                >
                    <FaSignOutAlt />
                </button>
            </div>
        </header>
    );
}

export default Navbar;