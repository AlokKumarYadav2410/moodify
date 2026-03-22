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
  },
  { timestamps: true },
);

const historyModel = mongoose.model("history", historySchema);

export default historyModel;
