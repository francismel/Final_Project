var router = require("express").Router();
const User = require("../models/user");
const usersCtrl = require("../controllers/users");

router.get("/", usersCtrl.index);

module.exports = router;
