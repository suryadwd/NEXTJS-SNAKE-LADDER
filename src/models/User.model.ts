import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  image:{
    type: String,
    default: "",
  },

  gamesPlayed: {
    type: Number,
    default: 0,
  },

  fastestWin:{
    type: Number,
    default: Infinity,
  }

},{timestamps: true});

// hot reload se bachne ke liye pahle or k kuch likha h
//it means refreshing the page again and again to automaticalyy update the code
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;