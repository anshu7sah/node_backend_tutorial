import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: Number,
    isActive: { type: Boolean, default: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
