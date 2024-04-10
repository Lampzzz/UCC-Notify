import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import errorHandler from "../utils/errorHandler.js";

const register = async (req, res) => {
  let { username, email, password, confirmPassword } = req.body;

  username = username.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  try {
    const errors = [];
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (!username) {
      errors.push({
        field: "username",
        message: "Username is required",
      });
    }

    if (existingUsername) {
      errors.push({
        field: "username",
        message: "Username already exists",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    }

    if (existingEmail) {
      errors.push({
        field: "email",
        message: "Email already exists",
      });
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    } else if (!passwordRegex.test(password)) {
      errors.push({
        field: "password",
        message: "Invalid password format",
      });
    }

    if (!confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Confirm Password is required",
      });
    }

    if (password != confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Password does not match",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });

    res.status(201).send(newUser);
  } catch (err) {
    errorHandler(res, err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const errors = [];

    if (!username) {
      errors.push({
        field: "username",
        message: "Username is required",
      });
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      throw new Error("Wrong email or password");
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      throw new Error("Wrong email or password");
    }

    generateToken(res, existingUser._id, "token");

    res.status(200).json(existingUser);
  } catch (err) {
    errorHandler(res, err);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const errors = [];
    const user = await User.findOne({ email });

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    } else if (!user) {
      errors.push({
        field: "email",
        message: "User does not exist",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    generateToken(res, user._id, "resetToken", 5 * 60 * 1000);
    const link = `${process.env.BASE_URL}/reset-password`;

    await sendEmail(
      email,
      "Password Reset Link",
      `Click <a href=${link}>here<a/> to continue. Expired in 5 minutes.`
    );

    res.status(200).json({
      successMessage: "We've sent a password reset link to your email.",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, repeatPassword } = req.body;
  const token = req.cookies.resetToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  const errors = [];

  try {
    if (!user) {
      errors.push({
        field: "email",
        message: "User does not exist",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (!newPassword) {
      errors.push({
        field: "newPassword",
        message: "New Password is required",
      });
    } else if (!passwordRegex.test(newPassword)) {
      errors.push({
        field: "newPassword",
        message: "Invalid password format",
      });
    }

    if (!repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Repeat Password is required",
      });
    }

    if (newPassword != repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Password does not match",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);

    await user.save();

    // Clear the resetToken cookie after password reset
    res.clearCookie("resetToken").status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ isExpired: true });
    }
    errorHandler(res, err);
  }
};

export { register, login, logout, forgotPassword, resetPassword };
