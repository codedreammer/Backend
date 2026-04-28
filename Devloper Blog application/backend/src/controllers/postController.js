const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name username').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).populate('author', 'name username').sort({ createdAt: -1 });
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

    const post = await Post.create({ title, content, author: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostWithComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name username');
    const comments = await Comment.find({ post: req.params.id }).populate('user', 'name username');

    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save({ validateBeforeSave: false });

    res.json({ message: "Like toggled", likesCount: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  getPostWithComments,
  likePost,
};
