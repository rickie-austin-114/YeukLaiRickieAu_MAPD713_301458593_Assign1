const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require('dotenv').config();

const PORT = process.env.PORT;
const FILE_PATH = "data.json";

let getCount = 0;
let postCount = 0;


app = express();
app.use(cors());

// GET endpoint
app.get("/products", (req, res) => {
    getCount += 1;
    console.log(`GET count: ${getCount} POST count: ${postCount}`)
    // Read the JSON file
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(401).send(`Error reading file: ${err}`)
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
  
        // Check if the data exists and is an array
        if (Array.isArray(jsonData)) {
          res.status(200).json(jsonData);
        } else {
          console.error('The "message" key is not an array in the JSON file.');
          res.status(401).send('The "message" key is not an array in the JSON file.')
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(401).send(`Error parsing JSON: ${error}`)
      }
    });
  });




console.log(
`App listening on port ${PORT}
endpoints: /products GET
`
)

app.listen(PORT);

