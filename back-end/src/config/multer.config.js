
const multer = require('multer');

const allowedFileTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype;
    if (allowedFileTypes.includes(fileType)) {
      cb(null,true);
    } else {
      const error = new Error('Only PDF, DOC, DOCX files are allowed!');
      error.statusCode = 400;
      cb(null,false);
    }
  },
  // max file size = 5MB
  limits: {fileSize: 5 * 1024 * 1024,}  
});

module.exports = upload;

