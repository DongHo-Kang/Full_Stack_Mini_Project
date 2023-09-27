const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models/index");

app.get("/todo", (req, res) => {
  res.send("GET /todo");
});

app.post("/todo", (req, res) => {
  res.send("POST /todo");
});

app.patch("/todo/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  res.send(`PATCH /todo/${todoId}`);
});

app.delete("/todo/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  res.send(`DELETE /todo/${todoId}`);
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
