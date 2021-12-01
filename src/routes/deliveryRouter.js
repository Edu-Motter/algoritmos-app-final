const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.post("/newDelivery", deliveryController.newDelivery);
//deliveryRouter.delete("/deleteAppointment", auth, deliveryController.deleteAppointment);
deliveryRouter.get("/listAllDeliveries",  deliveryController.listAllDeliveries);
//deliveryRouter.get("/searchAppointmentByPatientId", auth, deliveryController.findAppointmentByPatientId);
//deliveryRouter.get("/searchAppointmentByPhysicianId", auth, deliveryController.findAppointmentByPhysicianId);

module.exports = deliveryRouter;