const express = require("express");
const router = express.Router();
const {
  renderSignUpPage,
  renderLoginPage,
  registerUser,
  loginUser,
  logoutUser,
  userDashboard,
} = require("../controllers/user.controller");
const validateLoginUser = require("../middlewares/validateLoginUser");
const validateSignUpUser = require("../middlewares/validateSignUpUser");
const upload = require("../middlewares/multer");

router.get("/registerUser", renderSignUpPage);
router.post(
  "/register",
  upload.single("avatar"),
  validateSignUpUser,
  registerUser
);
router.get("/loginUser", renderLoginPage);
router.post("/login", validateLoginUser, loginUser);
router.get("/logout", logoutUser);
router.get("/:id/dashboard", userDashboard);
module.exports = router;
