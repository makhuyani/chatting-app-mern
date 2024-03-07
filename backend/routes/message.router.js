import express from "express";
import { sendMessage } from "../controllers/index.js";

const messageRouter = express.Router();

messageRouter.post("/send", sendMessage);

export default messageRouter;
