const express = require("express");
const { getPosts, createPost, getPostWithComments } = require("../controllers/postController");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostWithComments);

module.exports = router;
