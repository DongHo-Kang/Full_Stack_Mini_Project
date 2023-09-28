const models = require("../models/index");

exports.delete = (req, res) => {
  console.log("삭제::::::::", req.params.todoId.split(":"));
  const Split = req.params.todoId.split(":");
  console.log("Split", Split);
  const id = Split[1];
  models.todo.destroy({ where: { id } }).then(() => {
    res.send({ message: "삭제 성공" });
  });
};
