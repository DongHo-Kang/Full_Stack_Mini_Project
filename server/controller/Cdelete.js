const models = require("../models/index");

exports.delete = (req, res) => {
  const { id } = req.body;
  models.todo.destroy({ where: { id } }).then(() => {
    res.send({ message: "삭제 성공" });
  });
};
