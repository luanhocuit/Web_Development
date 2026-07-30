import { useState, useEffect } from "react";
import { FaPlus, FaWallet } from "react-icons/fa";
import ExpenseCard from "../components/ExpenseCard";
import Modal from "../components/Modal";
import "../styles/expense.css";

function ChiTieu() {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ total: 0, topSpender: "Đang cập nhật", topAmount: 0 });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL || "https://final-assignment-x6nf.onrender.com";

            // 1. Lấy danh sách Chi tiêu
            const expenseRes = await fetch(`${apiUrl}/api/expenses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const expenseData = await expenseRes.json();
            const pureExpenses = expenseRes.ok ? (expenseData.expenses || expenseData) : [];

            // 2. Lấy danh sách Sự kiện để lấy các sự kiện CÓ CHI PHÍ
            const eventRes = await fetch(`${apiUrl}/api/events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const eventData = await eventRes.json();
            const eventList = eventRes.ok ? (eventData.events || eventData) : [];

            // Lọc các sự kiện có tiền và format lại để ExpenseCard đọc được
            const eventExpenses = eventList
                .filter(event => event.cost && event.cost > 0)
                .map(event => ({
                    _id: event._id,
                    title: `(Sự kiện) ${event.title}`, 
                    amount: event.cost,
                    payer: event.payer || "Cả nhóm",
                    createdAt: event.startTime || event.createdAt,
                    members: event.participants?.length || 1 // Số người tham gia event
                }));

            // 3. Gộp cả 2 danh sách lại
            const allExpenses = [...pureExpenses, ...eventExpenses];
            
            // Sắp xếp ưu tiên hiển thị mới nhất lên đầu
            allExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setExpenses(allExpenses);
            
            // 4. Tính toán tổng chi phí và Người chi nhiều nhất
            const total = allExpenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
            
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

            setSummary({ total, topSpender, topAmount });

        } catch (error) {
            console.error("Lỗi lấy danh sách chi tiêu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Quản lý chi tiêu</h1>
                    <p className="page-subtitle">Theo dõi toàn bộ chi phí chuyến đi.</p>
                </div>
                <button className="btn" onClick={() => setIsModalOpen(true)}>
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
                <div className="summary-box">
                    <h3>Cần thanh toán</h3>
                    <h2>-- VNĐ</h2>
                    <p>Đang chờ tính toán</p>
                </div>
            </div>

            {loading ? (
                <p>Đang tải dữ liệu chi tiêu...</p>
            ) : (
                <div className="expense-list">
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <ExpenseCard key={expense._id} expense={expense} />
                        ))
                    ) : (
                        <p>Chưa có khoản chi tiêu nào được ghi nhận.</p>
                    )}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={fetchExpenses}
                type="expense"
            />
        </div>
    );
}

export default ChiTieu;