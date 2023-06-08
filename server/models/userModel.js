import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add the first name"],
      min:2
    },
    lastName: {
      type: String,
      required: [true, "Please add the last name"],
      min:2
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique:[true, "Email address already taken"]
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
      max:6
    },
    picturePath: {
      type: String,
      default:"",
    },
    friends: {
      type: Array,
      default:[],
    },
    location: {
      type: String,
      default:"",
    },
    occupation: {
      type: String,
      default:"",
    },
    viewedProfile: {
      type: Number,
      default:"",
    },
    impressions: {
      type: Number,
      default:"",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User",userSchema);

export default User;