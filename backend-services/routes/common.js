const express = require("express");
const bannersController = require("../controllers/banners.controller");
const commonController = require("../controllers/common.controller");

const router = express.Router();
router.get("/banners", bannersController.banners);
router.post("/bannerImageUpload", bannersController.bannerUpload);
router.get("/dashboardCardInfo", commonController.dashboardCardInfo);

module.exports = router;