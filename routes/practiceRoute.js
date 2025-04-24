const express = require("express");
const router = express.Router();
const practiceController = require("../controllers/practiceController");

// Route hiển thị trang luyện tập
router.get("/", practiceController.getAll);

// Route hiển thị chi tiết bài tập
router.get("/:id", practiceController.getById);

// Route tìm kiếm bài tập
router.get("/search", practiceController.search);

// Route lọc bài tập theo chủ đề và độ khó
router.get("/filter", practiceController.filter);

module.exports = router;