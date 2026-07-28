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