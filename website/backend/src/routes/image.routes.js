const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { handleConvert } = require("../controllers/image.controller");

const router = express.Router();

router.post("/convert", upload.single("image"), handleConvert);

module.exports = router;
