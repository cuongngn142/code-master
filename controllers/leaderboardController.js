const LeaderboardModel = require('../models/leaderboardModel');

class LeaderboardController {
    async showLeaderboard(req, res) {
        try {
            const topUsers = await LeaderboardModel.getTopUsers();
            // Trong hàm render
            res.render('leaderboard', {
                user: req.session.user,
                topUsers: topUsers
            });
        } catch (error) {
            console.error('Lỗi:', error);
            res.status(500).render('error', { 
                error: 'Có lỗi xảy ra khi tải bảng xếp hạng',
                user: req.session.user 
            });
        }
    }
}

module.exports = new LeaderboardController();