const models = require("../models/index");

exports.post = (req, res) => {
  models.todo
    .create({
      title: req.body.title,
    })
    .then((result) => {
      console.log("result", result);
      res.send("데이터 넣기 성공");
    });
};
