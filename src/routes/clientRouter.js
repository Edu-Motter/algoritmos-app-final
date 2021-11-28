const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");

clientRouter.get("/listAllPhysicians", clientController.listAllClients);
// clientRouter.delete("/deletePhysician", auth, clientController.deletePhysician);
// clientRouter.put("/updatePhysician", auth, clientController.updatePhysician);

// clientRouter.post("/newPhysician", clientController.newPhysician);
// clientRouter.post("/authentication", clientController.authentication);

module.exports = clientRouter;
