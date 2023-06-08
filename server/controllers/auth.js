import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import accessTokenGenrator from "../auth/token.js";

const registerUser = asyncHandler(async (req, res) => {
    const { firstName ,lastName , email, password, picturePath,friends,location ,occupation,viewedProfile,impressions} = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("firstName , lastName , Email and password fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error(`User with email ${email} already exists!`);
    }
    const hashed = await bcrypt.hash(password, 11);
    // console.log("Hashed password:", hashed);
    const user = await User.create({ firstName,lastName, email, password: hashed,picturePath,friends,location,occupation,viewedProfile,impressions });
    if (user) {
      res.status(200).json({
        data: {
          _id: user.id,
          email: user.email,
          firstName:user.firstName,
          lastName:user.lastName
        },
        message: "User has been registerd!",
      });
    } else {
      res.status(400);
      throw new Error("User data is invalid!");
    }
  });

export { registerUser };