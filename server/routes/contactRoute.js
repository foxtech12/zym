const express = require("express");

const router = express.Router();
const contactController = require("../controller/contactController");

router.post("/add", contactController.contactPost);
router.get("/get", contactController.contactGet);

module.exports = router;
