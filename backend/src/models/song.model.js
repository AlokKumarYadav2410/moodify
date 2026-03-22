import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "surprised", "neutral"],
      required: true,
    },
  },
  { timestamps: true },
);

const songModel = mongoose.model("songs", songSchema);

export default songModel;
