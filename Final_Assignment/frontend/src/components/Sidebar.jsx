import {
    FaHome,
    FaCalendarAlt,
    FaUsers,
    FaWallet,
    FaChartPie,
    FaUserCircle,
    FaPlaneDeparture
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
    // Cập nhật lại các path cho khớp với danh sách file Pages của bạn
    const menus = [
        {
            name: "Tổng quan",
            path: "/dashboard",
            icon: <FaHome />
        },
        {
            name: "Sự kiện",
            path: "/su-kien",
            icon: <FaCalendarAlt />
        },
        {
            name: "Thành viên",
            path: "/thanh-vien",
            icon: <FaUsers />
        },
        {
            name: "Chi tiêu",
            path: "/chi-tieu",
            icon: <FaWallet />
        },
        {
            name: "Thống kê",
            path: "/thong-ke",
            icon: <FaChartPie />
        },
        {
            name: "Hồ sơ",
            path: "/ho-so",
            icon: <FaUserCircle />
        }
    ];

    return (
        <aside className="sidebar">
            <div className="logo">
                <FaPlaneDeparture />
                <div>
                    <h2>Trip Planner</h2>
                    <span>Quản lý chuyến đi</span>
                </div>
            </div>
            <nav>
                {menus.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        // Loại bỏ end prop nếu không dùng path "/" để tránh lỗi active không chính xác
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <p>Trip Planner</p>
                <span>Version 1.0</span>
            </div>
        </aside>
    );
}

export default Sidebar;