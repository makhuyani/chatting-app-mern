import express from "express";
import dotenv from "dotenv";
import { authRouter, messageRouter, userRoute } from "./routes/index.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json()); // to pass in the req json
app.use(cookieParser()); // to pass in the authorization

app.use("/api/auth", authRouter);

app.use("/api/message", messageRouter);

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello world!! mbini");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`app is listening to post ${PORT}`);
});
