const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
// ... diğer importlar

const app = express();

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS ayarları
app.use(cors());

// Swagger UI
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
// ... diğer route'lar

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Bir şeyler ters gitti!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`Swagger dökümanı http://localhost:${PORT}/api-docs adresinde`);
});
