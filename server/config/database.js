import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async (app) => {
  try {
    // MONGODB SETUP
    const PORT = process.env.PORT || 8000;
    const connect = await mongoose
      .connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server is running on port: ${PORT}`);
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
