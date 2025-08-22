import multer from "multer";
import path from "path";

// kur saugosime
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // katalogas kur bus saugoma
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unikalus pavadinimas
  }
});

export const upload = multer({ storage });