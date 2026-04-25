const express = require("express");
const { getPosts, getUserPosts, createPost, getPostWithComments, likePost } = require("../controllers/postController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getPosts);
router.get("/user", authMiddleware, getUserPosts);
router.post("/", authMiddleware, createPost);
router.get("/:id", getPostWithComments);

router.post("/:id/like", authMiddleware, likePost);

module.exports = router;
