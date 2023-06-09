import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import accessTokenGenrator from "../auth/token.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error(
        "firstName , lastName , Email and password fields are mandatory!"
      );
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error(`User with email ${email} already exists!`);
    }
    const salt = await bcrypt.genSalt();
    // const hashed = await bcrypt.hash(password, 11); //Old Method
    const hashed = await bcrypt.hash(password, salt);
    // console.log("Hashed password:", hashed);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    if (user) {
      res.status(201).json({
        data: {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        message: "User has been registerd!",
      });
    } else {
      res.status(400);
      throw new Error("User data is invalid!");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({ message: "User does not exists!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Invalid Password!" });
    const token = await accessTokenGenrator(user);
    delete user.password;
    res.status(200).json({
      token,
      user,
      message:"Logged in successfully"
    })
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

export { registerUser, login };
