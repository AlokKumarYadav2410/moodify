import { Router } from "express";
import { getFavorites, toggleFavorite } from "../controllers/favorite.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const favoriteRouter = Router();

favoriteRouter.use(authUser);

/**
 *  @route GET /api/favorites
 * @desc Get user's favorite songs
 * @access Private
 */
favoriteRouter.get("/", getFavorites);

/**
 * @route POST /api/favorites/:songId
 * @desc Toggle favorite status of a song
 * @access Private
 */
favoriteRouter.post("/:songId", toggleFavorite);

export default favoriteRouter;