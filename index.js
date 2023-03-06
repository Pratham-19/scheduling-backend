const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
const processes = require("./api/routes/process");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/process", processes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
