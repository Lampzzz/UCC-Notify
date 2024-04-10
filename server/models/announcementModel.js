import mongoose from "mongoose";

const announcementSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    default: "",
  },

  types: {
    type: String,
    required: true,
  },

  categories: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    default: new Date(),
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
