import { Router } from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", register);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", login);

/**
 * @route GET /api/auth/get
 * @desc Get current user
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Private
 */
authRouter.post("/logout", authUser, logout);

export default authRouter;
