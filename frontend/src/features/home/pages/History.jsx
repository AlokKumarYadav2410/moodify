import React, { useEffect, useState } from "react";
import { historyApi } from "../services/api";
import Loader from "../../shared/components/Loader";
import "./History.scss";
import Modal from "../../shared/components/Modal";

const History = () => {
  const [historyGroups, setHistoryGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      const data = await historyApi.getHistory();
      const groups = data.history.reduce((acc, item) => {
        const date = new Date(item.createdAt).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {});
      setHistoryGroups(groups);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteItem = async (id) => {
    try {
      await historyApi.deleteHistory(id);
      fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearAll = async () => {
    try {
      await historyApi.clearHistory();
      setHistoryGroups({});
      setIsClearModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader text="Loading your journey..." />;

  return (
    <div className="history-page">
      <header className="page-header">
        <div className="title-section">
          <h1>
            Your <span className="highlight">Journey</span>
          </h1>
          <p>Relive your musical moods</p>
        </div>
        {Object.keys(historyGroups).length > 0 && (
          <button
            className="clear-btn"
            onClick={() => setIsClearModalOpen(true)}
          >
            Clear History
          </button>
        )}
      </header>

      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear History"
        size="small"
        footer={
          <>
            <button
              className="secondary"
              onClick={() => setIsClearModalOpen(false)}
            >
              Cancel
            </button>
            <button className="primary" onClick={handleClearAll}>
              Yes, Clear All
            </button>
          </>
        }
      >
        <p>
          This action will permanently delete all your mood history. Are you
          sure you want to proceed?
        </p>
      </Modal>

      <div className="history-container">
        {Object.keys(historyGroups).length === 0 ? (
          <div className="empty-state glass-morphism">
            <p>No history yet. Start detecting moods!</p>
          </div>
        ) : (
          Object.entries(historyGroups).map(([date, items]) => (
            <div key={date} className="history-group">
              <h2 className="date-header">{date}</h2>
              <div className="history-list">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className={`history-item glass-morphism mood-${item.mood}`}
                  >
                    <div className="item-main">
                      <div className="item-cover">
                        <img
                          src={
                            item.songId?.thumbnail || "/placeholder-song.png"
                          }
                          alt={item.songId?.title || "Unknown Song"}
                        />
                      </div>
                      <div className="item-info">
                        <div className="mood-tag">{item.mood}</div>
                        <h3>{item.songId?.title || "Unknown Song"}</h3>
                        <p className="time">
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
