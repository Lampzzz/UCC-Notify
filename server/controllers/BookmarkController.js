import Bookmark from "../models/bookmarkModel.js";
import errorHandler from "../utils/errorHandler.js";

export const addBookmark = async (req, res) => {
  const { userID, announcementID } = req.body;

  try {
    const newBookmark = await Bookmark.create({
      user: userID,
      announcement: announcementID,
    });

    res.status(200).send(newBookmark);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const removeBookmark = async (req, res) => {
  const { userID, announcementID } = req.params;

  try {
    await Bookmark.findOneAndDelete({
      user: userID,
      announcement: announcementID,
    });

    res.status(200).send("Delete Successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};

export const checkBookmark = async (req, res) => {
  const { userID, announcementID } = req.params;

  try {
    const bookmarkExist = await Bookmark.findOne({
      user: userID,
      announcement: announcementID,
    });

    res.status(200).send(bookmarkExist ? true : false);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const getBookmarkByUserID = async (req, res) => {
  const { userID } = req.params;

  try {
    const allBookmark = await Bookmark.find({ user: userID }).populate(
      "announcement"
    );
    res.status(200).send(allBookmark);
  } catch (err) {
    errorHandler(res, err);
  }
};
