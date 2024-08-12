const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/home", (req, res) => {
  res.send("This is my home page");
});

// Save function route
app.post("/savefunction", (req, res) => {
  const { staffName, staffGender, staffPosition, staffDepartment } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "mumu",
    password: "123456789",
    database: "admindb",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      res.send("Database connection failed");
      return;
    }
    console.log("Connected to the database");

    const sql =
      "INSERT INTO tbl_admin (staffName, staffGender, staffPosition, staffDepartment) VALUES (?, ?, ?, ?)";
    connection.query(
      sql,
      [staffName, staffGender, staffPosition, staffDepartment],
      (err, results) => {
        if (err) {
          console.error("Failed to insert record:", err);
          res.send("Failed to insert record");
          return;
        }
        console.log("1 record inserted");
        res.send("Insert OK");
      }
    );
  });
});

// Get data from Database MySQL
app.get("/getStaffData", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "mumu",
    password: "123456789",
    database: "admindb",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      res.send("Database connection failed");
      return;
    }
    console.log("Connected to the database");

    const sql = "SELECT * FROM tbl_admin";
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Failed to fetch data:", err);
        res.send("Failed to fetch data");
        return;
      }
      console.log("All data was fetched");
      res.json(results);
    });
  });
});

// Edit Function
app.put("/editfunction/:id", (req, res) => {
  const { id } = req.params;
  const { staffName, staffGender, staffPosition, staffDepartment } = req.body;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "mumu",
    password: "123456789",
    database: "admindb",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      res.send("Database connection failed");
      return;
    }
    console.log("Connected to the database");

    const sql =
      "UPDATE tbl_admin SET staffName = ?, staffGender = ?, staffPosition = ?, staffDepartment = ? WHERE id = ?";
    connection.query(
      sql,
      [staffName, staffGender, staffPosition, staffDepartment, id],
      (err, results) => {
        if (err) {
          console.error("Failed to edit the data:", err);
          res.send("Failed to edit the data");
          return;
        }
        console.log("Record updated successfully");
        res.send("Update OK");
      }
    );
  });
});

// Start the server
app.listen(8000, function () {
  console.log("Server is running on port 8000");
});
