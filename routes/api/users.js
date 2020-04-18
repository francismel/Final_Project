const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

/*---------- Public Routes ----------*/
// router.get("/", usersCtrl.index);
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/edit", usersCtrl.edit);

/*---------- Protected Routes ----------*/

module.exports = router;
