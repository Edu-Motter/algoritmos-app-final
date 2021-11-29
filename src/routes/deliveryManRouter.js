const express = require("express");
const deliveryManRouter = express.Router();
const deliveryManController = require("../controllers/deliveryManController");
const auth = require("../middlewares/auth");

deliveryManRouter.get("/listAllDeliveryMen", deliveryManController.listAllDeliveryMen);
deliveryManRouter.post("/newDeliveryMan", deliveryManController.newDeliveryMan);
deliveryManRouter.get("/searchDeliveryManById", deliveryManController.searchDeliveryManById);
deliveryManRouter.get("/searchDeliveryManByCpf", deliveryManController.searchDeliveryManByCpf);
deliveryManRouter.get("/searchDeliveryMenByAssociate", deliveryManController.searchDeliveryMenByAssociate);
//deliveryManRouter.put("/updateDeliveryMan", deliveryManController.updateDeliveryMan);


module.exports = deliveryManRouter;