import express from "express";
import upload from "../config/storage.js";
import {getUser,getFriends,addRemoveFriends} from "../controllers/user.js";
import validateToken from "../auth/validateTokenHandler.js";


const router = express.Router();

// router.get('/:id',upload.single("picture"),registerUser)
router.get('/:id',validateToken,getUser)
router.get('/:id/friends',validateToken,getFriends)
router.patch('/:id/friends/:friendId',validateToken,addRemoveFriends)

export default router