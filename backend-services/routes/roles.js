const express = require("express");
const rolesController = require("../controllers/roles.controller");

const router = express.Router();
router.get("/", rolesController.getAllRoles);
router.post("/", rolesController.createRole);
router.put("/", rolesController.updateRole);
// router.get("/:id", userController.getUserDetails);
// router.delete("/:id", userController.deleteUser);

module.exports = router;