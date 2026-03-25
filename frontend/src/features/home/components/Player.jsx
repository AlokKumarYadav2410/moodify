import React, { useRef, useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useSong } from "../hooks/useSong";
import { useTheme } from "../../shared/theme.context";
import { favoriteApi } from "../services/api";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaHeart,
  FaVolumeUp,
  FaRedo,
  FaUndo,
} from "react-icons/fa";
import "./player.scss";

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Player = memo(() => {
  const song = useSelector((state) => state.song.currentSong);
  const { playNext, playPrevious } = useSong();
  const { theme } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedPopup, setShowSpeedPopup] = useState(false);

  const speeds = [0.5, 0.75, 1, 1.5, 2];

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.load();
      audioRef.current.playbackRate = playbackSpeed;
      if (song.autoPlay) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    }
  }, [song?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleToggleFavorite = async () => {
    if (!song) return;
    try {
      const res = await favoriteApi.toggleFavorite(song._id);
      setIsFavorite(res.isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song || !song._id)
    return (
      <div className="player-placeholder glass-morphism">
        <p>Your mood dictates the music. Start detecting now!</p>
      </div>
    );

  return (
    <div className="player-card glass-morphism">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => {
          setIsPlaying(false);
          playNext();
        }}
      />

      <div className="player-top">
        <div className="mood-badge">{song.mood}</div>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        >
          <FaHeart />
        </button>
      </div>

      <div className="song-info">
        <div className="cover-wrapper">
          <img src={song.thumbnail} alt={song.title} className="cover-image" />
        </div>
        <div className="meta">
          <h3 className="title">{song.title}</h3>
          <p className="info">
            {song.artist
              ? song.artist.length > 50
                ? song.artist.slice(0, 50) + "..."
                : song.artist
              : "Unknown Artist"}
          </p>
          <p className="info">
            {song.album
              ? song.album.length > 50
                ? song.album.slice(0, 50) + "..."
                : song.album
              : "Unknown Album"}{" "}
            - {song.year ? song.year : "Unknown Year"}
          </p>
        </div>
      </div>

      <div className="progress-section">
        <div className="time-info">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          className="progress-bar-container"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const val = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = val * duration;
          }}
        >
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="controls-section">
        <div className="speed-control-wrapper">
          <button
            className="control-btn speed"
            onClick={() => setShowSpeedPopup(!showSpeedPopup)}
          >
            {playbackSpeed}x
          </button>
          {showSpeedPopup && (
            <div className="speed-popup glass-morphism">
              {speeds.map((s) => (
                <button
                  key={s}
                  className={`speed-option ${playbackSpeed === s ? "active" : ""}`}
                  onClick={() => {
                    setPlaybackSpeed(s);
                    setShowSpeedPopup(false);
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="main-controls">
          <button className="control-btn" onClick={playPrevious}>
            <FaStepBackward />
          </button>
          <button
            className="control-btn skip"
            onClick={() => (audioRef.current.currentTime -= 5)}
          >
            <FaUndo />
          </button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="control-btn skip"
            onClick={() => (audioRef.current.currentTime += 5)}
          >
            <FaRedo />
          </button>
          <button className="control-btn" onClick={playNext}>
            <FaStepForward />
          </button>
        </div>

        <div className="volume-control">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              audioRef.current.volume = v;
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default Player;
