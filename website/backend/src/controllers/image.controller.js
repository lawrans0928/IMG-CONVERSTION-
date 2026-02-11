const { convertImage } = require("../services/image.service");

exports.handleConvert = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const quality = req.body.quality || 75;
    const format = req.body.format || "webp";

    const output = await convertImage(req.file.buffer, quality, format);

    res.set("Content-Type", `image/${format}`);
    res.send(output);

  } catch (err) {
    next(err);
  }
};
