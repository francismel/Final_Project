var router = require("express").Router();
const analysisRequestCtrl = require("../../controllers/analysisRequest");

// router.use(require("../../config/auth"));
router.post("/saveRequest", analysisRequestCtrl.saveRequest);

router.get("/getRequests/:id", analysisRequestCtrl.getRequests);
router.delete("/delRequest/:userId/:requestId", analysisRequestCtrl.delRequest);

// function checkAuth(req, res, next) {
//   if (req.user) return next();
//   return res.status(401).json({ msg: "Not Authorized" });
// }

module.exports = router;
