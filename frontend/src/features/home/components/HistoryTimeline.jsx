import React from "react";
import "./HistoryTimeline.scss";

const HistoryTimeline = ({ history = [] }) => {
  return (
    <div className="history-timeline glass-morphism">
      <div className="timeline-header">
        <h3>Mood History</h3>
        <span className="live-indicator">● LIVE</span>
      </div>
      <p className="timeline-subtitle">Today's Timeline</p>
      <div className="timeline-items scroll-container">
        {history.length === 0 ? (
          <p className="no-data">No history yet</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className={`timeline-item mood-${item.mood}`}>
              <div className="mood-indicator"></div>
              <span className="mood-emoji">
                {item.mood === "happy" && "😊"}
                {item.mood === "sad" && "😔"}
                {item.mood === "neutral" && "😐"}
                {item.mood === "surprised" && "😲"}
              </span>
              <span className="mood-name">
                {item.mood ? item.mood.charAt(0).toUpperCase() + item.mood.slice(1) : "Unknown"}
              </span>
              <span className="mood-time">
                {item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) : "--:--"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryTimeline;
