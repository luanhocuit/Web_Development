const User = require('../models/User');

// Lấy danh sách toàn bộ thành viên (loại bỏ password để bảo mật)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi truy xuất danh sách thành viên', error });
    }
};

// Cập nhật vai trò hoặc nhiệm vụ cho thành viên (Role & Task)
exports.updateUserTask = async (req, res) => {
    try {
        const { role, taskDescription } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role, taskDescription },
            { new: true } // Trả về data mới sau khi update
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng trong hệ thống' });
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi hệ thống khi cập nhật thành viên', error });
    }
};

// --- PHẦN MỚI THÊM: Tạo thành viên mới & Bắt lỗi trùng Email ---
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Tạo user mới
        const newUser = new User({
            name,
            email,
            password: password || '123456', // Nếu không nhập mk thì mặc định là 123456
            role: role || 'Thành viên'
        });

        const savedUser = await newUser.save();
        
        // Ẩn password trước khi trả về Frontend
        savedUser.password = undefined;
        
        res.status(201).json({ 
            message: "Thêm thành viên thành công!", 
            user: savedUser 
        });

    } catch (error) {
        // BẮT LỖI E11000 TỪ DATABASE (Trùng Email)
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Email này đã có người sử dụng. Vui lòng nhập email khác!" 
            });
        }
        res.status(500).json({ message: 'Lỗi hệ thống khi tạo thành viên', error });
    }
};