import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Announcement",
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    default: new Date(),
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
