# < KaiLou @ Portfolio - Terminal Style >

Một trang web Portfolio cá nhân được xây dựng bằng **ReactJS (Vite)** mang phong cách giao diện Terminal (Dòng lệnh), tối giản và đậm chất kỹ thuật hệ thống. Dự án được thiết kế đặc biệt dành cho sinh viên ngành An toàn thông tin (Cybersecurity).

---

## 🚀 Các Tính Năng Nổi Bật (Features)

* **Terminal Interface Design:** Giao diện tối giản mô phỏng cửa sổ dòng lệnh Linux/Retro terminal với font chữ monospace chuyên dụng.
* **x86_64 Assembly Shellcode Simulation:** Trình bày mã máy in chuỗi "Hello World" chuẩn **Intel Syntax (64-bit)** thực tế (`sys_write` syscall), đi kèm hiệu ứng gõ chữ (Typewriter effect) chuyên nghiệp ở Header.
* **Persistent Dark/Light Mode:** Chuyển đổi giao diện Sáng/Tối mượt mà, tự động ghi nhớ và duy trì trạng thái của người dùng qua `localStorage` (không bị mất khi tải lại trang - F5).
* **Interactive Projects "Grep" Filter:** Tính năng lọc và tìm kiếm dự án bằng thanh tìm kiếm mô phỏng lệnh `grep` của Linux, quản lý trạng thái bằng React State.
* **Terminal-Style Controlled Form:** Form liên hệ được thiết kế dưới dạng Controlled Component với các lệnh nhập liệu (`$ whoami`, `$ mail`, `$ write`), có hệ thống kiểm tra tính hợp lệ dữ liệu (Validation) và hiển thị log trạng thái trực tiếp trên Terminal ảo.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Frontend Library:** ReactJS (v18+)
* **Build Tool:** Vite (Tối ưu hóa thời gian khởi chạy và Hot Module Replacement)
* **Styling:** CSS3 (Sử dụng CSS Custom Variables cho hệ thống màu Dark/Light Mode)
* **Icons:** Inline SVG (Tối ưu tốc độ tải trang, không phụ thuộc thư viện ngoài)

---

## 📂 Cấu Trúc Thư Mục (Project Structure)

```text
my-portfolio/
├── public/
│   └── Avatar.png          # Ảnh đại diện cá nhân
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Thanh điều hướng & Hiệu ứng gõ chữ Terminal
│   │   ├── Hero.jsx        # Giới thiệu & Code Assembly x86_64 Intel Syntax
│   │   ├── Projects.jsx    # Danh sách dự án (Card Terminal giả lập & bộ lọc grep)
│   │   └── Contact.jsx     # Form liên hệ kiểu terminal & Icon Social Media
│   ├── App.css             # CSS chính & Cấu hình theme màu
│   ├── App.jsx             # Component tổng quản lý State & Theme
│   └── main.jsx            # Điểm khởi chạy của React
├── AI_PROMPTS.md           # Nhật ký tương tác & Tối ưu bằng AI (Lấy điểm thưởng)
└── README.md               # Tài liệu hướng dẫn này
```