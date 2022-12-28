// Creating the local backend server
const express = require("express");
const app = express();
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// make frontend and backend on the same server, so we can ignore domain name in fetch from localhost
app.use(express.static("website"));

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // to automatically parse json format to js object
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Project data
let projectData = {};

// API endpoints
// Saving data in projectData object
app.post("/postData", (request, response) => {
  projectData = request.body;
  response.json({ msg: "done" });
});

// Sending data to the frontend
app.get("/getData", (request, response) => {
  response.json(projectData); // convert js object to json format
});
