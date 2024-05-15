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

    res.status(200).send(newComment);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const removeComment = async (req, res) => {
  const { userID } = req.params;

  try {
    await Comment.findByIdAndDelete(userID);
    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

export const getComment = async (req, res) => {
  const { announcementID } = req.params;

  try {
    const comment = await Comment.findById({
      announcement: announcementID,
    }).populate("user");

    res.status(200).json(comment);
  } catch (err) {
    errorHandler(res, err);
  }
};
