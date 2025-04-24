const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const database = require('./config/database');  

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
app.use('/practice', practiceRouter);
app.use('/profile', profileRouter);
app.use('/settings', settingsRouter);

app.use("/", indexRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server đang chạy tại: \x1b[34mhttp://localhost:${PORT}\x1b[0m`
  );
});
