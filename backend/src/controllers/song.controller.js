import id3 from "node-id3";
import uploadFile from "../services/storage.service.js";
import songModel from "../models/song.model.js";

export async function uploadSong(req, res) {
  try {
    const { mood } = req.body;
    const songBuffer = req.file.buffer;
    const tags = id3.read(songBuffer);

    const [songFile, thumbnail] = await Promise.all([
      uploadFile({
        buffer: songBuffer,
        filename: tags.title + ".mp3",
        folder: "moodify/songs",
      }),
      uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "moodify/posters",
      }),
    ]);

    console.log(tags);

    const song = await songModel.create({
      url: songFile.url,
      title: tags.title,
      artist: tags.artist,
      album: tags.album,
      year: tags.year,
      genre: tags.genre,
      thumbnail: thumbnail.url,
      mood,
    });

    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      data: song,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload song",
      error: error.message,
    });
  }
}
