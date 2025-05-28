const { query } = require('../config/database');

class IndexModel {
    async getHomeData() {
        try {
            const result = await query('SELECT * FROM nguoidung ORDER BY NgayTao DESC LIMIT 5');
            return result;
        } catch (error) {
            console.error('Error in getHomeData:', error);
            throw error;
        }
    }

    async register(hoten, email, matKhau, vaitro) {
        try {
            await query(
                'INSERT INTO nguoidung (hoten, email, matKhau, vaitro) VALUES ($1, $2, $3, $4)',
                [hoten, email, matKhau, vaitro]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new IndexModel();