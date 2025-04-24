const { query } = require('../config/database');

const practiceController = {
    // Lấy tất cả bài tập
    getAll: async (req, res) => {
        try {
            const baiTaps = await query('SELECT * FROM BaiTap');
            res.render('practice', { 
                user: req.session.user,
                baiTaps: baiTaps 
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).send('Lỗi server');
        }
    },

    // Lấy chi tiết bài tập theo ID
    getById: async (req, res) => {
        try {
            const [baiTap] = await query(
                'SELECT * FROM BaiTap WHERE MaBaiTap = ?', 
                [req.params.id]
            );
            if (!baiTap) {
                return res.status(404).send('Không tìm thấy bài tập');
            }
            res.render('practiceDetail', { 
                user: req.session.user,
                baiTap: baiTap 
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).send('Lỗi server');
        }
    },

    // Tìm kiếm bài tập
    search: async (req, res) => {
        try {
            const { q } = req.query;
            const baiTaps = await query(
                'SELECT * FROM BaiTap WHERE TieuDe LIKE ? OR MoTa LIKE ?',
                [`%${q}%`, `%${q}%`]
            );
            res.json(baiTaps);
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },

    // Lọc bài tập
    filter: async (req, res) => {
        try {
            const { mucDo, chuDe } = req.query;
            let sql = 'SELECT * FROM BaiTap WHERE 1=1';
            const params = [];

            if (mucDo) {
                sql += ' AND MucDoKho = ?';
                params.push(mucDo);
            }
            if (chuDe) {
                sql += ' AND MaChuDe = ?';
                params.push(chuDe);
            }

            const baiTaps = await query(sql, params);
            res.json(baiTaps);
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    }
};

module.exports = practiceController;