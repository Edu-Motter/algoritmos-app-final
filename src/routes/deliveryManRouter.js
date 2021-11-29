const express = require("express");
const deliveryManRouter = express.Router();
const deliveryManController = require("../controllers/deliveryManController");
const auth = require("../middlewares/auth");

deliveryManRouter.get("/listAllDeliveryMen", deliveryManController.listAllDeliveryMen);
//deliveryManRouter.post("/newDeliveryMan", deliveryManController.newDeliveryMan);
//deliveryManRouter.get("/searchDeliveryManByName", deliveryManController.searchDeliveryManByName);
//deliveryManRouter.get("/searchDeliveryMenByAssociate", deliveryManController.searchDeliveryMenByAssociate);
//deliveryManRouter.put("/updateDeliveryMan", deliveryManController.updateDeliveryMan);


module.exports = deliveryManRouter;