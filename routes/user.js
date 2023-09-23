import express from "express";
import {  getMyProfile, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/me",isAuthenticated, getMyProfile);

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);




export default router;
