import { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function QuenMatKhau() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Giả lập gọi API (Nếu Backend chưa có API này thì cứ để form chạy báo thành công)
            // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { ... });
            
            setTimeout(() => {
                alert(`Đã gửi hướng dẫn khôi phục mật khẩu đến email: ${email}. Vui lòng kiểm tra hộp thư!`);
                setIsLoading(false);
                setEmail(""); // Xóa rỗng ô nhập sau khi gửi
            }, 1000);

        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-left">
                    <h1>Trip Planner</h1>
                    <p>Khôi phục quyền truy cập vào tài khoản để tiếp tục quản lý hành trình của bạn.</p>
                    <img src="https://illustrations.popsy.co/blue/key.svg" alt="forgot-password" />
                </div>
                <div className="auth-right">
                    <h2>Quên mật khẩu?</h2>
                    <p>Nhập email bạn đã đăng ký, chúng tôi sẽ gửi liên kết để đặt lại mật khẩu. 🔐</p>
                    
                    <form onSubmit={handleResetPassword}>
                        <div className="input-group" style={{ marginTop: '20px' }}>
                            <FaEnvelope />
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="login-btn" 
                            disabled={isLoading}
                            style={{ marginTop: '20px' }}
                        >
                            <FaPaperPlane /> {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
                        </button>
                    </form>

                    <p className="auth-footer" style={{ marginTop: '30px' }}>
                        Nhớ ra mật khẩu rồi? 
                        <Link to="/dang-nhap"> Quay lại đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QuenMatKhau;