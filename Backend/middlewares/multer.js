import multer from 'multer';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Set up file filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Create the upload middleware with single file upload
const upload = multer({ storage, fileFilter });

// Export the middleware for use in other parts of the app
export const singleUpload = upload.single('file');  // "file" is the field name in the form
