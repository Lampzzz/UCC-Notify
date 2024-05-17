import Announcement from "../models/announcementModel.js";
import errorHandler from "../utils/errorHandler.js";

export const createAnnouncement = async (req, res) => {
  const { title, content, types, categories, author } = req.body;
  const image = req.file ? req.file.filename : "";

  try {
    const errors = [];

    if (!title) {
      errors.push({
        field: "title",
        message: "Title is required",
      });
    }

    if (!content) {
      errors.push({
        field: "content",
        message: "Content is required",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newAnnouncement = await Announcement.create({
      image,
      title,
      content,
      author,
      types,
      categories,
    });

    res.status(201).send(newAnnouncement);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const getAllAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const getAnnouncement = async (req, res) => {
  const announcementID = req.params.id;

  try {
    const announcement = await Announcement.findById(announcementID);

    if (!announcement) {
      throw new Error("Announcement not found");
    }

    res.status(200).json(announcement);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const updateAnnouncement = async (req, res) => {
  const { announcementID } = req.params;

  try {
    const { title, content, types, categories, author } = req.body;

    const announcement = await Announcement.findById(announcementID);

    announcement.image = req.file ? req.file.filename : announcement.image;
    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;
    announcement.types = types || announcement.types;
    announcement.categories = categories || announcement.categories;
    announcement.author = author || announcement.author;

    const updatedAnnouncement = await announcement.save();

    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    errorHandler(res, err);
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { announcementID } = req.params;

  try {
    await Announcement.findByIdAndDelete(announcementID);
    res.status(200).json("Delete Successfully");
  } catch (err) {
    errorHandler(res, err);
  }
};
