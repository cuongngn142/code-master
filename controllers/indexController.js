const express = require('express');
const router = express.Router();

exports.home = (req, res) => {
    res.render('index'); 
};