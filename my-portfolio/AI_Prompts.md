# Báo cáo Ứng dụng AI (AI Prompt Engineering Log)

**Dự án:** Portfolio Cá nhân (ReactJS)
**Mục đích:** Ghi nhận quá trình sử dụng Trợ lý AI (LLM) để khởi tạo dự án, tối ưu hóa giao diện (UI/UX), tinh chỉnh mã nguồn theo phong cách của bản thân và debug.

---

## 1. Khởi tạo Dự án & Phân tích Barem
**Prompt đã sử dụng:**
> "Tôi cần xây dựng một trang web Portfolio cá nhân bằng ReactJS (Vite). Đây là các tiêu chí bắt buộc: 
> 1. Header có nút Dark/Light mode lưu trạng thái bằng localStorage.
> 2. Hero Section giới thiệu bản thân và nút Call-to-action.
> 3. Projects Section hiển thị danh sách dự án có thanh tìm kiếm (State management).
> 4. Contact Section có Form liên hệ (Controlled Component, Validation, chặn reload trang).
> Hãy thiết kế bộ khung thư mục và code mẫu, giao diện theo phong cách tối giản, Terminal/Hacker phù hợp với sinh viên An toàn thông tin."

**Kết quả nhận được:** Hệ thống sinh ra cấu trúc Component tiêu chuẩn, thiết lập nền tảng CSS Grid/Flexbox và hoàn thiện tính năng Dark/Light Mode bằng `useEffect`.

## 2. Tùy chỉnh Layout & CSS (Căn lề)
**Prompt đã sử dụng:**
> "Phần nội dung Contact hiện tại đang bị căn giữa trang. Làm thế nào để ép toàn bộ khối này và các icon mạng xã hội bám sát lề trái và cùng nằm trên một đường thẳng dọc với section Blog ở phía trên?"

**Kết quả nhận được:** AI giải thích về cơ chế Độ ưu tiên (Specificity) trong CSS, hướng dẫn gỡ bỏ Inline CSS (`margin: 4rem 0`) đang gây xung đột để trả component về hệ quy chiếu Global CSS chuẩn trong `App.css`.

## 3. Xây dựng Tính năng Nâng cao (Hiệu ứng & Mã Máy x86_64)
**Prompt đã sử dụng:**
> "Tôi muốn tạo hiệu ứng con trỏ nhấp nháy và gõ chữ tự động (Typewriter) cho thẻ Header. Tiếp theo, hãy thay thế đoạn code minh họa ở Hero Section thành mã Assembly kiến trúc x86_64 chuẩn Intel Syntax (dùng rdi, rsi, rdx và lệnh syscall) thực hiện in chuỗi 'Hello World' ra màn hình (giống với môi trường CTF)."

**Kết quả nhận được:** - Ứng dụng `setInterval` trong `useEffect` để tạo hiệu ứng gõ chữ cho Header.
- Xây dựng thành công khối code giả lập Shellcode x86_64, tối ưu hóa màu sắc cho từng thành phần (lệnh, thanh ghi, comment) để tăng trải nghiệm thị giác.

## 4. Đối chiếu Barem Điểm & Tích hợp Form
**Prompt đã sử dụng:**
> "[Cung cấp lại bảng tiêu chí chấm điểm]. Dựa vào tiêu chí này, giao diện hiện tại của tôi đã đạt yêu cầu chưa? Tôi muốn giữ lại các nút liên kết mạng xã hội, nhưng chèn thêm phần Form liên hệ (có Validation kiểm tra email và chặn e.preventDefault) ngay phía dưới để không bị mất điểm phần Controlled Component."

**Kết quả nhận được:** AI thiết kế một Form liên hệ mô phỏng lại các dòng lệnh Terminal (như `$ whoami`, `$ mail`), xử lý `useState` trơn tru và hiển thị trạng thái log trực quan thay vì dùng alert mặc định.

--