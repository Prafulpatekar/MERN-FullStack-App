import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { users,posts } from "../data/demoData.js";

dotenv.config();

const dbConnection = async (app) => {
  try {
    // MONGODB SETUP
    const PORT = process.env.PORT || 8000;
    const connect = await mongoose
      .connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port: ${PORT}`);
          //Demo data
          // User.insertMany(users);
          // Post.insertMany(posts);
        });
      })
      .catch((err) => {
        console.log(`${err} not connect`);
        process.exit(1);
      });
    
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

export default dbConnection;
