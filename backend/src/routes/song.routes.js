import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import authUser from "../middlewares/auth.middleware.js";
import { getSongs, uploadSong } from "../controllers/song.controller.js";

const songRouter = Router();

/**
 * @route POST /api/songs
 * @desc Upload a new song
 * @access Private
 */
songRouter.post("/", authUser, upload.single("song"), uploadSong);

/**
 * @route GET /api/songs
 * @desc Get all songs
 * @access Private
 */
songRouter.get("/", authUser, getSongs);

export default songRouter;
