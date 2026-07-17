# 💻 Frontend - <KaiLou@Portfolio>

Phần giao diện người dùng của Portfolio, tập trung vào trải nghiệm mượt mà, thao tác nhanh gọn và kết nối trực tiếp với API để lấy dữ liệu.

## ✨ Tính Năng Nổi Bật (Features)


* **Persistent Dark/Light Mode:** Chuyển đổi giao diện Sáng/Tối mượt mà, tự động ghi nhớ và duy trì trạng thái của người dùng qua `localStorage` (không bị mất khi tải lại trang - F5).
* **Interactive Projects "Grep" Filter:** Tính năng lọc và tìm kiếm dự án bằng thanh tìm kiếm mô phỏng lệnh `grep` của Linux, quản lý trạng thái bằng React State.
* **Dynamic Data Rendering:** Sử dụng Fetch API để tự động lấy danh sách dự án từ máy chủ Backend và render ra các thẻ (Card) dự án.

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Frontend Library:** ReactJS (v18+)
* **Build Tool:** Vite (Tối ưu hóa thời gian khởi chạy và Hot Module Replacement)
* **Styling:** CSS3 (Sử dụng CSS Custom Variables cho hệ thống màu Dark/Light Mode)
* **Icons:** Inline SVG (Tối ưu tốc độ tải trang, không phụ thuộc thư viện ngoài)

## 📂 Cấu Trúc Thư Mục (Frontend Structure)

```text
front-end/
├── public/                 # Chứa tài nguyên tĩnh (VD: Avatar.png)
├── src/                    # Mã nguồn chính của React
│   ├── components/         # Các thành phần giao diện độc lập
│   │   ├── Contact.jsx     # Form liên hệ & Icon mạng xã hội
│   │   ├── Header.jsx      # Thanh điều hướng & Hiệu ứng Terminal
│   │   ├── Hero.jsx        # Giới thiệu & Code định dạng Assembly
│   │   └── Projects.jsx    # Danh sách dự án & Gọi API Backend
│   ├── App.css             # CSS chính & Cấu hình theme màu
│   ├── App.jsx             # Component Root quản lý State & Theme
│   └── main.jsx            # Điểm khởi chạy ứng dụng React
├── AI_Prompts.md           # Nhật ký tương tác & Tối ưu bằng AI
├── index.html              # Template HTML gốc
├── package.json            # Quản lý thư viện Frontend (React, Vite)
├── vite.config.js          # Cấu hình đóng gói Vite
└── README.md               # 📖 Tài liệu cấu trúc
```