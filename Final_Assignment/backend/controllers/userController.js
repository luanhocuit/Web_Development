const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Lấy danh sách toàn bộ thành viên (loại bỏ password để bảo mật)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error("Lỗi get users:", error);
        res.status(500).json({ message: 'Lỗi khi truy xuất danh sách thành viên', error });
    }
};

// ĐÃ SỬA: Biến hàm này thành hàm cập nhật toàn bộ thông tin User
exports.updateUserTask = async (req, res) => {
    try {
        const { name, email, role, taskDescription } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, taskDescription },
            { returnDocument: 'after', runValidators: true } // Sửa warning Mongoose của bạn luôn
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng trong hệ thống' });
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Lỗi update user:", error); // Bắt lỗi in ra terminal
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email này đã có người sử dụng. Vui lòng chọn email khác!' });
        }
        res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật thành viên', error });
    }
};

// Tạo thành viên mới & Bắt lỗi trùng Email
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. CHUẨN BỊ MẬT KHẨU VÀ BĂM (HASH) NÓ
        const rawPassword = password || '123456'; 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        // 2. TẠO USER VỚI MẬT KHẨU ĐÃ BĂM
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role 
        });

        const savedUser = await newUser.save();
        
        // Ẩn password trước khi trả về Frontend
        savedUser.password = undefined;
        
        res.status(201).json({ 
            message: "Thêm thành viên thành công!", 
            user: savedUser 
        });

    } catch (error) {
        console.error("Lỗi create user:", error); // Bắt lỗi in ra terminal
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Email này đã có người sử dụng. Vui lòng nhập email khác!" 
            });
        }
        res.status(500).json({ message: 'Lỗi hệ thống khi tạo thành viên', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy thành viên này' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Lỗi get user id:", error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin thành viên', error });
    }
};