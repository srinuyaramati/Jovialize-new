const express = require("express");
const userController = require("../controllers/adminUsers.controller");
const middleware = require("../middleware/check-auth");

const router = express.Router();
router.get("/", userController.users);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.get("/:id", userController.getUserDetails);
router.delete("/:id", userController.deleteUser);
router.post("/appUsers", userController.getAppUsers)

module.exports = router;