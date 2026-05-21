const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  anonymous_name: { type: String, required: true },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
