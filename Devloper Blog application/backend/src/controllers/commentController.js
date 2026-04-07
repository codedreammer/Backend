const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
 
// ADD COMMENT
const addComment = async (req, res) => {
try {
    const { postId, text } = req.body ?? {};

    if (!postId || !text) {
    return res.status(400).json({
        message: "postId and text are required in the request body."
    });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
        message: "postId must be a valid MongoDB ObjectId."
    });
    }

    const comment = await Comment.create({ postId, text });

    res.status(201).json(comment);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

// GET COMMENTS FOR A POST
const getComments = async (req, res) => {
try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
        .populate("postId", "title content")
        .sort({ createdAt: -1 });

    res.json(comments);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = { addComment, getComments };
