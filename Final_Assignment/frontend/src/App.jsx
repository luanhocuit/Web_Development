import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import DangNhap from "./pages/DangNhap";
import DangKy from "./pages/DangKy";
import QuenMatKhau from "./pages/QuenMatKhau"; // 1. Import trang Quên mật khẩu

import Dashboard from "./pages/Dashboard";
import SuKien from "./pages/SuKien";
import ThanhVien from "./pages/ThanhVien";
import ChiTieu from "./pages/ChiTieu";
import ThongKe from "./pages/ThongKe";
import HoSo from "./pages/HoSo";

import MainLayout from "./layouts/MainLayout";

// 🛡️ LỚP BẢO VỆ 1: Chặn truy cập trái phép vào hệ thống
// Kiểm tra xem trong trình duyệt đã lưu token chưa, nếu chưa thì đá văng ra login
const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/dang-nhap" replace />;
    }
    // Nếu có token hợp lệ -> cho phép đi tiếp vào các component con
    return <Outlet />;
};

// 🛡️ LỚP BẢO VỆ 2: Chặn user đã đăng nhập quay ngược lại trang Auth
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

function App() {
    return (
        <Routes>
            {/* ================= AUTH ROUTES (PUBLIC) ================= */}
            <Route path="/" element={<Navigate to="/dang-nhap" replace />} />

            <Route 
                path="/dang-nhap" 
                element={
                    <PublicRoute>
                        <DangNhap />
                    </PublicRoute>
                } 
            />

            <Route 
                path="/dang-ky" 
                element={
                    <PublicRoute>
                        <DangKy />
                    </PublicRoute>
                } 
            />

            {/* 2. Thêm Route cho trang Quên mật khẩu */}
            <Route 
                path="/quen-mat-khau" 
                element={
                    <PublicRoute>
                        <QuenMatKhau />
                    </PublicRoute>
                } 
            />

            {/* ================= MAIN ROUTES (PROTECTED) ================= */}
            {/* Đưa toàn bộ các route nội bộ vào trong vòng bảo vệ của ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/su-kien" element={<SuKien />} />
                    <Route path="/thanh-vien" element={<ThanhVien />} />
                    <Route path="/chi-tieu" element={<ChiTieu />} />
                    <Route path="/thong-ke" element={<ThongKe />} />
                    <Route path="/ho-so" element={<HoSo />} />
                </Route>
            </Route>

        </Routes>
    );
}

export default App;