import express from "express";
import upload from "../config/storage.js";
import {getFeedPosts,getUserPosts,likePost,createPost} from "../controllers/posts.js";
import validateToken from "../auth/validateTokenHandler.js";


const router = express.Router();

router.get('/',validateToken,getFeedPosts)
router.get('/:id',validateToken,getUserPosts)
router.patch('/:id/like',validateToken,likePost)
router.post('/',upload.single("picture"),validateToken,createPost)

export default router