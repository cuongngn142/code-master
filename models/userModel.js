const { sql, poolPromise } = require('../config/database');

class UserModel {
    async register(hoTen, email, matKhau) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('HoTen', sql.NVarChar(50), hoTen)
                .input('Email', sql.NVarChar(50), email)
                .input('MatKhau', sql.NVarChar(50), matKhau)
                .input('VaiTro', sql.NVarChar(50), 'User')
                .query('INSERT INTO NguoiDung (HoTen, Email, MatKhau, VaiTro) VALUES (@HoTen, @Email, @MatKhau, @VaiTro)');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async login(email, matKhau) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Email', sql.NVarChar(50), email)
                .input('MatKhau', sql.NVarChar(50), matKhau)
                .query('SELECT * FROM NguoiDung WHERE Email = @Email AND MatKhau = @MatKhau');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();