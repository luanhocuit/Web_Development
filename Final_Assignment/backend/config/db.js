const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Kết nối với MongoDB thông qua biến môi trường MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Kết nối MongoDB thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1); // Ép dừng server nếu không kết nối được DB
  }
};

module.exports = connectDB;