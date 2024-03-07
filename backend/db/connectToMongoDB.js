import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("connected to mongo db");
  } catch (error) {
    console.log("unable to connect to mongo db" + error.message);
  }
};

export default connectToMongoDB;
