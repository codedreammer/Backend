const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body ?? {};

    if (!title || !content) {
      return res.status(400).json({
        message: "title and content are required in the request body.",
      });
    }

    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostWithComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ postId: req.params.id });

    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostWithComments,
};
