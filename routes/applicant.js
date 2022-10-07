const express = require("express");
const router = express.Router();

const ApplicantController = require("../controllers/ApplicantController");
const upload = require("../middleware/upload");

router.get("/", ApplicantController.index);
router.post("/show", ApplicantController.show);
router.post("/store", upload.single("resume"), ApplicantController.store);
router.post("/update", upload.single("resume"), ApplicantController.update);
router.post("/delete", ApplicantController.destroy);

module.exports = router;
