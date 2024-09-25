const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const passport = require("passport");

module.exports.renderSignUpPage = asyncHandler(async (req, res) => {
  res.render("registerUser");
});

module.exports.registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { fullName, email, dob, gender, password } = req.body;

    // Check if the user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      req.flash("error", "Email already exists!");
      return res.redirect("/user/registerUser");
    }

    // Upload avatar to Cloudinary (assuming req.file contains the uploaded file)
    const avatarLocalPath = req.file?.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // Create a new user with avatar (use a default avatar if upload fails)
    const newUser = await User.create({
      fullName,
      email,
      dob,
      gender,
      password,
      avatar:
        avatar?.url ||
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=826&t=st=1723037395~exp=1723037995~hmac=88fe535ef9ac7e7658d485f74eaf8ffe444366fb43fb67ba7719c1969f068fad",
    });

    if (!newUser) {
      throw new ApiError(500, "User not created!");
    }

    // Automatically log in the user after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error("Login error:", err); // Log any login error
        return next(err);
      }
      req.flash("success", `Welcome to WireWise, ${fullName}`);
      res.redirect("/aliRoute"); // Redirect to home page
    });
  } catch (error) {
    console.error("Error during user registration:", error); // Log the error details
    res
      .status(500)
      .send("An error occurred during registration. Please try again later.");
  }
});

module.exports.renderLoginPage = asyncHandler(async (req, res) => {
  res.render("loginUser");
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    } // Handle any errors

    if (!user) {
      req.flash("error", info.message || "Login failed.");
      return res.redirect("/aliRoute");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", `Welcome Back ${user.fullName}`);
      res.redirect("/aliRoute"); //Redirect to home page
    });
  })(req, res, next); // Call the passport middleware
});

module.exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out.");
    }
    req.flash("success", "You have been logged out successfully.");
    res.redirect("/user/loginUser");
  });
});

module.exports.userDashboard = asyncHandler(async (req, res, next) => {
  res.render("dashboard", { user: req.user });
});

module.exports.pastPrediction = asyncHandler(async (req, res) => {
  res.render("pastPrediction", { user: req.user });
});
