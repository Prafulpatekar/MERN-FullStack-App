import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please add the user"],
    },
    firstName: {
      type: String,
      required: [true, "Please add the last name"],
      min: 2,
    },
    lastName: {
      type: String,
      required: [true, "Please add the last name"],
      min: 2,
    },
    picturePath: {
      type: String,
      default: "",
    },
    userPicturePath: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
