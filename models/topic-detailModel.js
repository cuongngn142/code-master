const { query } = require('../config/database');

class TopicDetailModel {
    async getAllTopics() {
        try {
            const topics = await query('SELECT * FROM ChuDe');
            return topics;
        } catch (error) {
            throw error;
        }
    }

    async updateTopic(maChuDe, tenChuDe, moTa) {
        try {
            // Kiểm tra chủ đề có tồn tại không
            const checkTopic = await query(
                'SELECT MaChuDe FROM ChuDe WHERE MaChuDe = ?',
                [maChuDe]
            );

            if (checkTopic.length === 0) {
                return false;
            }

            const result = await query(
                'UPDATE ChuDe SET TenChuDe = ?, MoTa = ? WHERE MaChuDe = ?',
                [tenChuDe, moTa, maChuDe]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong updateTopic:', error);
            throw error;
        }
    }

    async deleteTopic(maChuDe) {
        try {
            await query('DELETE FROM ChuDe WHERE MaChuDe = ?', [maChuDe]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TopicDetailModel();