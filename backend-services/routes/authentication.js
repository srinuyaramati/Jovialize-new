const express = require("express");
const authenticationController = require("../controllers/authentication.controler");
const authMiddleware = require("../middleware/routingValidationSchemas/authentication")
const handleRoutingValidation = require("../middleware/routingValidationSchemas/handleRoutingValidation");
const router = express.Router();

router.post("/login", authMiddleware.login, handleRoutingValidation, authenticationController.login);
router.get("/logout", authenticationController.logout);
router.post("/forgotPassword", authMiddleware.forgotPassword, handleRoutingValidation, authenticationController.forgotPassword);
router.post("/resetPassword", authMiddleware.resetPassword, handleRoutingValidation, authenticationController.resetPassword);
router.get("/sampleMail", authenticationController.sampleMail);

module.exports = router;