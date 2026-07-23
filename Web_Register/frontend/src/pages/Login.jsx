import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../components/Logo";
import Button from "../components/Button";
import InputField from "../components/InputField";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(""); // State để lưu thông báo lỗi

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Xóa lỗi cũ khi bấm login lại

       try {
            const backendURL = import.meta.env.VITE_API_URL || "https://web-register-new.onrender.com";
            
            // Gọi API kiểm tra tài khoản từ Backend
            const response = await fetch(`${backendURL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("token", data.token);

                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/profile");
            } else {
                // Đăng nhập thất bại -> Hiện thông báo lỗi
                setError(data.message || "Email hoặc mật khẩu không chính xác");
            }
        } catch (err) {
            setError("Lỗi kết nối đến máy chủ. Vui lòng kiểm tra Backend.");
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert("Tính năng này đang bảo trì");
    };

    return (
        <div className="page">
            <div className="background-circle circle1"></div>
            <div className="background-circle circle2"></div>
            <div className="glass-card">
                <Logo />
                <h2 className="title">Welcome Back</h2>
                <p className="subtitle">Login to continue</p>
                
                {/* Khu vực hiển thị lỗi màu đỏ */}
                {error && <div style={{ color: '#ff4d4d', marginBottom: '15px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <InputField
                        icon={<FaEnvelope />}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <InputField
                        icon={<FaLock />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                        <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </InputField>
                    
                    <div className="login-option">
                        <label>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={()=> setRemember(!remember)}
                            />
                            Remember Me
                        </label>
                        {/* Gắn sự kiện onClick cho Forgot Password */}
                        <a href="#" onClick={handleForgotPassword}>
                            Forgot Password?
                        </a>
                    </div>
                    
                    <Button text="Login" type="submit" />
                </form>
                
                <p className="bottom-text">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;