const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const database = require('./config/database');  
const topicRoutes = require('./routes/topicRoutes');
const practiceRoutes = require('./routes/practiceRoute');
const topicDetailRouter = require('./routes/topic-detailRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'codemaster-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
const profileRouter = require('./routes/profileRoute');
const settingsRouter = require('./routes/settingsRoute');
const practiceRouter = require('./routes/practiceRoute');
const addpracticeRouter = require('./routes/addpracticeRoute');

app.use('/', addpracticeRouter);
app.use('/practice', practiceRoutes);
app.use('/profile', profileRouter);
app.use('/settings', settingsRouter);
app.use(topicRoutes);
app.use('/', topicDetailRouter);

app.use("/", indexRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

// Thêm route xử lý đăng xuất
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
  console.log(
    `🚀 Server đang chạy tại: \x1b[34mhttp://localhost:${PORT}\x1b[0m`
  );
});
