const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validators/associateValidator");

associateRouter.get("/listAllAssociates", validation, associateController.listAllAssociates);
associateRouter.post("/newAssociate", validation, associateController.newAssociate);
associateRouter.post("/authentication", validation, associateController.authentication);

associateRouter.delete("/deleteAssociate", auth, validation, associateController.deleteAssociate);
associateRouter.put("/updateAssociate", auth, validation, associateController.updateAssociate);


module.exports = associateRouter;
