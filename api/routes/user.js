const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require('../models/user')

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const SECRET = "aswin786";

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const checkUser = await user.findOne({ email })
  if (checkUser) {
    res.status(404).json({ message: 'already user is there' })
  } else {
    const userDoc = await user.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    })
    if (userDoc) {
      res.status(200).json({ message: 'user created' })
    } else {
      res.status(400).json({ message: 'user creation failed' })
    }
  }
})

router.get('/hi', (req, res) => {
  res.json('hi')
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await user.findOne({ email })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email, id: userDoc._id, username: userDoc.username }, SECRET, {}, (err, token) => {
        if (err) throw err
        res.json({
          username: userDoc.username,
          id: userDoc._id,
          email,
          token,
        });
      })
    }
  } else {
    res.status(404).json({ message: 'wrong credentials' })
  }
})

router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, {}, (err, info) => {
      if (err) throw err;
      res.status(200).json({ info, token });
    });
  }
});

router.post("/logout", (req, res) => {
  res.json("ok done");
});

// user Profile
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await user.findById(userId).select("username");
    // if (userDoc) {
    //   const postDoc = await Post.find({ author: userId }).sort({
    //     createdAt: -1,
    //   });
    //   res.status(200).json({ userDoc, postDoc });
    // } else {
    //   res.status(404).json({ message: "user is not there" });
    // }
  } catch (error) {
    res.status(500).json("Internal error");
  }
});

module.exports = router;
