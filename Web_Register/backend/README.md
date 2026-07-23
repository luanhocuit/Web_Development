
# Back-end của Web-Register

Phần Back-end được xây dựng trên nền tảng **Node.js** và framework **Express.js**, kết hợp cơ sở dữ liệu **Firebase Firestore** và **Firebase Authentication**.

### Các chức năng chính:
* **Xác thực (Auth):** Xử lý API đăng ký (`/api/auth/register`) và đăng nhập (`/api/auth/login`). Có tích hợp Middleware kiểm tra định dạng email, độ mạnh của mật khẩu (sử dụng thư viện `validator`) và kiểm tra dữ liệu đầu vào.
* **Quản lý người dùng (User Management):** Cung cấp các Endpoint cho phép lấy thông tin profile (`GET /api/users/:uid`), cập nhật thông tin (`PUT /api/users/:uid`), và xóa tài khoản (`DELETE /api/users/:uid`) trực tiếp trên Firestore.
* **Bảo mật & Middleware:** Xác thực yêu cầu thông qua token và phân tách rõ ràng các tầng Controller, Route, Middleware để dễ dàng bảo trì.


## Cây cấu trúc thư mục Back-end

Dưới đây là sơ đồ cấu trúc thư mục của phần Back-end (`backend/`):

```text
backend/
├── config/
│   └── firebase.js          # Cấu hình kết nối Firebase Admin SDK & Firestore
├── controllers/
│   ├── authController.js    # Xểu lýlogic Đăng ký, Đăng nhập
│   └── userController.js    # Xử lý logic lấy, cập nhật và xóa thông tin user
├── middleware/
│   └── validation.js        # Kiểm tra tính hợp lệ của dữ liệu đầu vào (Email, Password,...)
├── routes/
│   └── auth.js              # Định tuyến API xác thực (/api/auth)
│   └── user.js              # Định tuyến API quản lý người dùng (/api/users)
└── server.js                # File khởi chạy ứng dụng Express server