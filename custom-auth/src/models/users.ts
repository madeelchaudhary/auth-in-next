import mongoose from "mongoose";

interface UserType {
  email: string;
  password: string;
  fullName: string;
  isVerified: boolean;
  isAdmin: boolean;
  verifyToken?: string;
  resetToken?: string;
  verifyTokenExpiry?: Date;
  resetTokenExpiry?: Date;
  newsletter: boolean;
}

const userSchema = new mongoose.Schema<UserType>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  resetToken: String,
  verifyTokenExpiry: Date,
  resetTokenExpiry: Date,
  newsletter: {
    type: Boolean,
    default: false,
  },
});

export const User =
  (mongoose.models.users as unknown as mongoose.Model<UserType>) ||
  mongoose.model("users", userSchema);
