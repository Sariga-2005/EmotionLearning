// src/components/Leaderboard.jsx
import { useState, useEffect } from "react";
import api from "../services/api";
import "./Dashboard.css";

export default function Leaderboard({ goBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/test/leaderboard");

      if (response.data.success) {
        setScores(response.data.scores || []);
      } else {
        setScores([]);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      setError("Failed to load leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🏅";
  };

  const currentUserId = localStorage.getItem("userId");

  // Loading State
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
          <div className="spinner"></div> {/* Ensure spinner class exists or replace */}
          <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>Loading rankings...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <button onClick={goBack} className="back-btn" style={{ marginBottom: "20px" }}>
          ⬅ Back to Home
        </button>
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
          <p style={{ color: "var(--accent)", fontSize: "18px", marginBottom: "20px" }}>{error}</p>
          <button className="glass-button" onClick={fetchLeaderboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button onClick={goBack} className="back-btn" style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
      </button>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px" }}>
          Leaderboard 🏆
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>
          Detailed rankings of top performers.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: "30px" }}>
        {scores.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>📊</div>
            <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "30px" }}>
              No scores recorded yet. Be the first to take the test!
            </p>
            <button
              className="glass-button"
              style={{ padding: "12px 30px", background: "var(--gradient-main)" }}
              onClick={goBack}
            >
              Take a Test Now
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Header Row */}
            <div style={{
              display: "flex",
              padding: "10px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
              fontSize: "14px",
              fontWeight: "600"
            }}>
              <div style={{ width: "50px" }}>Rank</div>
              <div style={{ flex: 1 }}>User</div>
              <div style={{ width: "100px", textAlign: "right" }}>Score</div>
              <div style={{ width: "80px", textAlign: "right" }}>%</div>
            </div>

            {scores.map((entry, index) => (
              <div
                key={entry.userId || index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "15px 20px",
                  borderRadius: "12px",
                  background: entry.userId === currentUserId
                    ? "rgba(108, 99, 255, 0.1)" // Highlight for current user
                    : "rgba(255, 255, 255, 0.03)",
                  border: entry.userId === currentUserId
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
                  transition: "transform 0.2s",
                }}
              >
                {/* Rank / Medal */}
                <div style={{ width: "50px", fontSize: "24px" }}>
                  {getMedalEmoji(index)}
                </div>

                {/* User Info */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--bg-dark)",
                    border: "1px solid var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px"
                  }}>
                    👤
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "var(--text-main)" }}>
                      {entry.name}
                      {entry.userId === currentUserId && (
                        <span style={{
                          marginLeft: "8px",
                          fontSize: "12px",
                          background: "var(--primary)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          color: "white"
                        }}>
                          YOU
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      Level 1 Explorer
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div style={{ width: "100px", textAlign: "right", fontWeight: "700", color: "var(--secondary)" }}>
                  {entry.score} <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>/ {entry.total}</span>
                </div>

                {/* Percentage */}
                <div style={{ width: "80px", textAlign: "right", fontWeight: "600" }}>
                  {Math.round(entry.percentage)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}