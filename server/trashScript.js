const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "greenstreets",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: ", err);
        return;
    }

    // Function to generate and execute SQL queries
    const generateAndExecuteQueries = () => {
        const startDate = new Date("2022-01-06");
        const endDate = new Date("2024-01-06");
        const monthsToAdd = 1;
        let currentID = 1;

        let rubbishClass = 1; // Initialize rubbishClass to 1

        while (startDate <= endDate) {
            for (let i = 1; i <= 10; i++) {
                const timestamp = startDate
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
                const query = `INSERT INTO trash VALUES (${currentID}, 27.4977, 153.0179, '${timestamp}', ${rubbishClass}, 4067, 'St Lucia', 1);`;

                db.query(query, (err) => {
                    if (err) {
                        console.error("Error executing query: ", err);
                    }
                });

                currentID++; // Increment the ID for the next insertion
                rubbishClass = (rubbishClass % 3) + 1; // Cycle rubbishClass from 1 to 2 to 3
            }

            // Move to the next month
            startDate.setMonth(startDate.getMonth() + monthsToAdd);
        }
    };
    const generateCameras = () => {
        for (let i = 1; i <= 20; i++) {
            const cameraData = {
                CameraID: i + 50,
                GeoAreaID: 101, // Use a fixed GeoAreaID
                VehicleID: 201, // Use a fixed VehicleID
                OrganisationID: 123456,
                CameraVersion: 2.0, // Use a fixed CameraVersion
                CameraInfo: `Camera ${i}`,
                InstallationDate: "2023-09-01", // Use a fixed InstallationDate
                Status: 1, // Use a fixed Status
            };
            db.query("INSERT INTO Cameras SET ?", cameraData, (err, result) => {
                if (err) {
                    console.error("Error inserting camera record:", err);
                }
            });
        }
    };

    const generateCleaners = () => {
        for (let i = 1; i <= 50; i++) {
            const cleanerData = {
                CleanerID: i,
                ContactID: i + 10,
                OrganisationID: 12345,
            };
            db.query(
                "INSERT INTO Cleaners SET ?",
                cleanerData,
                (err, result) => {
                    if (err) {
                        console.error("Error inserting camera record:", err);
                    }
                }
            );
        }
    };
    const genereateJobs = () => {
        const dummyData = [];

        // Add 10 records with Status 0
        for (let i = 1; i <= 10; i++) {
            dummyData.push({
                JobID: i,
                Date: "2023-09-01",
                VehicleID: i,
                OrganisationID: 12345,
                StartLatitude: 0.0,
                StartLongitude: 0.0,
                EndLatitude: 0.0,
                EndLongitude: 0.0,
                EstCompleteTime: 0.0,
                EstRubbishAmount: 0.0,
                StartTime: "2023-09-01 00:00:00",
                EndTime: "2023-09-01 00:00:00",
                Status: 0,
                Notes: "Status 0",
            });
        }

        // Add 10 records with Status 1
        for (let i = 11; i <= 30; i++) {
            dummyData.push({
                JobID: i,
                Date: "2023-09-02",
                VehicleID: i,
                OrganisationID: 12345,
                StartLatitude: 0.0,
                StartLongitude: 0.0,
                EndLatitude: 0.0,
                EndLongitude: 0.0,
                EstCompleteTime: 0.0,
                EstRubbishAmount: 0.0,
                StartTime: "2023-09-02 00:00:00",
                EndTime: "2023-09-02 00:00:00",
                Status: 1,
                Notes: "Status 1",
            });
        }

        // Add 10 records with Status 2
        for (let i = 31; i <= 45; i++) {
            dummyData.push({
                JobID: i,
                Date: "2023-09-03",
                VehicleID: i,
                OrganisationID: 12345,
                StartLatitude: 0.0,
                StartLongitude: 0.0,
                EndLatitude: 0.0,
                EndLongitude: 0.0,
                EstCompleteTime: 0.0,
                EstRubbishAmount: 0.0,
                StartTime: "2023-09-03 00:00:00",
                EndTime: "2023-09-03 00:00:00",
                Status: 2,
                Notes: "Status 2",
            });
        }

        // Insert the dummy data into the Jobs table
        const insertQuery = "INSERT INTO Jobs SET ?";
        let insertedCount = 0;

        dummyData.forEach((data) => {
            db.query(insertQuery, data, (err, result) => {
                if (err) {
                    console.error("Error inserting job record:", err);
                } else {
                    console.log(
                        `Inserted job record with ID ${result.insertId}`
                    );
                    insertedCount++;
                }
            });
        });
    };
    generateAndExecuteQueries();
    //generateCameras();
    // generateCleaners();
    //genereateJobs();
    // Close the database connection when done
    db.end((err) => {
        if (err) {
            console.error("Error closing connection: ", err);
        }
    });
});
