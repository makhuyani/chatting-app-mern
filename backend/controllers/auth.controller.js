import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateTokens.js";

export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      userName,
      password,
      confirmPassword,
      emailAddress,
      MobileNumber,
      profilePic,
      gender,
    } = req.body;

    // check if the passwords matched
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "the password does not match with confirm password!" });
    }

    // the username should be unique check if it doesn't exists
    const user = await User.findOne({ userName });

    console.log(user);

    if (user !== null) {
      return res
        .status(400)
        .json({ error: `user already exists with username ${userName}` });
    }

    // get the profile picture logic
    var placeholderImg = `https://avatar.iran.liara.run/username?username=${fullName.replace(
      " ",
      "+"
    )}`;

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // user doesn't exists add the user to the database
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      confirmPassword,
      emailAddress,
      MobileNumber,
      profilePic: placeholderImg,
      gender,
    });

    // add user to the db
    await newUser.save();

    if (newUser) {
      // create jwt tokens
      generateTokenAndSetCookies(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "error creating user" + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "invalid username or password" });
    }

    generateTokenAndSetCookies(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.log("an error login in" + error.message);
    return res.status(400).json({ error: "error logging in " + error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", 0, {
      maxAge: 0,
    });
    res.status(200).json({ error: "logged out successfully" });
  } catch (error) {
    console.log("an error login in" + error.message);
    return res
      .status(400)
      .json({ error: "error logging out " + error.message });
  }
};
