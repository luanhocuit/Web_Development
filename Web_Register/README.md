# Web-Register - Authentication & Profile Management System

Hệ thống quản lý xác thực người dùng và cập nhật thông tin cá nhân, được xây dựng với kiến trúc Full-stack gồm **React (Frontend)** và **Node.js/Express kết hợp Firebase (Backend)**.


## 1. Tổng quan kiến trúc hệ thống
* **Front-end:** ReactJS (Vite), React Router DOM, CSS thuần.
* **Back-end:** Node.js, Express.js, Firebase Authentication & Firestore.



## 2. Cấu trúc thư mục

### 2.1 Front-end :
```text
frontend/
├── config/
│   └── firebase.js          # Cấu hình Firebase Client SDK
├── public/                  # Tài nguyên tĩnh công khai (favicon, icons SVG)
├── services/
│   └── api.js               # Quản lý các phương thức giao tiếp API với Back-end
└── src/
    ├── assets/              # Tài nguyên đồ họa (hình ảnh, biểu tượng)
    ├── components/          # Các thành phần giao diện tái sử dụng
    │   ├── Button.jsx       # Nút bấm tùy chỉnh chung
    │   ├── InputField.jsx   # Ô nhập liệu tích hợp icon và trạng thái disable
    │   ├── Logo.jsx         # Logo thương hiệu và tiêu đề hệ thống
    │   ├── ProfileCard.jsx  # Thẻ chứa thông tin và form chỉnh sửa profile
    │   ├── SideBar.jsx      # Thanh điều hướng trái và xử lý đăng xuất (Logout)
    │   └── StatsCard.jsx    # Thẻ hiển thị các chỉ số thống kê (Login, Projects,...)
    ├── pages/               # Các trang giao diện chính
    │   ├── Login.jsx        # Giao diện đăng nhập hệ thống
    │   ├── Profile.jsx      # Giao diện trang chủ / quản lý profile cá nhân
    │   └── Register.jsx     # Giao diện đăng ký tài khoản mới
    ├── styles/              # Các file định dạng giao diện CSS
    │   ├── global.css       # Các biến và style chung toàn cục
    │   ├── login.css        # Style riêng cho trang Login
    │   ├── profile.css      # Style riêng cho trang Profile & Dashboard
    │   ├── register.css     # Style riêng cho trang Register
    │   └── sidebar.css      # Style riêng cho thanh Sidebar
    ├── App.jsx              # Cấu hình các luồng định tuyến (Routes) chính
    ├── App.css              # Style gốc của App
    ├── index.css            # Style reset CSS
    └── main.jsx             # Điểm khởi chạy (Entry point) của ứng dụng React
```

### 2.2. Back-end :
```text
backend/
├── config/
│   └── firebase.js          # Cấu hình kết nối Firebase Admin SDK & Firestore
├── controllers/
│   ├── authController.js    # Xử lý logic Đăng ký, Đăng nhập
│   └── userController.js    # Xử lý logic lấy, cập nhật và xóa thông tin user
├── middleware/
│   └── validation.js        # Kiểm tra tính hợp lệ của dữ liệu đầu vào (Email, Password,...)
├── routes/
│   ├── auth.js              # Định tuyến API xác thực (/api/auth)
│   └── user.js              # Định tuyến API quản lý người dùng (/api/users)
└── server.js                # File khởi chạy ứng dụng Express server
```
## Website : 
[Web-Register](https://web-register-ashen.vercel.app)

=> Nếu mà login/register đợi lâu là do backend/database đang load lại (do mình dùng free:3 hihi)
