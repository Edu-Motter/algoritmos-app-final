const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.post("/newDelivery", deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery", deliveryController.deleteDelivery);
deliveryRouter.get("/listAllDeliveries",  deliveryController.listAllDeliveries);
deliveryRouter.put("/updateDelivery", deliveryController.updateDelivery);
deliveryRouter.get("/listAllDelivered", deliveryController.listAllDelivered);
deliveryRouter.get("/listAllPending", deliveryController.listAllPending);
deliveryRouter.get("/listAllByDeliveryman", deliveryController.listAllByDeliveryman);

module.exports = deliveryRouter;