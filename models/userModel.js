const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

class UserModel {
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

    async login(email) {
        try {
            const result = await query(
                'SELECT * FROM nguoidung WHERE email = $1',
                [email]
            );
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();