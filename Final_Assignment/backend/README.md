# 🖥️ Backend

## 🛠️ Ngôn ngữ & công nghệ sử dụng

- 🟢 Node.js + Express 5
- 🍃 MongoDB + Mongoose (ODM)
- 🔑 JWT (jsonwebtoken) cho xác thực người dùng
- 🔒 bcryptjs để mã hóa mật khẩu
- ⏱️ node-cron cho tác vụ chạy định kỳ (tự động cập nhật trạng thái sự kiện theo thời gian thực)
- 🌐 cors, dotenv

## 🌳 Cây thư mục

```
backend/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                    # 🚦 Điểm khởi động server, gắn middleware CORS/JSON, kết nối DB, chạy cron job, mount các route API
│
├── ⚙️ config/
│   └── db.js                    # 🍃 Kết nối tới MongoDB (Mongoose)
│
├── 🧬 models/                     # Định nghĩa Schema dữ liệu
│   ├── User.js                    # 👤 name, email, password, role (Lead/Member), taskDescription
│   ├── Event.js                   # 📅 title, mô tả, thời gian, địa điểm, loại sự kiện, trạng thái, người tạo, người phụ trách, chi phí, người trả
│   └── Expense.js                 # 💸 title, số tiền, người trả, danh mục, ngày, ghi chú
│
├── 🎛️ controllers/                # Xử lý logic nghiệp vụ cho từng route
│   ├── authController.js          # 🔐 Đăng ký, đăng nhập
│   ├── eventController.js         # 📅 CRUD sự kiện + lấy sự kiện trong ngày
│   ├── expenseController.js       # 💰 CRUD chi tiêu
│   ├── statController.js          # 📊 Thống kê dashboard, thống kê chi tiêu
│   └── userController.js          # 👥 CRUD người dùng/thành viên
│
├── 🛣️ routes/                       # Định nghĩa các endpoint API
│   ├── authRoutes.js               # /api/auth (register, login)
│   ├── eventRoutes.js              # /api/events 🔒 (yêu cầu đăng nhập)
│   ├── expenseRoutes.js            # /api/expenses
│   ├── statRoutes.js               # /api/stats 🔒 (yêu cầu đăng nhập)
│   └── userRoutes.js               # /api/users
│
├── 🛡️ middlewares/
│   └── auth.js                     # 🔑 Middleware `protect` - xác thực JWT token trước khi vào các route cần bảo vệ
│
└── ⏰ jobs/
    └── cron.js                     # 🔄 Cron job tự động cập nhật trạng thái sự kiện (Sắp tới → Đang diễn ra → Đã xong) theo mốc thời gian thực tế
```

## 📝 Ghi chú

- 🔒 Các route `/api/events` và `/api/stats` bắt buộc phải có token hợp lệ (qua middleware `protect`); `/api/expenses` và `/api/users` hiện chưa bật middleware bảo vệ.
- 🌐 CORS trong `server.js` chỉ cho phép 2 origin: domain frontend trên ▲ Vercel và `http://localhost:5173` (dev).
- ⏱️ `startCronJob()` được gọi ngay khi server khởi động để tự động đồng bộ trạng thái sự kiện theo thời gian mà không cần thao tác thủ công.
