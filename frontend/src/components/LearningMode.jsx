import EmotionGame from "./EmotionGame";
import "./Dashboard.css";

export default function LearningMode({ goBack }) {
  return (
    <>
      <button onClick={goBack} className="back-btn">
        ⬅ Back to Home
      </button>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: "36px",
          color: "white",
          textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          margin: "10px 0"
        }}>
          Learn Emotions 🎧
        </h2>
        <p style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: "16px",
          fontWeight: 500
        }}>
          Tap any emoji to hear and learn about the emotion
        </p>
      </div>

      <EmotionGame showSubmit={false} />
    </>
  );
}