const database = require('../config/database');

class LeaderboardModel {
    async getTopUsers() {
        return new Promise((resolve, reject) => {
            try {
                database.query(`
                    SELECT 
                        nd.HoTen,
                        COALESCE(xh1.DiemSo, 0) as DiemSo,
                        (SELECT COUNT(*) + 1 FROM XepHang xh2 WHERE xh2.DiemSo > xh1.DiemSo) as XepHang
                    FROM NguoiDung nd
                    LEFT JOIN XepHang xh1 ON nd.MaNguoiDung = xh1.MaNguoiDung
                    ORDER BY DiemSo DESC
                `, [], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new LeaderboardModel();