import express from "express";
import upload from "../config/storage.js";
import {registerUser} from "../controllers/auth.js";

const router = express.Router();

router.post('/register',upload.single("picture"),registerUser)

export default router