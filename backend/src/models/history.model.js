import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "songs",
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

const historyModel = mongoose.model("history", historySchema);

export default historyModel;
