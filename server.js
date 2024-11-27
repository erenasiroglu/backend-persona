const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Bir hata oluştu" });
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
