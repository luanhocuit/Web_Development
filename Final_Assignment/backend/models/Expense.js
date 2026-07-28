const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true,
        min: [0, 'Số tiền không hợp lệ']
    },
    payer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: {
        type: String,
        enum: ['Ăn uống', 'Di chuyển', 'Lưu trú', 'Hoạt động', 'Khác'],
        default: 'Khác'
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    note: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);