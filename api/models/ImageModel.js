const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    imgUrl: String,
  },
  { timestamps: true }
);

const model = new mongoose.model("Image", Schema);
module.exports = model;
