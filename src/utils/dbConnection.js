import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URI;
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
