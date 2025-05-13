const express = require('express');
const router = express.Router();
const SolveController = require('../controllers/solveController');

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

// Trang giải bài
router.get('/solve/:id', checkLogin, SolveController.renderSolvePage);

// API nộp bài
router.post('/api/solve/submit', checkLogin, SolveController.submitSolution);

module.exports = router;