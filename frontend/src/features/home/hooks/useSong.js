import { useSelector, useDispatch } from "react-redux";
import { setSong, setPlaylist, setLoading, playNext, playPrevious } from "../song.slice";
import { songApi } from "../services/api";
import { useCallback } from "react";

// Hook for accessing song state only
export const useSongState = () => {
    const song = useSelector((state) => state.song.currentSong);
    const playlist = useSelector((state) => state.song.playlist);
    const loading = useSelector((state) => state.song.loading);
    return { song, playlist, loading };
};

// Hook for accessing song actions only (prevents re-renders for state-only consumers)
export const useSongActions = () => {
    const dispatch = useDispatch();

    const handleGetSong = useCallback(async ({ mood, songId }) => {
        dispatch(setLoading(true));
        try {
            const response = await songApi.getSong(mood);
            if (!response.songs || response.songs.length === 0) {
                return { success: false, message: "No songs found for this mood" };
            }

            let selectedSong = response.songs[0];
            if (songId) {
                selectedSong = response.songs.find((s) => s._id === songId) || response.songs[0];
            }

            const finalSong = { ...selectedSong, autoPlay: true };
            dispatch(setSong(finalSong));
            dispatch(setPlaylist(response.songs));

            return {
                success: true,
                message: response.message,
                song: finalSong,
            };
        } catch (error) {
            console.error("Error fetching song:", error);
            return { success: false, message: "Failed to fetch song" };
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return {
        handleGetSong,
        playNext: () => dispatch(playNext()),
        playPrevious: () => dispatch(playPrevious()),
        setPlaylist: (list) => dispatch(setPlaylist(list)),
    };
};

// Legacy compatibility hook (for backward compatibility if needed, but discouraged for performance)
export const useSong = () => {
    const { song, playlist, loading } = useSongState();
    const actions = useSongActions();
    return { song, playlist, loading, ...actions };
};
