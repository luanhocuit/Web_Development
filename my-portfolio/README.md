# 🚀 My Portfolio

Một hệ thống Portfolio cá nhân hoàn chỉnh. Dự án không chỉ là nơi lưu trữ các quá trình thực hành, rèn luyện kỹ năng mà còn thể hiện tư duy hệ thống từ việc xây dựng UI/UX đến kiến trúc API RESTful.

## ✨ Tính Năng Nổi Bật (Features)

* **Kiến trúc Full-stack:** Tách biệt hoàn toàn phần giao diện (Frontend) và máy chủ xử lý dữ liệu (Backend), giao tiếp mượt mà qua các HTTP requests.
* **Kết nối Dữ liệu Động:** Danh sách dự án và thông tin được fetch trực tiếp từ Backend theo thời gian thực.
* **Quản lý Trạng thái:** Hỗ trợ bộ lọc động và lưu trữ trạng thái giao diện (Dark/Light Mode) bền vững.

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Phân hệ Frontend:** ReactJS (v18+), Vite, CSS3.
* **Phân hệ Backend:** Node.js, Express.js, CORS.
* **Cơ sở dữ liệu:** File-based storage (`projects.json`).
* **Môi trường Triển khai:** Vercel (Client) & Render (Server).

## 📂 Cấu Trúc Thư Mục Tổng Quan (Project Structure)

```text
my-portfolio/
├── back-end/                # ⚙️ Phân hệ Máy chủ và Dữ liệu API (Node.js/Express)
│   ├── data/
│   ├── index.js
│   ├── package.json
│   └── README.md
├── front-end/               # 💻 Phân hệ Giao diện người dùng (ReactJS/Vite)
│   ├── public/
│   ├── src/
│   ├── AI_Prompts.md
│   ├── package.json
│   └── README.md
└── README.md                # 📖 Tài liệu tổng quan toàn bộ dự án (File này)