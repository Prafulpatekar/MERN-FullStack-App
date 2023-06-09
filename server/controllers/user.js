import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const getUser = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      res.status(400);
      throw new Error("Id is missing");
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      res.status(400);
      throw new Error("Invalid id: Not found");
    }
    const user = await User.findById(user_id);
    if (!user) {
      res.status(404);
      throw new Error(`User does not exists!`);
    }
    res.status(200).json({
      data: {
        user,
      },
      message: "User profile!",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const getFriends = asyncHandler(async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      res.status(400);
      throw new Error("Id is missing");
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      res.status(400);
      throw new Error("Invalid id: Not found");
    }
    const user = await User.findById(user_id);
    if (!user) {
      res.status(404);
      throw new Error(`User does not exists!`);
    }
    const friends = Promise.all(user.friends.map((id) => User.findById(id)));
    const formattedFriends = await friends.map(
      (_id, firstName, lastName, occupation, location, picturePath) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      data: { formattedFriends, user },
      message: "Friends list!",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const addRemoveFriends = asyncHandler(async (req, res) => {
  try {
    const { id, friendId } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Id is missing");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid id: Not found");
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error(`User does not exists!`);
    }
    if (!friendId) {
      res.status(400);
      throw new Error("Id is missing");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid id: Not found");
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      res.status(404);
      throw new Error(`Friend does not exists!`);
    }
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const formattedFriends = await friends.map(
      (_id, firstName, lastName, occupation, location, picturePath) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      data: { formattedFriends, user },
      message: "Friends list updated!",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});



export { getUser, getFriends, addRemoveFriends };
