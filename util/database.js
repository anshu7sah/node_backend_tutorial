import mongoose from "mongoose";

export const mongoConnection = async () => {
  const mongoUri = process.env.MONGO_URI;

  await mongoose.connect(mongoUri);
};
