const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const port = 8000; // You can change this to any available port you prefer
app.use(cors()); // Use the cors middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON requests

//////////////////////////DATABASE CONNECTION/////////////////////////////////////
//mysql port 3306 || X protocol port 33060
const mysql = require("mysql2");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Your PASSWORD HERE",
  database: "greenstreets",
});
//////////////////////////DATABASE CONNECTION/////////////////////////////////////

// Define a simple route
app.get("/", (req, res) => {
  console.log("hello");
  res.send("Hello, World!");
});

// Define about route
app.get("/about", (req, res) => {
  console.log("about");
  res.send("This is the About page.");
});

// Define markers route
app.get("/api/markers", (req, res) => {
  console.log("Getting marker positions ");
  db.query("SELECT * FROM trash", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json(results);
  });
});

// Define markers route
app.get("/api/heatmap", (req, res) => {
  console.log("Getting marker positions ");
  db.query("SELECT * FROM trash", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database error" });
    }
    var newArr = [];
    for (let i = 0; i < results.length; i++) {
      var latLangPair = [];
      latLangPair.push(results[i].Latitude, results[i].Longitude);
      newArr.push(latLangPair);
    }
    return res.json(newArr);
  });
});

//
// Define delete markers route
app.post("/api/delete/markers", (req, res) => {
  console.log("Deleting marker ");
  const markerData = req.body;
  try {
    // Execute a raw SQL DELETE query
    db.query(
      "DELETE FROM trash WHERE Latitude = ? AND Longitude = ?",
      [markerData.id, markerData.lat],
      (err, results) => {
        if (err) {
          console.error("Error deleting data:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.json({ message: "Data deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/get_data", (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
