import historyModel from "../models/history.model.js";

export async function addHistory(req, res) {
  try {
    const { songId, mood } = req.body;

    if (!songId || !mood) {
      return res.status(400).json({
        success: false,
        message: "Song ID and mood are required",
      });
    }

    const history = await historyModel.create({
      userId: req.user.id,
      songId: songId,
      mood,
    });
    return res.status(201).json({
      success: true,
      message: "History added successfully",
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add history",
      error: error.message,
    });
  }
}

export async function getHistory(req, res) {
  try {
    const history = await historyModel
      .find({ userId: req.user.id })
      .populate("songId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "History fetched successfully",
      history: history || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
      error: error.message,
    });
  }
}

export async function deleteHistory(req, res) {
  try {
    const { id } = req.params;
    const history = await historyModel.findByIdAndDelete(id);
    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "History deleted successfully",
      history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete history",
      error: error.message,
    });
  }
}

export async function clearHistory(req, res) {
  try {
    await historyModel.deleteMany({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      message: "History cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to clear history",
      error: error.message,
    });
  }
}
