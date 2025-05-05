const { query } = require('../config/database');

class PracticeDetailsModel {
    async getPracticeDetails(id) {
        try {
            const practice = await query(
                'SELECT bt.*, cd.TenChuDe FROM BaiTap bt JOIN ChuDe cd ON bt.MaChuDe = cd.MaChuDe WHERE bt.MaBaiTap = ?',
                [id]
            );
            return practice[0];
        } catch (error) {
            throw error;
        }
    }

    async deletePractice(id) {
        try {
            // Kiểm tra bài tập có tồn tại không
            const practice = await query(
                'SELECT MaBaiTap FROM BaiTap WHERE MaBaiTap = ?',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để xóa'
                };
            }

            const result = await query(
                'DELETE FROM BaiTap WHERE MaBaiTap = ?',
                [id]
            );

            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Xóa bài tập thành công' : 'Có lỗi xảy ra khi xóa bài tập'
            };
        } catch (error) {
            throw error;
        }
    }

    async updatePractice(id, data) {
        try {
            const practice = await query(
                'SELECT MaBaiTap FROM BaiTap WHERE MaBaiTap = ?',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để cập nhật'
                };
            }

            const result = await query(
                'UPDATE BaiTap SET TieuDe = ?, MoTa = ?, MucDoKho = ?, MaChuDe = ? WHERE MaBaiTap = ?',
                [data.TieuDe, data.MoTa, data.MucDoKho, data.MaChuDe, id]
            );

            return {
                success: result.affectedRows > 0,
                message: result.affectedRows > 0 ? 'Cập nhật bài tập thành công' : 'Có lỗi xảy ra khi cập nhật bài tập'
            };
        } catch (error) {
            console.error('Lỗi:', error);
            throw error;
        }
    }
}

module.exports = new PracticeDetailsModel();