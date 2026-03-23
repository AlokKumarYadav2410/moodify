import favoriteModel from "../models/favorite.model.js";

export async function getFavorites(req, res) {
  try {
    const favorites = await favoriteModel
      .find({
        userId: req.user.id,
      })
      .populate("songId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Favorites fetched successfully",
      favorites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
      error: error.message,
    });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const { songId } = req.params;

    const existingFavorite = await favoriteModel.findOne({
      userId: req.user.id,
      songId,
    });

    if (existingFavorite) {
      // await favoriteModel.findByIdAndDelete(existingFavorite._id);
      await existingFavorite.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Favorite removed successfully",
      });
    }

    const favorite = await favoriteModel.create({
      userId: req.user.id,
      songId,
    });
    return res.status(201).json({
      success: true,
      message: "Favorite added successfully",
      favorite,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add favorite",
      error: error.message,
    });
  }
}
