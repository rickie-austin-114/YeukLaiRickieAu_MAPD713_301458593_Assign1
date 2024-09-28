const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

// get 
const PORT = process.env.PORT;
const FILE_PATH = process.env.FILE_PATH;

let getCount = 0;
let postCount = 0;

app = express();
app.use(cors());
app.use(bodyParser.json());

// GET endpoint
app.get("/products", (req, res) => {
  // debug message
  console.log("products GET: received request");
  // count of GET request
  getCount += 1;
  console.log(`GET count: ${getCount} POST count: ${postCount}`);

  // Read the JSON file
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    // handle error in file reading
    if (err) {
      console.error("Error reading file:", err);
      console.log("products GET: sending response");
      res.status(500).send(`Error reading file: ${err}`);
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Check if the data exists and is an array
      if (Array.isArray(jsonData)) {
        // return the data in data.json file the format is valid
        console.log("products GET: sending response");
        res.status(200).json(jsonData);
      } else {
        // error handling for invalid data structure in data.json
        console.error('The "message" key is not an array in the JSON file.');
        console.log("products GET: sending response");
        res.status(500).send("The content is not an array in the JSON file.");
      }
    } catch (error) {
      // other error
      console.error("Error parsing JSON:", error);
      console.log("products GET: sending response");
      res.status(500).send(`Error parsing JSON: ${error}`);
    }
  });
});

// POST endpoint
app.post("/products", (req, res) => {
  // count of POST request
  console.log("products POST: received request");
  postCount += 1;
  console.log(`GET count: ${getCount} POST count: ${postCount}`);

  // Read the JSON file
  fs.readFile(FILE_PATH, "utf8", (err, data) => {

    // handle file read error
    if (err) {
      console.error("Error reading file:", err);
      console.log("products POST: sending response");
      res.status(500).send(`Error reading file: ${err}`);
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Validate whether the json data is an array
      if (Array.isArray(jsonData)) {
        // check whether request body is empty
        if (!!req.body) {
          jsonData.push(req.body);
        } else {
          console.log("products POST: sending response");
          res.status(400).send("Request body empty");
        }

        // Convert the updated JSON object back to a JSON string
        const updatedData = JSON.stringify(jsonData, null, 2);

        // Write the updated JSON data back to the file
        fs.writeFile(FILE_PATH, updatedData, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            console.log("products POST: sending response");
            res.status(500).send(`Error writing file: ${err}`);
            return;
          }
        });

        console.log("products POST: sending response");

        res.status(200).send("success");
      } else {
        console.error("The content is not an array in the JSON file.");
        console.log("products POST: sending response");
        res.status(500).send("The content is not an array in the JSON file.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.log("products POST: sending response");
      res.status(500).send(`Error parsing JSON: ${error}`);
    }
  });
});

// DELETE endpoint
app.delete("/products", (req, res) => {
  try {
    const jsonData = [];
    // Convert the updated JSON object back to a JSON string
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated JSON data back to the file
    fs.writeFile(FILE_PATH, updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        console.log("products DELETE: sending response");
        res.status(500).send(`Error writing file: ${err}`);
      }
    });
    res.status(200).send("content has been deleted");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("products DELETE: sending response");
    res.status(500).send(`Error parsing JSON: ${error}`);
  }
});

// message upon launch
console.log(
  `Server is listening at http://127.0.0.1:${PORT}
Endpoints:
http://127.0.0.1:${PORT}/products method: GET, POST, DELETE
`
);

// start the app
app.listen(PORT);
