const ImageModel = require("../models/ImageModel");

const uploadImage = async (req, res) => {
  let imgUrl = `${process.env.DOMAIN}/public/${req.file.filename}`;
  let data = await ImageModel.create({ imgUrl });
  res.status(201).json({
    message: "File Uploaded Successfully!",
    imgUrl,
  });
};

const getImages = async (req, res) => {
  let data = await ImageModel.find(req.query);
  return res.send(data);
};

module.exports = { uploadImage, getImages };
