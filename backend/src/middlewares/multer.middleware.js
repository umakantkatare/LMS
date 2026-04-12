import multer from "multer";
import ApiError from "../utils/error.util.js";
import logger from "../utils/logger.util.js";
import path  from 'path';

const uploadDir = path.join (process.cwd(), 'src', 'uploads')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//      logger.info(`Uploading file to uploads folder: ${file.originalname}`);
//     // cb(null, uploadDir);
//     cb(null,  "src/uploads/")
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//      logger.info(`Generated filename: ${uniqueName}`);
//     cb(null, uniqueName);
//   },
// });

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    logger.info(`File accepted: ${file.originalname}`);
    cb(null, true);
  } else {
    cb(new ApiError("only images allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;
