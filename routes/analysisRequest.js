var router = require("express").Router();
const User = require("../models/analysisRequest");
const analysisRequestCtrl = require("../controllers/analysisRequest");

router.get("/", analysisRequestCtrl.index);

module.exports = router;
