const express = require("express");
const { listAllClients } = require("../controllers/clientController");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/clientValidator");

clientRouter.get("/listAllClients", validation, clientController.listAllClients);
clientRouter.get("/listClientByCnpj", validation, clientController.searchClientByCnpj);
clientRouter.get("/listClientById", validation, clientController.searchClientById);
clientRouter.delete("/deleteClient", validation, clientController.deleteClient);
clientRouter.put("/updateClient", validation, clientController.updateClient)
clientRouter.post("/newClient",  validation, clientController.newClient);

module.exports = clientRouter;
