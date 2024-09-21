const express = require("express");
const router = express.Router();
const {
  homeController,
  readController,
  serviceController,
} = require("../controllers/home.controller");

router.get("/", homeController);
router.get("/read-more", readController);
router.get("/services", serviceController);

module.exports = router;
