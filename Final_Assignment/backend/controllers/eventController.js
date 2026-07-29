const Event = require('../models/Event');

// [POST] Tạo sự kiện mới
exports.createEvent = async (req, res) => {
  try {
    const { startTime, endTime, ...rest } = req.body;

    // Kiểm tra Overlap (chống đè khung giờ, bỏ qua các event đã Hủy)
    const overlapEvent = await Event.findOne({
      status: { $ne: 'Hủy' },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (overlapEvent) {
      return res.status(400).json({ message: 'Khung giờ này đã bị chồng chéo hoàn toàn với sự kiện khác.' });
    }

    // Logic duyệt tự động: Lead tạo -> Sắp tới | Member tạo -> Chờ duyệt
    const status = req.user.role === 'Lead' ? 'Sắp tới' : 'Chờ duyệt';

    const event = await Event.create({
      ...rest, startTime, endTime,
      creator: req.user._id,
      status
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [PUT] Cập nhật / Duyệt sự kiện
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });

    // Ràng buộc quyền Member
    if (req.user.role === 'Member') {
      if (event.creator.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Bạn không có quyền sửa sự kiện của người khác.' });
      }
      if (event.status !== 'Chờ duyệt') {
        return res.status(403).json({ message: 'Không thể sửa sự kiện đã được Lead duyệt.' });
      }
      // Member không được tự ý đổi status
      delete req.body.status; 
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [DELETE] Xóa sự kiện
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });

    if (req.user.role === 'Member') {
      if (event.creator.toString() !== req.user._id.toString() || event.status !== 'Chờ duyệt') {
        return res.status(403).json({ message: 'Member chỉ được xóa sự kiện của mình và đang ở trạng thái Chờ duyệt.' });
      }
    }

    await event.deleteOne();
    res.json({ message: 'Xóa sự kiện thành công' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [GET] Lấy danh sách sự kiện (Kèm thông tin creator, assignees)
exports.getEvents = async (req, res) => {
  try {
    // Sort theo startTime để làm tính năng kéo thả / sắp xếp timeline dễ hơn
    const events = await Event.find().populate('creator assignees payer', 'name email role').sort('startTime');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// [GET] Lấy danh sách sự kiện diễn ra trong ngày hôm nay
exports.getEventsToday = async (req, res) => {
  try {
    // 1. Tạo mốc thời gian bắt đầu (00:00:00) và kết thúc (23:59:59) của ngày hôm nay
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 2. Tìm sự kiện có startTime nằm trong ngày hôm nay
    const todayEvents = await Event.find({
      startTime: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate('creator assignees payer', 'name email role')
    .sort('startTime');

    res.json(todayEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};