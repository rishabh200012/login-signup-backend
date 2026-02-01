import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("user", userSchema);
