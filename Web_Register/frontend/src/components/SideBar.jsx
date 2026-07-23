import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    FaRobot,
    FaHome,
    FaUserCircle,
    FaChartBar,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-icon">
                    <FaRobot />
                </div>
                <h2>AI Agent</h2>
                <p>Authentication System</p>
            </div>
            <nav>
                <ul>
                    <li className={location.pathname === "/profile" ? "active" : ""}>
                        <Link to="/profile" style={{ display: "flex", alignItems: "center", gap: "10px", color: "inherit", textDecoration: "none" }}>
                            <FaHome />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={location.pathname === "/profile" ? "active" : ""}>
                        <Link to="/profile" style={{ display: "flex", alignItems: "center", gap: "10px", color: "inherit", textDecoration: "none" }}>
                            <FaUserCircle />
                            <span>Profile</span>
                        </Link>
                    </li>
                    {/* Bạn có thể thêm các route khác tương tự sau này */}
                </ul>
            </nav>
            <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;