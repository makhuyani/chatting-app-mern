import express from "express";
import dotenv from "dotenv";
import { authRouter, messageRouter } from "./routes/index.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello world!! mbini");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`app is listening to post ${PORT}`);
});
