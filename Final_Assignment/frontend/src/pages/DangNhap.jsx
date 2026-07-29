import { useState } from "react";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaSignInAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Bổ sung useNavigate
import "../styles/auth.css";

function DangNhap() {
    const [showPassword, setShowPassword] = useState(false);
    
    // 1. Thêm State để lưu trữ Email và Password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    // 2. Hàm xử lý logic gọi API Đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt reload trang

        try {
            // Gọi API bằng biến môi trường (localhost hoặc link Render)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // 3. Xử lý kết quả trả về từ Backend
            if (response.ok) {
                // Đăng nhập thành công -> Lưu Token làm "chìa khóa"
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data._id);
                
                alert("Đăng nhập thành công!");
                // Mở khóa bảo vệ và cho phép vào Dashboard
                navigate("/dashboard");
            } else {
                // Báo lỗi sai email/mật khẩu
                alert(`Lỗi: ${data.message || "Đăng nhập thất bại"}`);
            }
        } catch (error) {
            console.error("Lỗi mạng:", error);
            alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại backend.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-left">
                    <h1>Trip Planner</h1>
                    <p>Quản lý chuyến đi thông minh, đồng bộ lịch trình, thành viên và chi phí trên một nền tảng duy nhất.</p>
                </div>
                <div className="auth-right">
                    <h2>Đăng nhập</h2>
                    <p>Chào mừng bạn quay trở lại 👋</p>
                    
                    {/* 4. Gắn hàm xử lý vào form */}
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email} // Ràng buộc State
                                onChange={(e) => setEmail(e.target.value)} // Cập nhật State
                            />
                        </div>
                        <div className="input-group">
                            <FaLock />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                required
                                value={password} // Ràng buộc State
                                onChange={(e) => setPassword(e.target.value)} // Cập nhật State
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div 
                            className="remember-box" 
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}
                        >
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                                <input type="checkbox" />
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                            
                            {/* Thay <a> bằng <Link> để chuyển trang không bị load lại */}
                            <Link 
                                to="/quen-mat-khau" 
                                style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '500' }}
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                        
                        {/* Nút đăng nhập phải là type="submit" */}
                        <button type="submit" className="login-btn">
                            <FaSignInAlt /> Đăng nhập
                        </button>
                    </form>

                    <p className="auth-footer">
                        Chưa có tài khoản? 
                        {/* 5. Sửa lại đường dẫn link cho khớp với Router trong App.jsx */}
                        <Link to="/dang-ky"> Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DangNhap;