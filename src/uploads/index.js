const multer = require("multer");
let date = Date.now();
// console.log(date);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, date + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
