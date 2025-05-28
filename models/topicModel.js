const { query } = require('../config/database');

class TopicModel {
    async checkTopicExists(tenChuDe) {
        try {
            const existingTopic = await query('SELECT * FROM ChuDe WHERE TenChuDe = $1', [tenChuDe]);
            return existingTopic.length > 0;
        } catch (error) {
            throw error;
        }
    }

    async createTopic(tenChuDe, moTa) {
        try {
            await query(
                'INSERT INTO ChuDe (TenChuDe, MoTa) VALUES ($1, $2)',
                [tenChuDe, moTa]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getAllTopics() {
        try {
            const result = await query('SELECT * FROM topic', []);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TopicModel();