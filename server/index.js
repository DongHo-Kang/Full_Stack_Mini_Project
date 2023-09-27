const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models/index");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require("./router/index");
app.use("/", router);

app.use("*", (req, res) => {
  res.send("404Error");
});
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
