import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "nextjs",
    });

    console.log("MongoDB connected");

    return connection;
  } catch (error) {
    console.log(error, "mongo connection error");
  }
};
