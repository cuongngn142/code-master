const { query, run } = require('../config/database');

const addpracticeController = {
    // Form thêm bài tập
    showAddForm: async (req, res) => {
        try {
            // Lấy danh sách chủ đề để hiển thị trong form
            const chuDe = await query('SELECT * FROM ChuDe');
            res.render('addpractice', { 
                user: req.session.user,
                chuDe: chuDe
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).send('Lỗi server');
        }
    },

    // Thêm bài tập mới
    addPractice: async (req, res) => {
        try {
            const { title, description, difficulty, topic } = req.body;
            
            // Kiểm tra người dùng đã đăng nhập
            if (!req.session.user || !req.session.user.id) {
                throw new Error('Vui lòng đăng nhập để thêm bài tập');
            }

            const nguoiTao = req.session.user.id;
            const ngayTao = new Date().toISOString(); // Chuyển đổi sang định dạng ISO string

            // Kiểm tra dữ liệu đầu vào
            if (!title || !description || !difficulty || !topic) {
                throw new Error('Vui lòng điền đầy đủ thông tin bài tập');
            }

            // Thêm bài tập mới vào database sử dụng run thay vì query
            const result = await run(
                'INSERT INTO BaiTap (TieuDe, MoTa, MucDoKho, MaChuDe, NgayTao, NguoiTao) VALUES (?, ?, ?, ?, ?, ?)',
                [title, description, difficulty, topic, ngayTao, nguoiTao]
            );

            // Kiểm tra kết quả
            if (result) {
                res.redirect('/practice');
            } else {
                throw new Error('Không thể thêm bài tập: Lỗi khi thực hiện truy vấn');
            }
        } catch (error) {
            console.error('Lỗi khi thêm bài tập:', error);
            res.status(500).send('Đã xảy ra lỗi khi thêm bài tập: ' + error.message);
        }
    }
};

module.exports = addpracticeController;