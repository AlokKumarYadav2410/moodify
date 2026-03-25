import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: {
    _id: "69c282c3b39496792551458c",
    title: "Aakhir Tumhein Aana Hai",
    artist: "Pradeep Sahil, Amit Mishra, Sanjeev-Darshan",
    album: "Aakhir Tumhein Aana Hai",
    url: "https://ik.imagekit.io/subdev7op6/moodify/songs/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__Pv1pkU_ku.mp3",
    thumbnail: "https://ik.imagekit.io/subdev7op6/moodify/posters/Aakhir_Tumhein_Aana_Hai__From__From_Your_Humsafar____DOWNLOAD_MING__4J37QJyd8.jpeg",
    mood: "Welcome music",
    year: "2024",
    autoPlay: false,
  },
  playlist: [],
  loading: false,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    playNext: (state) => {
      if (state.playlist.length === 0) return;
      const currentIndex = state.playlist.findIndex(
        (s) => s._id === state.currentSong?._id,
      );
      const nextIndex = (currentIndex + 1) % state.playlist.length;
      state.currentSong = { ...state.playlist[nextIndex], autoPlay: true };
    },
    playPrevious: (state) => {
      if (state.playlist.length === 0) return;
      const currentIndex = state.playlist.findIndex(
        (s) => s._id === state.currentSong?._id,
      );
      const prevIndex =
        (currentIndex - 1 + state.playlist.length) % state.playlist.length;
      state.currentSong = { ...state.playlist[prevIndex], autoPlay: true };
    },
  },
});

export const { setSong, setPlaylist, setLoading, playNext, playPrevious } = songSlice.actions;

export default songSlice.reducer;
