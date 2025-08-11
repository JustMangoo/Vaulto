const User = require("../models/User");

const auth = async (req, res, next) => {
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(401).json({ message: "Missing user ID" });
  }
  const exists = await User.exists({ _id: userId });
  if (!exists) {
    return res.status(401).json({ message: "Invalid user" });
  }
  req.userId = userId;
  next();
};

module.exports = auth;
