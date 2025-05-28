const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { query, run } = require("../config/database");

router.post("/register", async (req, res) => {
  try {
    const { email, hoten, matkhau, vaitro } = req.body;

    // Kiểm tra email đã tồn tại
    const users = await query("SELECT * FROM nguoidung WHERE email = $1", [
      email,
    ]);
    if (users.length > 0) {
      return res.json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(matkhau, 10);

    // Thêm người dùng mới
    await run(
      "INSERT INTO nguoidung (hoten, email, matkhau, vaitro) VALUES ($1, $2, $3, $4)",
      [hoten, email, hashedPassword, vaitro]
    );

    // Truy vấn lại user vừa tạo để xác nhận mật khẩu đã lưu đúng
    const newUser = await query("SELECT * FROM nguoidung WHERE email = $1", [email]);
    if (newUser.length === 0 || !newUser[0].matkhau) {
      return res.json({
        success: false,
        message: "Đăng ký thất bại: không lưu được mật khẩu. Vui lòng thử lại hoặc liên hệ quản trị viên.",
      });
    }

    res.json({
      success: true,
      message: "Đăng ký thành công",
      user: {
        id: newUser[0].manguoidung,
        email: newUser[0].email,
        hoten: newUser[0].hoten,
        vaitro: newUser[0].vaitro,
      }
    });
    // Tự động đăng nhập sau khi đăng ký (nếu muốn):
    // const newUser = await query("SELECT * FROM NguoiDung WHERE Email = $1", [email]);
    // if (newUser.length > 0) {
    //   req.session.user = {
    //     id: newUser[0].MaNguoiDung,
    //     email: newUser[0].Email,
    //     hoTen: newUser[0].HoTen,
    //     vaiTro: newUser[0].VaiTro,
    //   };
    // }
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, matkhau } = req.body;
    // Tìm user theo email
    const users = await query("SELECT * FROM nguoidung WHERE email = $1", [email]);
    if (users.length === 0) {
      return res.json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    const user = users[0];
    // Log chi tiết để debug
    console.log("[LOGIN] body:", req.body);
    console.log("[LOGIN] user from DB:", user);
    // Đảm bảo trường matkhau luôn có giá trị
    if (!user.matkhau || typeof user.matkhau !== 'string' || user.matkhau.length < 10) {
      return res.json({
        success: false,
        message: "Tài khoản không có mật khẩu hợp lệ. Vui lòng đăng ký lại hoặc liên hệ quản trị viên.",
      });
    }
    const isMatch = await bcrypt.compare(matkhau, user.matkhau);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    req.session.user = {
      id: user.manguoidung,
      email: user.email,
      hoten: user.hoten,
      vaitro: user.vaitro,
    };
    res.json({
      success: true,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error, error.stack);
    res.json({
      success: false,
      message: "Lỗi server, vui lòng thử lại sau",
    });
  }
});

module.exports = router;
