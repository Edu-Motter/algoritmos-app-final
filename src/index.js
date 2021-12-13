const express = require('express');
const app = express();
const router = require("./routes/router");
require("./database")

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(router);

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number, () => {
  console.log("Server is running at localhost: ", process.env.SYSTEM_PORT);
});




module.exports = app;