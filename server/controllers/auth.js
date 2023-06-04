import asyncHandler from "express-async-handler";


const registerUser = asyncHandler(async (req, res) => {
    // const { username, email, password } = req.body;
    // if (!username || !email || !password) {
    //   res.status(400);
    //   throw new Error("All fields are mandatory!");
    // }
    // const userAvailable = await User.findOne({ email });
    // if (userAvailable) {
    //   res.status(400);
    //   throw new Error("User already exists!");
    // }
    // const hashed = await bcrypt.hash(password, 11);
    // // console.log("Hashed password:", hashed);
    // const user = await User.create({ username, email, password: hashed });
    // if (user) {
    //   res.status(200).json({
    //     data: {
    //       _id: user.id,
    //       email: user.email,
    //     },
    //     message: "User has been registerd!",
    //   });
    // } else {
    //   res.status(400);
    //   throw new Error("User data is invalid!");
    // }
  });

export {registerUser};