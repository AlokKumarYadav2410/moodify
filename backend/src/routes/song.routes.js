import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import authUser from "../middlewares/auth.middleware.js";
import { uploadSong } from "../controllers/song.controller.js";

const songRouter = Router();

/**
 * @route POST /api/songs
 * @desc Upload a new song
 * @access Private
 */
songRouter.post("/", authUser, upload.single("song"), uploadSong);

export default songRouter;
