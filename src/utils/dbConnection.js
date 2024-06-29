import mongoose from "mongoose";

const connectDB = async () => {
  const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URI;

  mongoose
    .connect(connectionUrl)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Database connection error ", error);
    });
};

export default connectDB;
