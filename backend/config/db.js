import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pateld2253:2TymyfaggbMJfOYm@cluster0.y2qoxi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected");
  } catch (error) {
    console.error("error connecting to MONGODB");
  }
};
