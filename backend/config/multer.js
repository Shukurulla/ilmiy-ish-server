const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      cb(null, 'uploads/avatars/');
    } else if (file.fieldname === 'mainFile') {
      cb(null, 'uploads/publications/');
    } else if (file.fieldname === 'additionalFiles') {
      cb(null, 'uploads/additional/');
    } else if (file.fieldname === 'patentFile' || file.fieldname === 'abstractFile') {
      cb(null, 'uploads/documents/');
    } else {
      cb(null, 'uploads/other/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'avatar') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Faqat rasm fayllari ruxsat etiladi (JPG, PNG)'), false);
    }
  } else if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else if (
    file.mimetype.startsWith('image/') ||
    file.mimetype === 'application/vnd.ms-powerpoint' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Fayl formati qo\'llab-quvvatlanmaydi'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 52428800,
  },
});

module.exports = upload;
