
const express = require("express");
const router = express.Router();
const Post = require("../models/location");

router.route("/getLocation").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});



// POST http://localhost:5000/api/postMessage
router.route("/postLocation").post((req, res) => {
  const title = req.body.title;
  const newPost = new Post({
    title,
  });
  newPost
    .save()
    .then(() => res.json("Location posted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;