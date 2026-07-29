import {
    FaBell,
    FaSearch,
    FaMoon,
    FaSun,
    FaSignOutAlt,
    FaCog // Trong ảnh bạn có dùng icon bánh răng
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const currentRole = localStorage.getItem("role");
    const roleDisplay = currentRole === "Lead" ? "Trưởng nhóm" : "Thành viên";
    const currentName = localStorage.getItem("userName") || "Thành viên";

    const today = new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    // Xử lý Dark Mode tác động trực tiếp lên giao diện (thẻ body)
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.clear();
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
                
                {/* Nút Dark/Light Mode */}
                <button 
                    className="icon-btn" 
                    onClick={() => setDarkMode(!darkMode)}
                    title="Chế độ Tối/Sáng"
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                
                {/* Nút Thông báo */}
                <button 
                    className="icon-btn"
                    onClick={() => alert("Hiện tại chưa có thông báo mới nào!")}
                    title="Thông báo"
                >
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