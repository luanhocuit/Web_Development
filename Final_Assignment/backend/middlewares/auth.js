const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kiểm tra xem User có đăng nhập chưa (có mang Token hợp lệ không)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
  }
  if (!token) return res.status(401).json({ message: 'Không có token, từ chối truy cập.' });
};

// Kiểm tra xem User có phải là Lead không
const isLead = (req, res, next) => {
  if (req.user && req.user.role === 'Lead') {
    next();
  } else {
    res.status(403).json({ message: 'Hành động bị từ chối. Chỉ Lead mới có quyền thực hiện.' });
  }
};

module.exports = { protect, isLead };