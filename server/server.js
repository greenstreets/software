const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const port = 8000; // You can change this to any available port you prefer

app.use(cors()); // Use the cors middleware
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
  // markers
  var markers = [
    {
      geocode: [-27.470125, 153.021072],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [-27.480125, 153.031072],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [-27.490125, 153.041072],
      popUp: "Hello, I am pop up 3",
    },
  ];

  res.json(markers);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
