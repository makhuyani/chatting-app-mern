import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // check if the token is available (user is authorized)
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided " });
    }

    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(404).json({ error: "Unauthorized - Invalid Token " });
    }

    const user = await User.findById(decoded.userId).select("-password"); // select("-password") removes the password in user

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in protectRoute", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
