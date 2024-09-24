const express = require("express");
const router = express.Router();
const {
  renderSignUpPage,
  renderLoginPage,
  registerUser,
  loginUser,
  logoutUser,
  userDashboard,
  pastPrediction,
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
router.get("/:id/prediction", pastPrediction);
module.exports = router;
