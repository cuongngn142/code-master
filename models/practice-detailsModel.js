const { query } = require('../config/database');

class PracticeDetailsModel {
    async getPracticeDetails(id) {
        try {
            const result = await query('SELECT * FROM baitap WHERE mabaitap = $1', [id]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    async deletePractice(id) {
        try {
            // Kiểm tra id có hợp lệ không
            if (!id) {
                return {
                    success: false,
                    message: 'ID bài tập không hợp lệ'
                };
            }

            // Kiểm tra bài tập có tồn tại không
            const practice = await query(
                'SELECT mabaitap FROM baitap WHERE mabaitap = $1',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để xóa'
                };
            }

            try {
                // Xóa tất cả các bản ghi liên quan theo thứ tự
                // 1. Xóa kết quả bài nộp
                const deleteKetQua = await query(
                    'DELETE FROM ketquabainop WHERE mabaitap = $1',
                    [id]
                );
                console.log('Đã xóa kết quả bài nộp:', deleteKetQua.rowCount, 'bản ghi');

                // 2. Xóa bộ test
                const deleteBoTest = await query(
                    'DELETE FROM botest WHERE mabaitap = $1',
                    [id]
                );
                console.log('Đã xóa bộ test:', deleteBoTest.rowCount, 'bản ghi');

                // 3. Xóa từ bảng chitietdanhsachbaitap nếu có
                const deleteChiTiet = await query(
                    'DELETE FROM chitietdanhsachbaitap WHERE mabaitap = $1',
                    [id]
                );
                console.log('Đã xóa chi tiết danh sách:', deleteChiTiet.rowCount, 'bản ghi');

                // 4. Cuối cùng mới xóa bài tập
                const result = await query(
                    'DELETE FROM baitap WHERE mabaitap = $1',
                    [id]
                );

                if (!result || result.rowCount === 0) {
                    throw new Error('Không thể xóa bài tập');
                }

                return {
                    success: true,
                    message: 'Xóa bài tập thành công'
                };
            } catch (deleteError) {
                console.error('Lỗi khi xóa các bản ghi:', deleteError);
                return {
                    success: false,
                    message: 'Có lỗi xảy ra khi xóa dữ liệu liên quan: ' + deleteError.message
                };
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài tập:', error);
            return {
                success: false,
                message: 'Có lỗi xảy ra trong quá trình xóa bài tập: ' + error.message
            };
        }
    }

    async updatePractice(id, data) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!id) {
                return {
                    success: false,
                    message: 'ID bài tập không hợp lệ'
                };
            }

            if (!data) {
                return {
                    success: false,
                    message: 'Dữ liệu cập nhật không được để trống'
                };
            }

            // Kiểm tra từng trường dữ liệu riêng biệt
            if (!data.tieude || data.tieude.trim() === '') {
                return {
                    success: false,
                    message: 'Tiêu đề không được để trống'
                };
            }

            if (!data.mota || data.mota.trim() === '') {
                return {
                    success: false,
                    message: 'Mô tả không được để trống'
                };
            }

            if (!data.mucdokho || !['Dễ', 'Trung Bình', 'Khó'].includes(data.mucdokho)) {
                return {
                    success: false,
                    message: 'Mức độ khó không hợp lệ'
                };
            }

            if (!data.machude) {
                return {
                    success: false,
                    message: 'Mã chủ đề không được để trống'
                };
            }
            

            // Kiểm tra bài tập có tồn tại không
            const practice = await query(
                'SELECT * FROM baitap WHERE mabaitap = $1',
                [id]
            );

            if (practice.length === 0) {
                return {
                    success: false,
                    message: 'Không tìm thấy bài tập để cập nhật'
                };
            }

            // Kiểm tra chủ đề có tồn tại không
            const topic = await query(
                'SELECT machude FROM chude WHERE machude = $1',
                [data.machude]
            );

            if (topic.length === 0) {
                return {
                    success: false,
                    message: 'Chủ đề không tồn tại'
                };
            }

            // Cập nhật thông tin bài tập
            await query(
                'UPDATE baitap SET tieude = $1, mota = $2, mucdokho = $3, machude = $4 WHERE mabaitap = $5',
                [data.tieude, data.mota, data.mucdokho, data.machude, id]
            );

            // Cập nhật hoặc tạo mới bộ test
            const existingTest = await query('SELECT * FROM botest WHERE mabaitap = $1', [id]);
            
            if (existingTest.length > 0) {
                // Cập nhật bộ test hiện có
                await query(
                    'UPDATE botest SET dulieudauvao = $1, dauramongdoi = $2,  kieudulieu = $3 WHERE mabaitap = $4',
                    [data.dulieudauvao, data.dauramongdoi, data.kieudulieu, id]
                );
            } else {
                // Tạo mới bộ test
                await query(
                    'INSERT INTO botest (mabaitap, dulieudauvao, dauramongdoi, kieudulieu) VALUES ($1, $2, $3, $4)',
                    [id, data.dulieudauvao, data.dauramongdoi, data.kieudulieu]
                );
            }

            return {
                success: true,
                message: 'Cập nhật bài tập thành công'
            };
        } catch (error) {
            console.error('Lỗi khi cập nhật bài tập:', error);
            return {
                success: false,
                message: 'Có lỗi xảy ra khi cập nhật bài tập'
            };
        }
    }
}

module.exports = new PracticeDetailsModel();