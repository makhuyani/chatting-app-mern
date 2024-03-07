import express from "express";
// import { signUp } from "../controllers/auth.controller.js";
import { signUp, login, logout } from "../controllers/index.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);

authRouter.get("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
