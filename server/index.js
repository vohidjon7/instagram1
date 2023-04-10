const express = require("express");
require("dotenv").config();
const mg = require("mongoose");
const app = express();
const server = require("./routes/server");
const cors = require("cors");
const ExpressFormidable = require("express-formidable");
const morgan = require("morgan");


app.use(ExpressFormidable());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", server);

mg.connect(process.env.MONGO_URI);
mg.connection.on("connected", () => {
  console.log("db");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server");
});
