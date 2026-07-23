
# Front-end của Web-Register (React + Vite)

Phần giao diện người dùng (Front-end) được xây dựng bằng ReactJS thông qua công cụ build siêu tốc Vite, sử dụng react-router-dom để quản lý định tuyến trang và giao tiếp trực tiếp với Back-end.

## Cây cấu trúc thư mục Front-end

Dưới đây là sơ đồ cấu trúc thư mục của phần Front-end (`frontend/`):

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