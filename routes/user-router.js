const express = require("express");
const {
  registerUserController,
  loginUserController,
  getAllUsersController,
  updateUsernameController,
  deleteUserController,
} = require("../controller/user/register-user");

const router = express.Router();

router.post("/registerUser", registerUserController);
router.post("/login", loginUserController);
router.get("/getUsers", getAllUsersController);
router.put("/updateuser/:id", updateUsernameController);
router.delete("/deleteuser/:id", deleteUserController);
module.exports = router;
