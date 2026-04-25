    const express = require("express");
    const router = express.Router();

    const {
    addComment,
    getComments
    } = require("../controllers/commentController");
    const authMiddleware = require("../middlewares/authMiddleware");

    router.post("/", authMiddleware, addComment);
    router.get("/:postId", getComments);

    module.exports = router;