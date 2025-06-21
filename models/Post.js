import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
