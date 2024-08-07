import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
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

  createdAt: {
    type: String,
    default: new Date(),
    required: true,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
