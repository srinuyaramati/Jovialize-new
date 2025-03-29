const multer = require("multer");
const maxFileSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/dealImages');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || 
      file.mimetype == "image/jpg" || 
      file.mimetype == "image/jpeg" || 
      file.mimetype == "image/gif") {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file extension'), false);
  }

}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize
  },
  fileFilter: fileFilter
}).single('image');

module.exports = {
  upload: upload
}