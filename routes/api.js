const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../middlewares/multer");

// router api landing page
router.get("/landing-page", apiController.landingPage);
// router api item detail
router.get("/detail-page/:id", apiController.detailPage);
// router api booking
router.post("/booking-page", uploadSingle, apiController.bookingPage);
module.exports = router;
