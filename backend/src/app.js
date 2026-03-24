import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import songRouter from "./routes/song.routes.js";
import historyRouter from "./routes/history.routes.js";
import favoriteRouter from "./routes/favorite.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.use("/api/history", historyRouter);
app.use("/api/favorites", favoriteRouter);

export default app;
