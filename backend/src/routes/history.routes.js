import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  addHistory,
  getHistory,
  deleteHistory,
  clearHistory,
} from "../controllers/history.controller.js";

const historyRouter = Router();

historyRouter.use(authUser);

/**
 * @route GET /api/history
 * @desc Get user's listening history
 * @access Private
 */
historyRouter.get("/", getHistory);

/**
 * @route POST /api/history
 * @desc Add song to user's listening history
 * @access Private
 */
historyRouter.post("/", addHistory);

/**
 * @route DELETE /api/history/:id
 * @desc Delete a song from user's listening history
 * @access Private
 */
historyRouter.delete("/:id", deleteHistory);

/**
 * @route DELETE /api/history
 * @desc Clear user's listening history
 * @access Private
 */
historyRouter.delete("/", clearHistory);

export default historyRouter;
