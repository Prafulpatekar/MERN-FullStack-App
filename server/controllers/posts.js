import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      like: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json({
      data: posts,
      message: "Updated posts list!",
    });
  } catch (err) {
    res.status(409);
    throw new Error(err.message);
  }
});

const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      data: posts,
      message: "Feed posts list!",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ userId });
    res.status(200).json({
      data: posts,
      message: "User Feed posts list!",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id; //post id
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = await post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json({
        data:updatePost,
        message:"Post Updated!"
    })
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

export { getFeedPosts, getUserPosts, likePost, createPost };
