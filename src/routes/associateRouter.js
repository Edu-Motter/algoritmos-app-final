const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");

associateRouter.get("/listAllAssociates", associateController.listAllAssociates);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.post("/authentication", associateController.authentication);

associateRouter.delete("/deleteAssociate", auth, associateController.deleteAssociate);
associateRouter.put("/updateAssociate", auth, associateController.updateAssociate);


module.exports = associateRouter;
