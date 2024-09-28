const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const PORT = process.env.PORT;

app = express();
app.use(cors());





app.listen(PORT);

