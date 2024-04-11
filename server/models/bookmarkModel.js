import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  annoucement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Annoucement",
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
