import {
    FaMoneyBillWave,
    FaUser,
    FaUsers,
    FaCalendarAlt,
    FaEdit,
    FaTrash
} from "react-icons/fa";

function ExpenseCard({ expense, onEdit, onDelete }) {
    // Đảm bảo không bị lỗi chia cho 0
    const memberCount = expense.members > 0 ? expense.members : 1;
    const eachPerson = Math.round((expense.amount || 0) / memberCount);

    // Xử lý an toàn cho tên người trả (tránh lỗi Error #31 trắng trang)
    const payerName = typeof expense.payer === 'object' ? expense.payer?.name : expense.payer;

    // Xử lý hiển thị ngày (Dành cho cả Expense thường và Event)
    const displayDate = expense.date || (expense.createdAt ? new Date(expense.createdAt).toLocaleDateString('vi-VN') : "Chưa rõ");

    return (
        <div className="expense-card">
            <div className="expense-top">
                <div>
                    <h2>{expense.title}</h2>
                    <p>Khoản chi của chuyến đi</p>
                </div>
                <div className="expense-price">
                    {(expense.amount || 0).toLocaleString()} VNĐ
                </div>
            </div>
            <div className="expense-body">
                <div className="expense-item">
                    <FaUser />
                    <span>
                        Người thanh toán:
                        <strong> {payerName || "Chưa rõ"}</strong>
                    </span>
                </div>
                <div className="expense-item">
                    <FaUsers />
                    <span>
                        Thành viên tham gia:
                        <strong> {expense.members || 1}</strong>
                    </span>
                </div>
                <div className="expense-item">
                    <FaCalendarAlt />
                    <span>
                        Ngày:
                        <strong> {displayDate}</strong>
                    </span>
                </div>
                <div className="expense-item">
                    <FaMoneyBillWave />
                    <span>
                        Mỗi người cần trả:
                        <strong> {eachPerson.toLocaleString()} VNĐ</strong>
                    </span>
                </div>
            </div>
            
            {/* CHỈ HIỂN THỊ NÚT SỬA/XÓA NẾU KHÔNG PHẢI LÀ KHOẢN CHI TỪ SỰ KIỆN */}
            {!expense.isEvent && (
                <div className="expense-footer">
                    <button className="edit-btn" onClick={() => onEdit(expense)}>
                        <FaEdit /> Sửa
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(expense._id || expense.id)}>
                        <FaTrash /> Xóa
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExpenseCard;