const cron = require('node-cron');
const Event = require('../models/Event');

const startCronJob = () => {
  // Biểu thức '* * * * *' nghĩa là chạy task này mỗi 1 phút
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // 1. Quét các event "Sắp tới" đã đến giờ -> Đẩy sang "Đang diễn ra"
      await Event.updateMany(
        { status: 'Sắp tới', startTime: { $lte: now } },
        { $set: { status: 'Đang diễn ra' } }
      );

      // 2. Quét các event "Đang diễn ra" đã lố giờ -> Đẩy sang "Đã xong"
      await Event.updateMany(
        { status: 'Đang diễn ra', endTime: { $lte: now } },
        { $set: { status: 'Đã xong' } }
      );

      // (Các Event trạng thái 'Hủy', 'Tạm hoãn', 'Chờ duyệt' tự động bị bỏ qua do bộ lọc ở trên)
    } catch (error) {
      console.error('Lỗi khi chạy background service:', error);
    }
  });
};

module.exports = startCronJob;