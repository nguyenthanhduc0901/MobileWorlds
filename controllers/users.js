// controllers/users.js
var User = require("../models/user");
var passport = require("passport");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    // Đăng nhập người dùng ngay sau khi đăng ký
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      // Hiển thị thông báo thành công và chuyển hướng người dùng
      req.flash("success", "Chúc mừng! Bạn đã đăng ký thành công.");
      res.redirect("/products");
    });
  } catch (e) {
    // Xử lý lỗi nếu có
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Chào mừng trở lại!");
  const redirectUrl = req.session.returnTo || "/products";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Đã đăng xuất.");
    res.redirect("/products");
  });
};
