import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  avatar: { type: String, required: true },

  role: { type: String, default: "User" },

  createdAt: {
    type: String,
    default: new Date(),
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
