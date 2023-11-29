// server/index.js

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "board",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching posts");
      return;
    }
    res.json(results);
  });
});

app.post("/posts", (req, res) => {
  const { title, content, writer, pass } = req.body;
  connection.query(
    "INSERT INTO posts (title, content, writer, pass) VALUES (?, ?, ?, ?)",
    [title, content, writer, pass],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating post");
        return;
      }
      res.status(201).send("Post created successfully");
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
