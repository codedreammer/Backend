const getPosts = (req, res) => {
  res.status(200).json({
    message: "Posts endpoint is working",
    data: [],
  });
};

module.exports = {
  getPosts,
};
