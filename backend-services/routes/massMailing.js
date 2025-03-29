const express = require("express");
const massMailingController = require("../controllers/massMailing.Controller");

const router = express.Router();
router.get("/", massMailingController.checkMassMailStatus);
router.post("/", massMailingController.sendMassMailing);

module.exports = router;

