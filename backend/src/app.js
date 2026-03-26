import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import songRouter from "./routes/song.routes.js";
import historyRouter from "./routes/history.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and Performance Middleware
app.use(helmet());
app.use(compression());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// CORS Restriction
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

// Static Files Serving
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/history", historyRouter);
app.use("/api/favorites", favoriteRouter);

// SPA Support: Serve frontend index.html for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export default app;
