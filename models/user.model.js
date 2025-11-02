import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String, // ✅ Use uppercase String
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  isVerify: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    required: true
  },
  isNew: {
    type: Boolean,
    default: true
  },

}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
