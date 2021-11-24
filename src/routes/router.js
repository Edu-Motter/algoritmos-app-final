const express = require("express");
const deliveryRouter = require("./deliveryRouter");
const deliveryManRouter = require("./deliveryManRouter");
const clientRouter = require("./clientRouter");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("It's working");
});

router.use("/delivery", deliveryRouter);
router.use("/deliveryMan", deliveryManRouter);
router.use("/client", clientRouter);

module.exports = router;