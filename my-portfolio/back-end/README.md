# 🚀 Backend API - Portfolio Project

Đây là dịch vụ RESTful API được xây dựng bằng Node.js và Express, phục vụ việc quản lý dữ liệu dự án cho website Portfolio.

## 🛠️ Công Nghệ & Dịch Vụ Back-end (Tech Stack)

* **Runtime:** Node.js (Môi trường thực thi JavaScript phía server)
* **Framework:** Express.js (Xây dựng RESTful API tinh gọn, hiệu năng cao)
* **Middleware:** * **CORS:** Cấu hình cho phép kết nối an toàn giữa Frontend (Vercel) và Backend (Render).
    * **Express JSON:** Xử lý và phân tích dữ liệu JSON từ Client.
* **Data Storage:** `projects.json` (File-based database, tối ưu cho dữ liệu dự án).

## 🔗 Hỗ Trợ Chuẩn RESTful API

Các endpoint được thiết kế tuân thủ chuẩn RESTful, sử dụng đúng các HTTP Methods để tương tác với tài nguyên:

| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | Lấy danh sách dự án. Hỗ trợ lọc qua query `?search=` hoặc `?tech=` |
| `POST` | `/api/projects` | Thêm dự án mới vào hệ thống |
| `PUT` | `/api/projects/:id` | Cập nhật thông tin dự án theo ID |
| `DELETE` | `/api/projects/:id` | Xóa dự án khỏi hệ thống theo ID |

## 🚀 Hướng dẫn khởi chạy (Local)

**Bước 1: Cài đặt thư viện cần thiết**
```bash
npm install
npm install express cors
```
**Bước 2: Khởi chạy server**
```bash
node index.js
```

## 📂 Cấu Trúc Thư Mục (Project Structure)
```text
back-end/
├── data/
│   └── projects.json        # Nơi lưu trữ dữ liệu dự án (DB giả lập)
├── index.js                 # File chính: Chứa logic Server, Routes và API
├── package.json             # File cấu hình: Chứa dependencies (express, cors) và scripts
├── package-lock.json        # File tự sinh để quản lý phiên bản thư viện
└── README.md                # Tài liệu hướng dẫn sử dụng API (file bạn vừa làm)
```