const multer = require("multer");
const fs = require("fs");

const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

module.exports = {
  uploadMiddleware,
  fs,
};