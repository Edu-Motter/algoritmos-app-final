const express = require("express");
const { listAllClients } = require("../controllers/clientController");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middlewares/auth");

clientRouter.get("/listAllClients", clientController.listAllClients);
clientRouter.get("/listClientByCnpj", clientController.searchClientByCnpj);
clientRouter.get("/listClientById", clientController.searchClientById);
clientRouter.delete("/deleteClient", clientController.deleteClient);
clientRouter.put("/updateClient",  clientController.updateClient)
clientRouter.post("/newClient", clientController.newClient);

module.exports = clientRouter;
