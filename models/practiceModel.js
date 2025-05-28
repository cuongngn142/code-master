const { query } = require('../config/database');

class PracticeModel {
    async getAllPractices() {
        try {
            const practices = await query(`
                SELECT baitap.*, chude.tenchude 
                FROM baitap 
                LEFT JOIN chude ON baitap.machude = chude.machude
                ORDER BY baitap.ngaytao DESC
            `);
            return practices;
        } catch (error) {
            throw error;
        }
    }

    async getAllTopics() {
        try {
            const topics = await query('SELECT * FROM chude');
            return topics;
        } catch (error) {
            throw error;
        }
    }

    async getPracticeById(id) {
        try {
            const practice = await query('SELECT * FROM baitap WHERE mabaitap = $1', [id]);
            return practice;
        } catch (error) {
            throw error;
        }
    }

    async searchPractices(searchTerm) {
        try {
            const practices = await query(
                'SELECT * FROM baitap WHERE tieude ILIKE $1 OR mota ILIKE $2',
                [`%${searchTerm}%`, `%${searchTerm}%`]
            );
            return practices;
        } catch (error) {
            throw error;
        }
    }

    async filterPractices(difficulty, topic) {
        try {
            let sql = 'SELECT * FROM baitap WHERE 1=1';
            const params = [];
            let idx = 1;
            if (difficulty) {
                sql += ` AND mucdokho = $${idx++}`;
                params.push(difficulty);
            }
            if (topic) {
                sql += ` AND machude = $${idx++}`;
                params.push(topic);
            }
            const practices = await query(sql, params);
            return practices;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PracticeModel();