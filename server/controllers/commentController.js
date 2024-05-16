import Comment from "../models/commentModel.js";
import errorHandler from "../utils/errorHandler.js";

export const addComment = async (req, res) => {
  const { userID, announcementID, comment } = req.body;

  try {
    const newComment = await Comment.create({
      user: userID,
      announcement: announcementID,
      comment,
    });

    res.status(200).json(newComment);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const removeComment = async (req, res) => {
  const { userID } = req.params;

  try {
    await Comment.findByIdAndDelete(userID);
    res.status(200).json();
  } catch (err) {
    errorHandler(res, err);
  }
};

export const getComment = async (req, res) => {
  const { announcementID } = req.params;

  try {
    const comment = await Comment.find({
      announcement: announcementID,
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(comment);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { userID, announcementID } = req.params;

    await Comment.findOneAndDelete({
      user: userID,
      announcement: announcementID,
    });

    res.status(200).send("Delete Succesfully");
  } catch (err) {
    errorHandler(res, err);
  }
};
