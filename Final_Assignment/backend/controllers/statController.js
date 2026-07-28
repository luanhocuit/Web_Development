const Event = require('../models/Event');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const events = await Event.find({ status: { $ne: 'Hủy' } });
    
    // 1. Thống kê theo loại hoạt động & trạng thái
    const statsByType = {};
    const statsByStatus = {};
    let currentEvents = [];

    events.forEach(ev => {
      // Đếm theo type
      statsByType[ev.type] = (statsByType[ev.type] || 0) + 1;
      // Đếm theo status
      statsByStatus[ev.status] = (statsByStatus[ev.status] || 0) + 1;
      
      if (ev.status === 'Đang diễn ra') {
        currentEvents.push(ev);
      }
    });

    res.json({ statsByType, statsByStatus, currentEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenseStats = async (req, res) => {
  try {
    const events = await Event.find({ status: { $nin: ['Hủy', 'Tạm hoãn'] } }).populate('assignees payer', 'name');
    const users = await User.find();
    
    // Bảng theo dõi nợ nần
    const ledger = {};
    users.forEach(u => {
      ledger[u._id.toString()] = { name: u.name, totalPaid: 0, totalOwed: 0, balance: 0 };
    });

    let totalTripCost = 0;

    events.forEach(event => {
      if (event.cost > 0 && event.payer) {
        totalTripCost += event.cost;
        
        // Ghi nhận số tiền người trả (Payer) đã bỏ ra
        const payerId = event.payer._id.toString();
        if (ledger[payerId]) ledger[payerId].totalPaid += event.cost;

        // Chia đều tiền cho những người tham gia (Assignees)
        if (event.assignees && event.assignees.length > 0) {
          const costPerPerson = event.cost / event.assignees.length;
          event.assignees.forEach(assignee => {
            const assigneeId = assignee._id.toString();
            if (ledger[assigneeId]) ledger[assigneeId].totalOwed += costPerPerson;
          });
        }
      }
    });

    // Chốt sổ: Balance = Đã trả - Phải trả (Dương là chủ nợ, Âm là con nợ)
    const userStats = Object.values(ledger).map(stat => ({
      ...stat,
      balance: stat.totalPaid - stat.totalOwed
    }));

    res.json({ totalTripCost, userStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};