const express = require("express");
const { getPosts, createPost, getPostWithComments, likePost } = require("../controllers/postController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostWithComments);

router.post("/:id/like", authMiddleware, likePost);

module.exports = router;
