const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Đơn giản hóa: Phân quyền cứng 2 Role.
  role: { type: String, enum: ['Lead', 'Member'], default: 'Member' },
  taskDescription: { type: String } // Ví dụ: Nấu ăn, xem map, giữ tiền...
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);