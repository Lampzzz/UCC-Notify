import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import sendContact from "../utils/sendContact.js";

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    if (!user) {
      throw new Error("User not found.");
    }

    res.status(200).json({
      _id: user._id,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { username, newPassword, repeatPassword } = req.body;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;
  const errors = [];

  try {
    if (!user) {
      throw new Error("User not found");
    }

    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        errors.push({
          field: "username",
          message: "Username already exists",
        });
      }
    }

    if (newPassword && !passwordRegex.test(newPassword)) {
      errors.push({
        field: "newPassword",
        message: "Invalid password format",
      });
    }

    if (newPassword && newPassword != repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Password does not match",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.username = username || user.username;
    user.email = req.body.email || user.email;
    user.avatar = req.file ? req.file.filename : user.avatar;
    user.passwordHash = passwordHash || user.passwordHash;

    const updateUser = await user.save();

    res.status(200).json(updateUser);
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      throw new Error("User Delete Failed");
    }

    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

const sendMail = async (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;

  try {
    if (!fullName || !email || !phoneNumber || !message) {
      throw new Error("Please enter all required fields.");
    }

    const sender = {
      fullName,
      email,
      phoneNumber,
      message,
    };

    sendContact(sender);
    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

export { getCurrentUser, updateUserProfile, deleteUser, sendMail };
