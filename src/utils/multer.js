const multer = require("multer");
const fs = require("fs");
const path = require("path");

const createDirIfNot = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const folders = {
  avatar: "uploads/avatars/",
  other: "uploads/others/",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = folders[file.fieldname] || folders.other;
    createDirIfNot(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const uniqueFile = `${originalName}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFile);
  },
});

const upload = multer({ storage });

module.exports = upload;
