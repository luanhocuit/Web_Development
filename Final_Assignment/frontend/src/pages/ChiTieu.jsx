import { useState, useEffect } from "react";
import { FaPlus, FaWallet } from "react-icons/fa";
import ExpenseCard from "../components/ExpenseCard";
import Modal from "../components/Modal";
import "../styles/expense.css";

function ChiTieu() {
    const [expenses, setExpenses] = useState([]);
    // Đã thêm totalPerPerson vào state summary
    const [summary, setSummary] = useState({ total: 0, topSpender: "Đang cập nhật", topAmount: 0, totalPerPerson: 0 });
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";

            const expenseRes = await fetch(`${apiUrl}/api/expenses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const expenseData = await expenseRes.json();
            const pureExpenses = expenseRes.ok ? (expenseData.expenses || expenseData) : [];

            const eventRes = await fetch(`${apiUrl}/api/events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const eventData = await eventRes.json();
            const eventList = eventRes.ok ? (eventData.events || eventData) : [];

            const eventExpenses = eventList
                .filter(event => event.cost && event.cost > 0)
                .map(event => ({
                    _id: event._id,
                    title: `(Sự kiện) ${event.title}`, 
                    amount: event.cost,
                    payer: event.payer || "Cả nhóm",
                    createdAt: event.startTime || event.createdAt,
                    members: event.participants?.length || 1,
                    isEvent: true 
                }));

            const allExpenses = [...pureExpenses, ...eventExpenses];
            allExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setExpenses(allExpenses);
            
            // 1. Tính tổng chi phí
            const total = allExpenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
            
            // 2. Tính trung bình số tiền Cần thanh toán (Mỗi người cần trả)
            const totalPerPerson = allExpenses.reduce((acc, curr) => {
                const membersCount = curr.members || 1; // Tránh chia cho 0
                return acc + ((curr.amount || 0) / membersCount);
            }, 0);
            
            // 3. Tìm người chi nhiều nhất
            const spenderTotals = {};
            allExpenses.forEach(exp => {
                const payerName = typeof exp.payer === 'object' ? exp.payer?.name : (exp.payer || "Chưa rõ");
                if (payerName !== "Chưa rõ" && payerName !== "Cả nhóm") {
                    if (!spenderTotals[payerName]) spenderTotals[payerName] = 0;
                    spenderTotals[payerName] += (exp.amount || 0);
                }
            });

            let topSpender = "Đang cập nhật";
            let topAmount = 0;
            for (const [name, amount] of Object.entries(spenderTotals)) {
                if (amount > topAmount) {
                    topAmount = amount;
                    topSpender = name;
                }
            }
            
            // Cập nhật state đầy đủ
            setSummary({ total, topSpender, topAmount, totalPerPerson });

        } catch (error) {
            console.error("Lỗi lấy danh sách chi tiêu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleOpenAddModal = () => {
        setEditingExpense(null);
        setIsModalOpen(true);
    };

    const handleEdit = (expense) => {
        if (expense.isEvent) {
            alert("Khoản chi này từ Sự kiện. Vui lòng sang trang Quản lý sự kiện để sửa!");
            return;
        }
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const handleDelete = async (expense) => {
        if (expense.isEvent) {
            alert("Khoản chi này từ Sự kiện. Vui lòng sang trang Quản lý sự kiện để xóa!");
            return;
        }
        if (!window.confirm("Bạn có chắc chắn muốn xóa khoản chi này?")) return;

        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";
            const expenseId = expense._id || expense.id;

            const response = await fetch(`${apiUrl}/api/expenses/${expenseId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                fetchExpenses(); 
            } else {
                alert("Xóa thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
        }
    };

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản lý chi tiêu</h1>
                    <p className="page-subtitle">Theo dõi toàn bộ chi phí chuyến đi.</p>
                </div>
                <button className="btn" onClick={handleOpenAddModal}>
                    <FaPlus /> Thêm khoản chi
                </button>
            </div>

            <div className="expense-summary">
                <div className="summary-box">
                    <FaWallet />
                    <div>
                        <h3>Tổng chi phí</h3>
                        <h2>{summary.total.toLocaleString()} VNĐ</h2>
                    </div>
                </div>
                <div className="summary-box">
                    <h3>Người chi nhiều nhất</h3>
                    <h2>{summary.topSpender}</h2>
                    <p>{summary.topAmount > 0 ? `${summary.topAmount.toLocaleString()} VNĐ` : "-- VNĐ"}</p>
                </div>
                
                {/* Đã cập nhật hiển thị Cần thanh toán tại đây */}
                <div className="summary-box">
                    <h3>Cần thanh toán</h3>
                    <h2>{Math.round(summary.totalPerPerson).toLocaleString()} VNĐ</h2>
                    <p>Trung bình mỗi người</p>
                </div>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu chi tiêu...</p>
            ) : (
                <div className="expense-list">
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <ExpenseCard 
                                key={expense._id} 
                                expense={expense} 
                                onEdit={() => handleEdit(expense)} 
                                onDelete={() => handleDelete(expense)} 
                            />
                        ))
                    ) : (
                        <p>Chưa có khoản chi tiêu nào được ghi nhận.</p>
                    )}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                editingEvent={editingExpense} 
                onClose={() => setIsModalOpen(false)}
                onSave={fetchExpenses}
                type="expense"
            />
        </div>
    );
}

export default ChiTieu;