const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const port = 8000; // You can change this to any available port you prefer
app.use(cors()); // Use the cors middleware
//////////////////////////DATABASE CONNECTION/////////////////////////////////////
//mysql port 3306 || X protocol port 33060
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GreenBottle()24#",
  database: "greenstreets",
});

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

    // console.log(results);
    return res.json(results);
  });
});

app.get("/get_data", (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
