const Expense = require('../models/Expense');

// Lấy danh sách toàn bộ chi tiêu (Kèm thông tin người chi)
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate('payer', 'name email role')
            .sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi tải chi tiêu', error });
    }
};

// Tạo khoản chi tiêu mới
exports.createExpense = async (req, res) => {
    try {
        const { title, amount, payer, category, date, note } = req.body;
        
        const newExpense = new Expense({
            title,
            amount,
            payer: payer || req.user.id, // Mặc định lấy user đang đăng nhập nếu không truyền
            category,
            date,
            note
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo chi tiêu mới', error });
    }
};

// Xóa khoản chi
exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Không tìm thấy khoản chi này' });
        }
        
        res.status(200).json({ message: 'Đã xóa khoản chi thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa chi tiêu', error });
    }
};