import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: false,
      index: true,
    },
    userName: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    emailAddress: String,
    MobileNumber: String,
    profilePic: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
  },
  //time stamps will create createAt and UpdatedAt fields
  { timestamps: true }
);

const User = mongoose.model("User", Schema);

export default User;
