const express = require("express");
const cors = require("cors");
const dealsController = require("../controllers/deals.controller");
const middleware = require("../middleware/check-auth");
const CORSOptions = require("./../cors/cors");
const router = express.Router();
// router.get("/", cors(CORSOptions.CORSSetting()), dealsController.getAllDeals);
const dealsRoutingValidation = require("../middleware/routingValidationSchemas/deals");
const handleValidation = require("../middleware/routingValidationSchemas/handleRoutingValidation");

router.get("/", middleware.checkAuth, dealsController.getAllDeals); // get all deals
router.get("/topDeals/:cityId", dealsController.cityBasedDeals); // deals list based on city id
router.get("/individualDeal/:dealId", dealsController.getIndividualDeal); // individual deals
router.delete("/", dealsController.deleteDeal); // delete individual deal
router.post("/deleteMultipleDeals", dealsController.deleteMultipleDeals); // delete multiple deals

// router.post("/createDeal", middleware.checkAuth, dealsController.createDeal);
router.post("/createDeal", 
            dealsRoutingValidation.addDeal, 
            handleValidation, 
            dealsController.createDeal);
router.put("/updateDeal", 
            dealsRoutingValidation.updateDeal, 
            handleValidation, 
            dealsController.updateDeal);
router.post("/uploadImage", dealsController.uploadImage);
router.get("/dealImages/:dealId", dealsController.getDealImages);
router.post("/deleteDealMultipleImages", dealsController.deleteDealMultipleImages);
module.exports = router;