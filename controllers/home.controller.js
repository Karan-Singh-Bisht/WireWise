const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

module.exports.homeController = asyncHandler(async (req, res) => {
  res.render("home");
});

module.exports.readController = asyncHandler(async (req, res) => {
  res.render("readMore");
});

module.exports.serviceController = asyncHandler(async (req, res) => {
  res.render("services");
});
