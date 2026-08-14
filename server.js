const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

const connectDB = require("./db");
const passport = require("./passport");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://hospital-management-chi-flame.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Request logger
app.use(logger);

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Hospital Management API"
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});