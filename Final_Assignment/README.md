# 🎉 Final Assignment - Quản Lý Sự Kiện & Chi Tiêu Nhóm

## 📖 1. Giới thiệu dự án

Đây là một ứng dụng web full-stack dùng để **quản lý sự kiện và chi tiêu cho một nhóm/team** (ví dụ: lên lịch trình chuyến đi, phân công công việc, theo dõi chi phí chung và thống kê lại toàn bộ hoạt động).

Ứng dụng có 2 phần tách biệt:
- 🖥️ **Backend**: cung cấp REST API, xử lý xác thực, lưu trữ dữ liệu.
- 🎨 **Frontend**: giao diện người dùng (SPA) gọi API để hiển thị và thao tác dữ liệu.

## ⚙️ 2. Chức năng chính

- 🔐 **Xác thực người dùng**: Đăng ký, Đăng nhập, Quên mật khẩu (JWT-based auth).
- 👑 **Phân quyền**: 2 vai trò `Lead` và `Member`.
- 📅 **Quản lý sự kiện**: tạo/sửa/xóa sự kiện, gán người phụ trách (nhiều người), phân loại (🍜 Ăn uống, 🏞️ Ngắm cảnh, 🤝 Bonding, ✨ Khác), theo dõi trạng thái (⏳ Chờ duyệt, 🔜 Sắp tới, ▶️ Đang diễn ra, ✅ Đã xong, ❌ Hủy, ⏸️ Tạm hoãn).
- ⏰ **Cập nhật trạng thái tự động (real-time)**: dùng cron job để tự động cập nhật trạng thái sự kiện theo thời gian thực (Sắp tới → Đang diễn ra → Đã xong).
- 💸 **Quản lý chi tiêu**: ghi nhận khoản chi, người trả tiền, phân loại chi phí (Ăn uống, Di chuyển, Lưu trú, Hoạt động, Khác).
- 👥 **Quản lý thành viên**: xem danh sách, chi tiết, thêm/sửa/xóa thành viên và công việc được giao.
- 📊 **Thống kê**: dashboard tổng quan và thống kê chi tiêu (biểu đồ bằng Recharts).
- 🙋 **Trang hồ sơ cá nhân** cho người dùng.

## 🛠️ 3. Ngôn ngữ & công nghệ sử dụng

**🖥️ Backend**
- 🟢 Node.js + Express 5
- 🍃 MongoDB + Mongoose (ODM)
- 🔑 JWT (jsonwebtoken) cho xác thực
- 🔒 bcryptjs để mã hóa mật khẩu
- ⏱️ node-cron cho tác vụ định kỳ (tự động cập nhật trạng thái sự kiện)
- 🌐 cors, dotenv

**🎨 Frontend**
- ⚛️ React 19 + Vite
- 🧭 React Router DOM v7 (điều hướng, route bảo vệ theo token)
- 📈 Recharts (biểu đồ thống kê)
- 🧩 react-icons
- 🎀 CSS thuần (chia theo module: auth, dashboard, event, expense, member, modal, navbar, profile, sidebar, statistic)

**🚀 Triển khai (Deploy)**
- Frontend: ▲ Vercel
- Backend: server Node.js riêng (CORS cấu hình cho phép domain Vercel + localhost)

## 🌳 4. Cây thư mục tổng quát

```
Final_Assignment/
├── 🖥️ backend/               # REST API - Node.js + Express + MongoDB
│   ├── config/                # Kết nối database
│   ├── controllers/           # Xử lý logic (auth, event, expense, stat, user)
│   ├── jobs/                  # Cron job cập nhật trạng thái tự động
│   ├── middlewares/           # Middleware xác thực (JWT)
│   ├── models/                # Schema Mongoose (User, Event, Expense)
│   ├── routes/                # Định nghĩa API endpoint
│   ├── package.json
│   └── server.js              # Điểm khởi động server
│
└── 🎨 frontend/               # Giao diện người dùng - React + Vite
    ├── public/                 # Tài nguyên tĩnh (favicon, icons)
    ├── src/
    │   ├── components/         # Component tái sử dụng (Card, Modal, Navbar, Sidebar...)
    │   ├── layouts/             # Layout chính của ứng dụng
    │   ├── pages/                # Các trang: Đăng nhập, Đăng ký, Dashboard, Sự kiện, Thành viên, Chi tiêu, Thống kê, Hồ sơ...
    │   ├── styles/               # File CSS riêng cho từng phần
    │   ├── App.jsx               # Định nghĩa route của toàn app
    │   └── main.jsx              # Điểm khởi động React
    ├── package.json
    └── vite.config.js
```

> 📝 Ghi chú: chi tiết đầy đủ cây thư mục của từng phần (backend/frontend) xem thêm trong `README.md` riêng ở mỗi thư mục con.
