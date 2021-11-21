const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middlewares/auth");

appointmentRouter.post("/newAppointment", auth, appointmentController.newAppointment);
appointmentRouter.delete("/deleteAppointment", auth, appointmentController.deleteAppointment);
appointmentRouter.get("/listAllAppointments", auth, appointmentController.listAllAppointments);
appointmentRouter.get("/searchAppointmentByPatientId", auth, appointmentController.findAppointmentByPatientId);
appointmentRouter.get("/searchAppointmentByPhysicianId", auth, appointmentController.findAppointmentByPhysicianId);


module.exports = appointmentRouter;