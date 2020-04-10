var router = require("express").Router();
const User = require("../../models/user");
const analysisRequestCtrl = require("../../controllers/analysisRequest");

router.get("/", analysisRequestCtrl.index);

module.exports = router;
