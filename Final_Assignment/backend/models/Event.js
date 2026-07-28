const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: String },
  type: { 
    type: String, 
    enum: ['Ăn uống', 'Ngắm cảnh', 'Bonding', 'Khác'], 
    required: true 
  },
  status: {
    type: String,
    enum: ['Chờ duyệt', 'Sắp tới', 'Đang diễn ra', 'Đã xong', 'Hủy', 'Tạm hoãn'],
    default: 'Sắp tới'
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Multi-select
  cost: { type: Number, default: 0 },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Trigger hook: Bắt buộc Validate thời gian trước khi lưu vào DB
eventSchema.pre('save', function (next) {
  if (this.startTime >= this.endTime) {
    return next(new Error('Giờ kết thúc bắt buộc phải sau giờ bắt đầu.'));
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);