//수정
const models = require("../models/index");

exports.patch = (req, res) => {
  //id:는 URL 뒤에 인자에서 가져오기
  console.log("patch", req.body);
  const { todo, id, done } = req.body;
  models.todo
    .update({ title: todo, done: done }, { where: { id } })
    .then((result) => {
      console.log("result", result);
      res.status(200).send({ message: "수정 성공" });
    });
};
