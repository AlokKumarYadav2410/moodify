import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSongActions } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import { historyApi, songApi } from "../services/api";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import HistoryTimeline from "../components/HistoryTimeline";
import Loader from "../../shared/components/Loader";
import "./Home.scss";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();
  const { handleGetSong, setPlaylist } = useSongActions();
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await historyApi.getHistory();
      setHistory(data.history?.slice(0, 10) || []);
    } catch (error) {
      console.error("Fetch history error:", error);
    }
  }, []);

  const fetchRecommendations = useCallback(
    async (mood) => {
      try {
        const data = await songApi.getSong(mood);
        if (data.songs) {
          setRecommendations(data.songs);
          setPlaylist(data.songs);
        }
      } catch (error) {
        console.error("Fetch recommendations error:", error);
      }
    },
    [setPlaylist],
  );

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const onMoodDetected = useCallback(
    async (mood) => {
      setLoading(true);
      try {
        const newSong = await handleGetSong({ mood });
        if (newSong && newSong.success && newSong.song) {
          await historyApi.addHistory(newSong.song._id, mood);
          await fetchHistory();
          await fetchRecommendations(mood);
        } else {
          console.warn("No song found for mood:", mood);
        }
      } catch (error) {
        console.error("Mood detection handler error:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    },
    [handleGetSong, fetchHistory, fetchRecommendations],
  );

  const filteredRecommendations = useMemo(
    () =>
      recommendations.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [recommendations, searchTerm],
  );

  return (
    <div className="home-container">
      {loading && <Loader />}
      {/* <header className="home-header">
        <h1>
          Welcome, <span className="user-name">{user?.username || "User"}</span>
        </h1>
      </header> */}

      <div className="home-grid">
        <section className="grid-item mood-detection">
          <FaceExpression onClick={onMoodDetected} />
        </section>

        <section className="grid-item music-player">
          <Player />
        </section>

        <section className="grid-item mood-timeline">
          <HistoryTimeline history={history} />
        </section>

        <section className="grid-item song-recommendations glass-morphism">
          <div className="section-header">
            <h3>Recommended for you</h3>
            <div className="search-bar glass-morphism">
              <input
                type="text"
                placeholder="Search in recommendations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">
                <FaSearch />
              </span>
            </div>
          </div>
          <div className="recommendation-list scroll-container">
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((item) => (
                <div
                  key={item._id}
                  className="rec-item glass-morphism"
                  onClick={() =>
                    handleGetSong({ mood: item.mood, songId: item._id })
                  }
                >
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="rec-info">
                    <h4>{item.title}</h4>
                    <p>
                      {item.album} - {item.year}
                    </p>
                    <p>{item.mood}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="placeholder-text">
                {searchTerm
                  ? "No songs match your search."
                  : "Discover music based on your current mood!"}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
