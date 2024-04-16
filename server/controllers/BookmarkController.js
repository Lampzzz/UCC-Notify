import Bookmark from "../models/bookmarkModel.js";
import errorHandler from "../utils/errorHandler.js";

export const toggleBookmark = async (req, res) => {
  const { userID, announcementID } = req.body;

  try {
    const bookmarkExist = await Bookmark.findOne({
      user: userID,
      announcement: announcementID,
    });

    if (bookmarkExist) {
      await Bookmark.findOneAndDelete({
        user: userID,
        announcement: announcementID,
      });

      return res.send({ isBookmark: false });
    }

    await Bookmark.create({
      user: userID,
      announcement: announcementID,
    });

    res.status(200).send({ isBookmark: true });
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
