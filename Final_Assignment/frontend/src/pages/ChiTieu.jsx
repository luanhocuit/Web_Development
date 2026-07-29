import { useState, useEffect } from "react";
import { FaPlus, FaWallet } from "react-icons/fa";
import ExpenseCard from "../components/ExpenseCard";
import Modal from "../components/Modal";
import "../styles/expense.css";

function ChiTieu() {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ total: 0, topSpender: "Đang cập nhật", topAmount: 0 });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái mở Modal

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token");
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await fetch(`${apiUrl}/api/expenses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                const expList = data.expenses || data;
                setExpenses(expList);
                
                const total = expList.reduce((acc, curr) => acc + (curr.amount || 0), 0);
                setSummary({ total, topSpender: "Đang cập nhật", topAmount: 0 });
            }
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
                {/* Nút mở Modal Thêm khoản chi */}
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
                    <p>-- VNĐ</p>
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
                            <ExpenseCard key={expense._id || expense.id} expense={expense} />
                        ))
                    ) : (
                        <p>Chưa có khoản chi tiêu nào được ghi nhận.</p>
                    )}
                </div>
            )}

            {/* Gọi Component Modal */}
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