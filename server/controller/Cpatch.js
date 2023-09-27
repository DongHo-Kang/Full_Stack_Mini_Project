//수정
const models = require("../models/index");

exports.patch = (req, res) => {
  //id:는 URL 뒤에 인자에서 가져오기
  const { title, id } = req.body;
  models.todo.update({ title }, { where: { id } }).then((result) => {
    res.status(200).send({ message: "수정 성공" });
  });
};
