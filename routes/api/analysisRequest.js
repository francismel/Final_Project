var router = require("express").Router();
const User = require("../../models/user");
const analysisRequestCtrl = require("../../controllers/analysisRequest");

router.post("/analyzeRequest", analysisRequestCtrl.analyzeRequest);

module.exports = router;
