const sharp = require("sharp");

exports.convertImage = async (buffer, quality, format = "webp") => {
  const image = sharp(buffer)
    .rotate() // auto rotate
    .resize({ width: 1200, withoutEnlargement: true });

  if (format === "avif") {
    return await image
      .avif({ quality: Number(quality) || 50 })
      .toBuffer();
  }

  return await image
    .webp({ quality: Number(quality) || 75 })
    .toBuffer();
};
