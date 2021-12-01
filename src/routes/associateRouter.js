const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/associateValidator");

associateRouter.get("/listAllAssociates", associateController.listAllAssociates);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.post("/authentication", associateController.authentication);
associateRouter.get("/listAssociateByCnpj", associateController.searchAssociateByCnpj);
associateRouter.delete("/deleteAssociate", associateController.deleteAssociate);
associateRouter.put("/updateAssociate", associateController.updateAssociate);


module.exports = associateRouter;
