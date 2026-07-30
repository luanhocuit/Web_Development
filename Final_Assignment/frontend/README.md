# 🎨 Frontend

## 🛠️ Ngôn ngữ & công nghệ sử dụng

- ⚛️ React 19
- ⚡ Vite (build tool + dev server)
- 🧭 React Router DOM v7 (routing, có `ProtectedRoute` và `PublicRoute` theo token đăng nhập)
- 📈 Recharts (vẽ biểu đồ thống kê)
- 🧩 react-icons
- 🎀 CSS thuần (tách riêng theo từng module giao diện)
- 🚀 Triển khai qua ▲ Vercel

## 🌳 Cây thư mục

```
frontend/
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vercel.json               # ⚙️ Cấu hình deploy Vercel
├── vite.config.js            # ⚙️ Cấu hình Vite
│
├── 🖼️ public/
│   ├── favicon.svg
│   └── icons.svg
│
└── 📂 src/
    ├── main.jsx               # 🚦 Điểm khởi động ứng dụng React
    ├── App.jsx                # 🧭 Khai báo toàn bộ route (public/protected)
    ├── App.css
    ├── index.css
    │
    ├── 🧩 components/          # Các component tái sử dụng
    │   ├── EventCard.jsx       # 📅 Thẻ hiển thị 1 sự kiện
    │   ├── ExpenseCard.jsx     # 💸 Thẻ hiển thị 1 khoản chi tiêu
    │   ├── MemberCard.jsx      # 👤 Thẻ hiển thị 1 thành viên
    │   ├── Modal.jsx           # 🪟 Modal dùng chung (thêm/sửa dữ liệu...)
    │   ├── Navbar.jsx          # 🔝 Thanh điều hướng trên cùng
    │   └── Sidebar.jsx         # 📌 Thanh điều hướng bên (menu chính)
    │
    ├── 🖼️ layouts/
    │   └── MainLayout.jsx      # Layout chung bọc Navbar + Sidebar cho các trang nội bộ
    │
    ├── 📄 pages/                # Các trang chính của ứng dụng
    │   ├── DangNhap.jsx         # 🔑 Trang đăng nhập
    │   ├── DangKy.jsx           # 📝 Trang đăng ký
    │   ├── QuenMatKhau.jsx      # ❓ Trang quên mật khẩu
    │   ├── Dashboard.jsx        # 📊 Trang tổng quan
    │   ├── SuKien.jsx           # 📅 Quản lý sự kiện
    │   ├── ThanhVien.jsx        # 👥 Quản lý thành viên
    │   ├── ChiTieu.jsx          # 💰 Quản lý chi tiêu
    │   ├── ThongKe.jsx          # 📈 Trang thống kê (biểu đồ)
    │   └── HoSo.jsx             # 🙋 Trang hồ sơ cá nhân
    │
    └── 🎨 styles/                # CSS tách riêng theo từng phần
        ├── global.css
        ├── auth.css
        ├── navbar.css
        ├── sidebar.css
        ├── modal.css
        ├── dashboard.css
        ├── event.css
        ├── expense.css
        ├── member.css
        ├── profile.css
        └── statistic.css
```

## 📝 Ghi chú

- 🔀 Route được chia làm 2 nhóm: **Public** (đăng nhập/đăng ký/quên mật khẩu - chặn nếu đã có token) và **Protected** (dashboard, sự kiện, thành viên, chi tiêu, thống kê, hồ sơ - yêu cầu có token, nếu chưa đăng nhập sẽ bị đá về `/dang-nhap`).
- 🔑 Token đăng nhập được lưu ở `localStorage` và dùng để kiểm tra quyền truy cập ở `App.jsx`.
- 🖼️ Các trang nội bộ đều được bọc trong `MainLayout` (chứa Navbar + Sidebar).
