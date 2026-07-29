require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const startCronJob = require('./jobs/cron');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const statRoutes = require('./routes/statRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); 

const app = express();

// Cấu hình CORS chuẩn chỉ cho phép Vercel và Localhost đi qua
app.use(cors({
    origin: ["https://final-assignment-lyart-psi.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
}));

app.use(express.json());

// Kết nối DB và chạy Realtime Engine
connectDB();
startCronJob();

// Gắn các đường dẫn API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/expenses', expenseRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại port ${PORT} 🚀`);
});