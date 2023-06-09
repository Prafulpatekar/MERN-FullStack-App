import express from "express";
import upload from "../config/storage.js";
import {registerUser,login} from "../controllers/auth.js";

const router = express.Router();

router.post('/register',upload.single("picturePath"),registerUser)
router.post('/login',login)

export default router