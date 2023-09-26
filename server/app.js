const express = require("express");

const app = express();
const PORT = 8000;

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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
