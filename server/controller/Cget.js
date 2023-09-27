const models = require("../models/index");

exports.get = (req, res) => {
  models.todo.findAll().then((result) => {
    res.status(200).send({ message: "가져오기 성공", data: { result } });
  });
};
