import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";
import Errorhandler from "../middleware/error.js";

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({ success: true, message: "user logged out" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return next(new Errorhandler("User already Exists", 400));
    }

    // if (user) {
    //   res.status(404).json({ success: false, message: "User already Exists" });
    // }

    //creating  hashed password

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(res, user, "Registered Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new Errorhandler("Invaild Credentials", 400));
    }

    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Invaild Credentials" });
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invaild Credentials" });
    }

    sendCookie(res, user, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    console.log(error);
  }
};
