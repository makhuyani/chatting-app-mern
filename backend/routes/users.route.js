import express from "express";
import { GetAllUsers } from "../controllers/index.js";
import protectRoute from "../middleware/protectRoute.js";

const userRoute = express.Router();

userRoute.get("/:id", protectRoute, GetAllUsers);

export default userRoute;
