const models = require("../models/index");

exports.post = (req, res) => {
  console.log(req.body.todo);
  models.todo
    .create({
      title: req.body.todo,
    })
    .then((result) => {
      console.log("result", result);
      res.send("데이터 넣기 성공");
    });
};
