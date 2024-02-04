const router = require("express").Router();
const { uploadImage, getImages } = require("../controllers/image.controller");
const upload = require("../middlewares/UploadFile");


router.get("/", getImages);
router.post("/",upload.single("image"), uploadImage);

module.exports = router;
