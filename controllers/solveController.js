const SolveModel = require('../models/solve');
const axios = require('axios');

class SolveController {
    // Hiển thị trang giải bài
    static async renderSolvePage(req, res) {
        try {
            const maBaiTap = req.params.id;
            const [baiTap] = await SolveModel.getBaiTap(maBaiTap);
            const ngonNgu = await SolveModel.getNgonNguLapTrinh();
            const boTest = await SolveModel.getBoTest(maBaiTap);

            res.render('solve', {
                user: req.session.user, // Thêm dòng này
                baiTap,
                ngonNgu,
                boTest: boTest.filter(test => test.LaCongKhai === 1)
            });
        } catch (error) {
            res.render('error', { 
                error: 'Không thể tải trang giải bài',
                user: req.session.user // Thêm cả ở đây nữa
            });
        }
    }

    // Xử lý nộp bài
    static async submitSolution(req, res) {
        try {
            const { maBaiTap, maNgonNgu, maNguon } = req.body;
            const maNguoiDung = req.user.MaNguoiDung;

            // Tạo bài nộp mới
            const baiNop = await SolveModel.createBaiNop(
                maNguoiDung,
                maBaiTap,
                maNgonNgu,
                maNguon
            );  

            // Lấy bộ test
            const boTest = await SolveModel.getBoTest(maBaiTap);

            // Gọi Piston API để chạy code
            const pistonResponse = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: maNgonNgu,
                source: maNguon,
                stdin: boTest[0].DuLieuDauVao
            });

            // Xử lý kết quả
            const ketQua = pistonResponse.data;
            let trangThai = 'Đúng';
            let thoiGianChay = ketQua.runtime;
            let boNhoSuDung = ketQua.memory;

            if (ketQua.output !== boTest[0].DauRaMongDoi) {
                trangThai = 'Sai';
            }

            // Cập nhật kết quả bài nộp
            await SolveModel.updateBaiNop(
                baiNop.id,
                trangThai,
                thoiGianChay,
                boNhoSuDung
            );

            // Lưu kết quả chi tiết
            await SolveModel.saveKetQuaTest(
                baiNop.id,
                boTest[0].MaTest,
                ketQua.output,
                trangThai === 'Đúng' ? 1 : 0,
                trangThai === 'Đúng' ? 100 : 0,
                maNguoiDung
            );

            res.json({
                success: true,
                ketQua: {
                    trangThai,
                    thoiGianChay,
                    boNhoSuDung,
                    output: ketQua.output
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi chấm bài'
            });
        }
    }
}

module.exports = SolveController;