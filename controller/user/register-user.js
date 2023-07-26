const fs = require("fs");
const User = require("../../schema/register-user-schema");

const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.json({
      message: "user already exist",
      status: "failed",
    });
  } else {
    const register = User({ name, email, password });
    await register.save();
    const allUsers = await User.find();

    fs.writeFile("users.txt", allUsers.toString(), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File created successfully");
      }
    });
    res.json({ message: "user registered", status: "success" });
  }
};
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findBy({ email });
  if (!userFound || User.password != password) {
    res.json({
      status: "failed",
      message: "invalid credentials",
    });
  } else {
    res.json({
      status: "success",
      message: "user logged in successfully",
    });
  }
};
const getAllUsersController = async (req, res) => {
  const users = await User.find();
  res.json({
    message: "success",
    status: 200,
    users,
  });
};

const updateUsernameController = async (req, res) => {
  const userId = req.params.id;
  const name = req.body;

  const user = await User.findByIdAndUpdate(userId, { name: name });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  } else {
    res.json({
      message: "success",
      status: 200,
      data: "name updated successfully",
    });
  }
};

const deleteUserController = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndRemove(userId);
  const allUsers = await User.find();

  if (!user) {
    res.status(404).json({ error: "no user found" });
  } else {
    fs.writeFile("users.txt", allUsers.toString(), (err) => {
      if (err) {
        console.error("Error updating file:", err);
      } else {
        console.log("File updated successfully");
      }
    });
    res.json({
      message: "success",
      status: 200,
      data: "user deleted successfully",
    });
  }
};
module.exports = {
  registerUserController,
  loginUserController,
  getAllUsersController,
  updateUsernameController,
  deleteUserController,
};
