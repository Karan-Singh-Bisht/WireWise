const express = require("express");
const router = express.Router();
const {
  homeController,
  readController,
} = require("../controllers/home.controller");

router.get("/", homeController);
router.get("/read-more", readController);

module.exports = router;
