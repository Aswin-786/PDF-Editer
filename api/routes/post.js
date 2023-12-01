const express = require("express");
const { uploadMiddleware, fs } = require("../middleware/fileUpload");
const jwt = require("jsonwebtoken");
const post = require("../models/post");

const router = express.Router();
const SECRET = "aswin786";

router.post("/", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  if (!originalname || !path)
    return res.status(401).json({ message: "file missing" });
  const ext = originalname.split(".")[1];

  if (ext != 'pdf') {
    fs.unlinkSync(path);
    return res.status(401).json({ message: 'upload only pdfs' })
  }
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, {}, async (err, info) => {
      if (err) throw err;

      if (!info)
        return res.status(401).json({ message: "error occurs in info" });
      if (typeof info === "string")
        return res.status(401).json({ message: "error occurs in info" });
      const postDoc = await post.create({

        cover: newPath,
        author: info.id,
      });
      res.status(200).json(postDoc);
    });
  }
});

module.exports = router;