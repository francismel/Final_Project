var router = require("express").Router();
const analysisRequestCtrl = require("../../controllers/analysisRequest");

router.post("/saveRequest", analysisRequestCtrl.saveRequest);
router.get("/getRequests/:id", analysisRequestCtrl.getRequests);
router.delete("/delRequest/:userId/:requestId", analysisRequestCtrl.delRequest);

module.exports = router;
