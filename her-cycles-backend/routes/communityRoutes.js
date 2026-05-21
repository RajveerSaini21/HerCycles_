const express = require("express");
const { getPosts, createPost, likePost } = require("../controllers/communityController");


const router = express.Router();

router.get("/posts", getPosts);        // GET all posts
router.post("/posts", createPost);     // CREATE post
router.post("/posts/:id/like", likePost); // LIKE a post

module.exports = router;
