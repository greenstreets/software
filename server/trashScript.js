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

    while (startDate <= endDate) {
      for (let i = 1; i <= 10; i++) {
        const timestamp = startDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const query = `INSERT INTO trash VALUES (${currentID}, 27.4977, 153.0179, '${timestamp}', 1, 4067, 'St Lucia');`;

        db.query(query, (err) => {
          if (err) {
            console.error("Error executing query: ", err);
          }
        });

        currentID++; // Increment the ID for the next insertion
      }

      // Move to the next month
      startDate.setMonth(startDate.getMonth() + monthsToAdd);
    }

    // Close the database connection when done
    db.end((err) => {
      if (err) {
        console.error("Error closing connection: ", err);
      }
    });
  };

  generateAndExecuteQueries();
});
