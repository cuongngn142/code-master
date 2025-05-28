const { query } = require('../config/database');

class LeaderboardModel {
  async getTopUsers() {
    const sql = `
      SELECT 
        u.manguoidung,
        u.hoten, 
        COALESCE(SUM(CASE WHEN k.datyeucau = 1 THEN k.diem ELSE 0 END), 0) as DiemSo 
      FROM nguoidung u
      LEFT JOIN ketquabainop k ON u.manguoidung = k.manguoidung
      GROUP BY u.manguoidung, u.hoten
      ORDER BY DiemSo DESC
      LIMIT 3
    `;
    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  async getOtherUsers() {
    const sql = `
      SELECT 
        u.manguoidung,
        u.hoten,
        COALESCE(SUM(CASE WHEN k.datyeucau = 1 THEN k.diem ELSE 0 END), 0) as DiemSo 
      FROM nguoidung u
      LEFT JOIN ketquabainop k ON u.manguoidung = k.manguoidung
      GROUP BY u.manguoidung, u.hoten
      ORDER BY DiemSo DESC
      LIMIT 9 OFFSET 3
    `;
    try {
      return await query(sql);
    } catch (error) {
      throw error;
    }
  }

  async getLeaderboard() {
    try {
      const result = await query('SELECT * FROM leaderboard', []);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LeaderboardModel();