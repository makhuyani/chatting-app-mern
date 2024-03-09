import User from "../model/user.model.js";

export const GetAllUsers = async (req, res) => {
  try {
    const { id: loggedInUserId } = req.params;

    const allUsers = await User.find(
      { _id: { $ne: loggedInUserId } },
      { _id: 0, password: 0 } // excludes the password and id column use 1 to include
    );

    res.status(201).json(allUsers);
  } catch (error) {
    console.log("error getting all users", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
