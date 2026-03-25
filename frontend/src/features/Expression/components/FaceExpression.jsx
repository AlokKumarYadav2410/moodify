import React, { useEffect, useRef, useState, memo } from "react";
import { detect, init } from "../utils/utils";
import { useTheme } from "../../shared/theme.context";
import "./FaceExpression.scss";

const FaceExpression = memo(({ onClick = () => {} }) => {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const { applyMoodTheme } = useTheme();

  const [expression, setExpression] = useState("neutral");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleClick = async () => {
    const detectedMood = await detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });
    onClick(detectedMood);
    applyMoodTheme(detectedMood);
  };

  return (
    <div className="face-expression-card glass-morphism">
      <div className="video-container">
        <video ref={videoRef} playsInline />
        <div className="scan-line"></div>
      </div>
      <div className="expression-info">
        <span className="current-mood">
          Mood:{" "}
          <span className={`mood-text ${expression}`}>
            {expression}{" "}
            {expression === "neutral"
              ? "😐"
              : expression === "happy"
                ? "😊"
                : expression === "sad"
                  ? "😔"
                  : expression === "angry"
                    ? "😠"
                    : expression === "surprised"
                      ? "😮"
                      : expression === "disgusted"
                        ? "🤢"
                        : expression === "fearful"
                          ? "😨"
                          : ""}
          </span>
        </span>
        <button className="detect-btn" onClick={handleClick}>
          Detect Mood
        </button>
      </div>
    </div>
  );
});

export default FaceExpression;
