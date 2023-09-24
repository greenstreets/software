const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors middleware
const port = 8000; // You can change this to any available port you prefer
app.use(cors()); // Use the cors middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON requests

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
require("dotenv").config();
//////////////////////////DATABASE CONNECTION/////////////////////////////////////
//mysql port 3306 || X protocol port 33060
const mysql = require("mysql2");
const db = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "root",
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
            [markerData.lat, markerData.long],
            (err, results) => {
                if (err) {
                    console.error("Error deleting data:", err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                console.log("Data deleted successfully");
                res.json({ message: "Data deleted successfully" });
            }
        );
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Login authentication
app.get("/get_data", (req, res) => {
    res.json(users);
});

const users = [
    {
        username: "user2",
        password:
            "$2b$10$vhFiqLDlWYvOlSbik9F9cO6XPlX080MOGGTorxX1xoxAHTjHOyTG6",
    },
    {
        username: "user1",
        password:
            "$2b$10$vhFiqLDlWYvOlSbik9F9cO6XPlX080MOGGTorxX1xoxAHTjHOyTG6",
    },
];
app.get("/users", authenticateToken, (req, res) => {
    res.json(users.filter((post) => post.username === req.user.name));
});

app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.username, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);
    const authenticate = await authenticateUser(username, password);
    console.log("asdasda");
    if (authenticate == 0) {
        return res
            .status(400)
            .json({ message: "Email or password does not match" });
    }
    if (authenticate == 1) {
        console.log("pass");
        const user = { name: username };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } else {
        return res
            .status(400)
            .json({ message: "Email or password does not match" });
    }
});

async function authenticateUser(username, password) {
    const user = users.find((user) => user.username === username);
    if (user == null) {
        return 0;
    }
    if (await bcrypt.compare(password, user.password)) {
        return 1;
    } else {
        return 2;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

//Data Visualization

const testData = [
    {
        date: "2023-07",
        average_trash: 10,
    },
    {
        date: "2023-08",
        average_trash: 10,
    },
    {
        date: "2023-09",
        average_trash: 10,
    },
    {
        date: "03/04/2022",
        average_trash: 20,
    },
    {
        date: "03/05/2022",
        average_trash: 23,
    },
    {
        date: "03/06/2022",
        average_trash: 17,
    },
    {
        date: "03/07/2022",
        average_trash: 15,
    },
];

app.get("/data", async (req, res) => {
    console.log("easdad");
    return res.json(testData);
});

function calculateItemsPerMonth(data) {
    const itemCountsPerMonth = {};
    data.forEach((item) => {
        const timestamp = new Date(item.Timestamp);
        const year = timestamp.getFullYear();
        const month = timestamp.getMonth() + 1;
        const monthKey = `${year}-${month.toString().padStart(2, "0")}`;
        if (itemCountsPerMonth[monthKey]) {
            itemCountsPerMonth[monthKey]++;
        } else {
            itemCountsPerMonth[monthKey] = 1;
        }
    });
    const result = Object.entries(itemCountsPerMonth).map(
        ([date, average_trash]) => ({
            date,
            average_trash,
        })
    );
    return result;
}

app.get("/database", async (req, res) => {
    const date = req.get("dates");
    const months = req.get("time");
    console.log(date);
    console.log(months);
    const sqlQuery = `
  SELECT *
  FROM trash
  WHERE Timestamp >= DATE_SUB('${date}', INTERVAL ${months} MONTH)
  AND Timestamp <= '${date}'
  AND Status = 1
  `;
    db.query(sqlQuery, (err, results, fields) => {
        if (err) {
            console.error("Error executing query: ", err);
            return res.status(500).json({ error: "Database query error" });
        }
        //console.log("Query results: ", calculateItemsPerMonth(results));
        const calculatedResult = calculateItemsPerMonth(results);
        return res.json(calculatedResult);
    });
});

function calculateRubbishClassPercentage(data) {
    const totalCount = data.length;
    const classCounts = { 1: 0, 2: 0, 3: 0 };

    // Count the occurrences of each rubbishClass
    data.forEach((row) => {
        const rubbishClass = row.RubbishClass;
        classCounts[rubbishClass]++;
    });

    // Calculate percentages
    const percentages = Object.keys(classCounts).map((classNum) => {
        const count = classCounts[classNum];
        const percentage = (count / totalCount) * 100;
        return percentage.toFixed(2); // Round to 2 decimal places
    });

    return percentages;
}

app.get("/databasePie", async (req, res) => {
    const date = req.get("dates");
    const months = req.get("time");
    console.log(date);
    console.log(months);
    const sqlQuery = `
  SELECT *
  FROM trash
  WHERE Timestamp >= DATE_SUB('${date}', INTERVAL ${months} MONTH)
  AND Timestamp <= '${date}'
  AND Status = 1
  `;
    db.query(sqlQuery, (err, results, fields) => {
        if (err) {
            console.error("Error executing query: ", err);
            return res.status(500).json({ error: "Database query error" });
        }
        console.log("Query results: ", results.length);
        const calculatedResult = calculateRubbishClassPercentage(results);
        return res.json(calculatedResult);
    });
});

app.get("/getCamera", async (req, res) => {
    const orgID = req.get("orgID");
    db.query(
        `SELECT COUNT(*) AS cameraCount FROM Cameras WHERE OrganisationID = ${orgID}`,
        (err, results) => {
            if (err) {
                console.error("Error querying the database: ", err);
                res.status(500).json({ error: "Error querying the database" });
                return;
            }
            // Extract the cameraCount from the results
            const cameraCount = results[0].cameraCount;
            // Send the cameraCount as a JSON response
            return res.json({ cameraCount });
        }
    );
});

app.get("/trashCount", async (req, res) => {
    const date = req.get("dates");
    console.log(date);
    const sqlQuery = `
        SELECT COUNT(*) AS itemCount
        FROM trash
        WHERE Timestamp <= '${date}'
        AND Status = 1
    `;

    db.query(sqlQuery, (err, results, fields) => {
        if (err) {
            console.error("Error executing query: ", err);
            return res.status(500).json({ error: "Database query error" });
        }

        // Extract the itemCount from the results
        const itemCount = results[0].itemCount;
        console.log(itemCount);
        return res.json({ itemCount });
    });
});

app.get("/getCleaners", async (req, res) => {
    const orgID = req.get("orgID");
    db.query(
        `SELECT COUNT(*) AS cleanerCount FROM Cleaners WHERE OrganisationID = ${orgID}`,
        (err, results) => {
            if (err) {
                console.error("Error querying the database: ", err);
                res.status(500).json({ error: "Error querying the database" });
                return;
            }
            // Extract the cameraCount from the results
            const cleanerCount = results[0].cleanerCount;
            // Send the cameraCount as a JSON response
            return res.json({ cleanerCount });
        }
    );
});

app.get("/getJobsScheduled", async (req, res) => {
    const orgID = req.get("orgID");
    db.query(
        `SELECT COUNT(*) AS jobCount FROM Jobs WHERE OrganisationID = ${orgID} AND Status = 0`,
        (err, results) => {
            if (err) {
                console.error("Error querying the database: ", err);
                res.status(500).json({ error: "Error querying the database" });
                return;
            }
            // Extract the cameraCount from the results
            const jobCount = results[0].jobCount;
            // Send the cameraCount as a JSON response
            return res.json({ jobCount });
        }
    );
});

app.get("/getJobsProgress", async (req, res) => {
    const orgID = req.get("orgID");
    db.query(
        `SELECT COUNT(*) AS jobCount FROM Jobs WHERE OrganisationID = ${orgID} AND Status = 1`,
        (err, results) => {
            if (err) {
                console.error("Error querying the database: ", err);
                res.status(500).json({ error: "Error querying the database" });
                return;
            }
            // Extract the cameraCount from the results
            const jobCount = results[0].jobCount;
            // Send the cameraCount as a JSON response
            return res.json({ jobCount });
        }
    );
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
