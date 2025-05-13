const { query, run } = require('../config/database');

class SolveModel {
    // Lấy thông tin bài tập
    static async getBaiTap(maBaiTap) {
        return await query(
            'SELECT BaiTap.*, ChuDe.TenChuDe FROM BaiTap LEFT JOIN ChuDe ON BaiTap.MaChuDe = ChuDe.MaChuDe WHERE MaBaiTap = ?',
            [maBaiTap]
        );
    }

    // Lấy danh sách ngôn ngữ lập trình
    static async getNgonNguLapTrinh() {
        return await query('SELECT * FROM NgonNguLapTrinh');
    }

    // Lấy bộ test của bài tập
    static async getBoTest(maBaiTap) {
        return await query('SELECT * FROM BoTest WHERE MaBaiTap = ?', [maBaiTap]);
    }

    // Tạo bài nộp mới
    static async createBaiNop(maNguoiDung, maBaiTap, maNgonNgu, maNguon) {
        return await run(
            'INSERT INTO BaiNop (MaNguoiDung, MaBaiTap, MaNgonNgu, MaNguon, TrangThai) VALUES (?, ?, ?, ?, ?)',
            [maNguoiDung, maBaiTap, maNgonNgu, maNguon, 'Đang chấm']
        );
    }

    // Cập nhật kết quả bài nộp
    static async updateBaiNop(maBaiNop, trangThai, thoiGianChay, boNhoSuDung) {
        return await run(
            'UPDATE BaiNop SET TrangThai = ?, ThoiGianChay = ?, BoNhoSuDung = ? WHERE MaBaiNop = ?',
            [trangThai, thoiGianChay, boNhoSuDung, maBaiNop]
        );
    }

    // Lưu kết quả chi tiết cho từng test case
    static async saveKetQuaTest(maBaiNop, maTest, dauRaThucTe, datYeuCau, diem, maNguoiDung) {
        return await run(
            'INSERT INTO KetQuaBaiNop (MaBaiNop, MaTest, DauRaThucTe, DatYeuCau, Diem, MaNguoiDung) VALUES (?, ?, ?, ?, ?, ?)',
            [maBaiNop, maTest, dauRaThucTe, datYeuCau, diem, maNguoiDung]
        );
    }
}

module.exports = SolveModel;