const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình đường dẫn tới file dữ liệu
const DATA_PATH = path.join(__dirname, 'data', 'projects.json');

app.use(cors());
app.use(express.json());

// --- Hàm hỗ trợ đọc/ghi file ---
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// --- CÁC ROUTE RESTFUL API ---

// 1. GET: Lấy danh sách (có hỗ trợ Tìm kiếm/Lọc)
app.get('/api/projects', (req, res) => {
    let projects = readData();
    const { search, tech } = req.query; // Nhận tham số từ URL (?search=...)

    if (search) {
        projects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (tech) {
        projects = projects.filter(p => p.tech.toLowerCase().includes(tech.toLowerCase()));
    }
    res.json(projects);
});

// 2. POST: Thêm dự án mới
app.post('/api/projects', (req, res) => {
    const projects = readData();
    const newProject = { id: Date.now(), ...req.body }; // Tạo ID mới bằng thời gian hiện tại
    projects.push(newProject);
    writeData(projects);
    res.status(201).json(newProject);
});

// 3. PUT: Cập nhật dự án theo ID
app.put('/api/projects/:id', (req, res) => {
    let projects = readData();
    const index = projects.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...req.body };
        writeData(projects);
        res.json(projects[index]);
    } else {
        res.status(404).json({ message: "Không tìm thấy dự án" });
    }
});

// 4. DELETE: Xóa dự án
app.delete('/api/projects/:id', (req, res) => {
    let projects = readData();
    const filtered = projects.filter(p => p.id != req.params.id);
    writeData(filtered);
    res.json({ message: "Đã xóa dự án thành công" });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});