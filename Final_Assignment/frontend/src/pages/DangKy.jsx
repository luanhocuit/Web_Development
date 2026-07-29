import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUserPlus
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function DangKy() {
    // State quản lý ẩn/hiện password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State lưu trữ dữ liệu Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    // Hàm xử lý logic khi bấm Đăng Ký
    const handleRegister = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt reload lại trang

        // 1. Validate cơ bản ở phía Client
        if (password !== confirmPassword) {
            return alert("Mật khẩu xác nhận không khớp!");
        }
        if (!agree) {
            return alert("Vui lòng đồng ý với điều khoản sử dụng.");
        }

        // 2. Gọi API xuống Backend
        try {
            // Sử dụng biến môi trường VITE_API_URL để dễ dàng deploy
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Đóng gói dữ liệu thành chuỗi JSON
                body: JSON.stringify({ name, email, password, taskDescription: "Chưa phân công" }),
            });

            const data = await response.json();

            // 3. Xử lý phản hồi từ Server
            if (response.ok) {
                // Lưu token bảo mật vào localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data._id);
                
                alert(`Đăng ký thành công! Bạn được cấp quyền: ${data.role}`);
                // Chuyển hướng thẳng vào khu vực quản lý
                navigate("/dashboard");
            } else {
                alert(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            console.error("Lỗi mạng:", error);
            alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại server backend.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-left">
                    <h1>Trip Planner</h1>
                    <p>Tạo tài khoản để bắt đầu quản lý lịch trình, thành viên và chi phí chuyến đi của bạn.</p>
                </div>
                <div className="auth-right">
                    <h2>Đăng ký</h2>
                    <p>Chào mừng bạn đến với Trip Planner 🚀</p>
                    
                    {/* Gắn hàm handleRegister vào sự kiện onSubmit của Form */}
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <FaUser />
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <FaLock />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="input-group">
                            <FaLock />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <label className="remember-box">
                            <input 
                                type="checkbox" 
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            Tôi đồng ý với điều khoản sử dụng.
                        </label>
                        
                        {/* Đảm bảo nút có type="submit" */}
                        <button type="submit" className="login-btn">
                            <FaUserPlus /> Đăng ký
                        </button>
                    </form>

                    <p className="auth-footer">
                        Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DangKy;