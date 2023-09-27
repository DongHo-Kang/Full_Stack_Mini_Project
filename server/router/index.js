const express = require("express");
const router = express.Router();
const Cget = require("../controller/Cget");
const Cpost = require("../controller/Cpost");
const Cpatch = require("../controller/Cpatch");
const Cdelete = require("../controller/Cdelete");

router.get("/todo", Cget.get);
router.post("/todo", Cpost.post);
router.patch("/todo/:todoId", Cpatch.patch);
router.delete("/todo/:todoId", Cdelete.delete);

module.exports = router;
