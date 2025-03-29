const express = require("express");
const router = express.Router();
const webAppContoller = require("./web.controller");

router.get("/deals", webAppContoller.deals);
router.get("/deals/:dealId/:cityId/:searchVal", webAppContoller.deals);
router.post("/joinWithUs", webAppContoller.joinWithUs)
router.get("/dealInfo/:dealId", webAppContoller.dealInfo);
router.post("/recentlyViewedDeals", webAppContoller.insertRecentlyViewed);
router.get("/recentlyViewedDeals/:userId", webAppContoller.getRecentlyViewedDeals);
router.post("/login", webAppContoller.login);
router.get("/trending", webAppContoller.trending);
router.get("/dealSearch", webAppContoller.dealSearch);
router.post("/unsubscribe", webAppContoller.unsubscribe);

module.exports = router;