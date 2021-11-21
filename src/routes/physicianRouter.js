const express = require("express");
const physicianRouter = express.Router();
const physicianController = require("../controllers/physicianController");
const auth = require("../middlewares/auth");

physicianRouter.get("/listAllPhysicians", auth, physicianController.listAllPhysicians);
physicianRouter.delete("/deletePhysician", auth, physicianController.deletePhysician);
physicianRouter.put("/updatePhysician", auth, physicianController.updatePhysician);

physicianRouter.post("/newPhysician", physicianController.newPhysician);
physicianRouter.post("/authentication", physicianController.authentication);

module.exports = physicianRouter;
