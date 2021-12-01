const express = require("express");
const deliveryManRouter = express.Router();
const deliveryManController = require("../controllers/deliveryManController");
const auth = require("../middlewares/auth");
const validation =  require("../middlewares/validators/deliveryMenValidator");

deliveryManRouter.get("/listAllDeliveryMen", validation, deliveryManController.listAllDeliveryMen);
deliveryManRouter.post("/newDeliveryMan", validation, deliveryManController.newDeliveryMan);
deliveryManRouter.get("/searchDeliveryManById", validation, deliveryManController.searchDeliveryManById);
deliveryManRouter.get("/searchDeliveryManByCpf", validation, deliveryManController.searchDeliveryManByCpf);
deliveryManRouter.get("/searchDeliveryMenByAssociate", validation, deliveryManController.searchDeliveryMenByAssociate);
deliveryManRouter.put("/updateDeliveryMan", validation, deliveryManController.updateDeliveryMan);
deliveryManRouter.delete("/deleteDeliveryman", validation, deliveryManController.deleteDeliveryman);

module.exports = deliveryManRouter;