const express = require('express');
const router = express.Router();
const multer = require('multer');





const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer();
router.post("/upload", upload.single("file"), async function (req, res, next) {
  const {
    file,
    body: { name }
  } = req;


  if (file.detectedFileExtension != ".jpg") next(new Error("Invalid file type"));
  const fileName = name + Math.floor(Math.random() * 1000) + file.detectedFileExtension;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/..public/images/${fileName}`)
  );

  res.send("File uploaded as" + fileName)
})

module.exports = router;
