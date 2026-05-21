const Post = require("../models/Post");

// Get posts (with optional category filter)
async function getPosts(req, res) {
  try {
    const { category } = req.query;
    const filter = category && category !== "all" ? { category } : {};
    const posts = await Post.find(filter).sort({ created_date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
}

// Create new post
async function createPost(req, res) {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: "Error creating post" });
  }
}

// Like a post
async function likePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes_count: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: "Error liking post" });
  }
}

module.exports = { getPosts, createPost, likePost };
