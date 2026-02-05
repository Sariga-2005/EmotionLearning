// src/components/TestMode.jsx - IMPROVED VERSION
import { useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

// All available emotions with images
const allEmotions = [
  { label: "Happy", image: "/emotions/happy.png" },
  { label: "Sad", image: "/emotions/sad.png" },
  { label: "Cry", image: "/emotions/cry.png" },
  { label: "Angry", image: "/emotions/angry.png" },
  { label: "Fear", image: "/emotions/fear.png" },
  { label: "Excited", image: "/emotions/excited.png" },
  { label: "Surprised", image: "/emotions/surprised.png" },
  { label: "Confused", image: "/emotions/confused.png" },
  { label: "Calm", image: "/emotions/calm.png" },
  { label: "Shy", image: "/emotions/shy.png" },
  { label: "Proud", image: "/emotions/proud.png" },
  { label: "Love", image: "/emotions/love.png" }
];

// Shuffle array function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate random questions
const generateQuestions = () => {
  const shuffled = shuffleArray(allEmotions);
  const selectedEmotions = shuffled.slice(0, 8);

  return selectedEmotions.map(emotion => {
    const wrongOptions = allEmotions
      .filter(e => e.label !== emotion.label)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = shuffleArray([emotion, ...wrongOptions]);

    return {
      word: emotion.label,
      correct: emotion.label,
      correctImage: emotion.image,
      options: options
    };
  });
};

export default function TestMode({ goBack }) {
  const [questions] = useState(() => generateQuestions());
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleSelect = (choice) => {
    if (selected) return;

    setSelected(choice);

    if (choice.label === questions[current].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        finishTest();
      }
    }, 1000);
  };

  const finishTest = async () => {
    setFinished(true);
    setSaving(true);
    setSaveError(null);

    try {
      const userId = localStorage.getItem("userId");
      
      console.log("🔍 Debug Info:");
      console.log("- User ID from localStorage:", userId);
      console.log("- Score:", score);
      console.log("- Total Questions:", questions.length);
      
      if (!userId) {
        throw new Error("No user ID found. Please log in again.");
      }

      const payload = {
        userId: userId,
        score: score,
        total: questions.length
      };

      console.log("📤 Sending to API:", payload);

      const response = await api.post("/test/save", payload);

      console.log("✅ API Response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to save score");
      }

      console.log("🎉 Score saved successfully!");
      
    } catch (error) {
      console.error("❌ Failed to save score:", error);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to save score. Please try again.";
      
      setSaveError(errorMessage);
      
      // Show alert for critical errors
      if (errorMessage.includes("log in")) {
        alert(errorMessage);
      }
    } finally {
      setSaving(false);
    }
  };

  const retryUpload = async () => {
    setSaving(true);
    setSaveError(null);
    await finishTest();
  };

  if (finished) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <>
        <button onClick={goBack} className="back-btn">
          ← Back to Home
        </button>

        <div className="game-card">
          <h2>🎉 Test Completed!</h2>
          <p className="score-display">
            {score} / {questions.length}
          </p>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>
            {percentage === 100 && "🌟"}
            {percentage >= 70 && percentage < 100 && "👍"}
            {percentage >= 50 && percentage < 70 && "💪"}
            {percentage < 50 && "📚"}
          </div>
          <p style={{ fontSize: "18px", color: "#636e72", marginBottom: "20px" }}>
            {percentage === 100 && "Perfect score! Amazing! 🌟"}
            {percentage >= 70 && percentage < 100 && "Great job! Well done! 👍"}
            {percentage >= 50 && percentage < 70 && "Good effort! Keep it up! 💪"}
            {percentage < 50 && "Keep practicing! You'll get better! 📚"}
          </p>
          
          {saving && (
            <div>
              <div className="loading-spinner"></div>
              <p style={{ color: "#667eea", marginTop: "10px" }}>Saving your score...</p>
            </div>
          )}
          
          {!saving && !saveError && (
            <p style={{ color: "#26de81", fontSize: "16px", marginBottom: "20px" }}>
              ✓ Score saved to leaderboard!
            </p>
          )}
          
          {saveError && (
            <div style={{ 
              background: "rgba(255, 107, 157, 0.1)",
              border: "2px solid #ff6b9d",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "20px"
            }}>
              <p style={{ color: "#ff6b9d", fontSize: "16px", marginBottom: "10px" }}>
                ⚠️ {saveError}
              </p>
              <button 
                className="submit-btn" 
                onClick={retryUpload}
                style={{ 
                  marginTop: "10px",
                  background: "linear-gradient(135deg, #ff6b9d, #c44569)"
                }}
              >
                🔄 Retry Save
              </button>
            </div>
          )}
          
          <button 
            className="submit-btn" 
            onClick={goBack}
            disabled={saving}
          >
            {saving ? "Saving..." : "Back to Home"}
          </button>
        </div>
      </>
    );
  }

  const q = questions[current];

  return (
    <>
      <button onClick={goBack} className="back-btn">
        ← Back to Home
      </button>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ 
          fontFamily: "'Fredoka', sans-serif", 
          fontSize: "36px", 
          color: "white",
          textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          margin: "10px 0"
        }}>
          Emotion Test 📝
        </h2>
        <p style={{ 
          color: "rgba(255, 255, 255, 0.9)", 
          fontSize: "16px",
          fontWeight: 500
        }}>
          Question {current + 1} of {questions.length}
        </p>
      </div>

      <div className="game-card">
        <h2>Which emotion is:</h2>
        <h1 style={{ 
          marginBottom: "30px", 
          color: "#667eea", 
          fontSize: "48px",
          fontFamily: "'Fredoka', sans-serif"
        }}>
          "{q.word}"
        </h1>

        {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`
            }}
          ></div>
        </div>

        {/* OPTIONS - NO LABELS, JUST IMAGES */}
        <div className="emotion-grid">
          {q.options.map((opt, index) => {
            const isCorrect = opt.label === q.correct;
            const isSelected = selected?.label === opt.label;
            
            return (
              <div
                key={index}
                className={`emotion-card ${
                  isSelected
                    ? isCorrect
                      ? "active"
                      : "error"
                    : ""
                }`}
                onClick={() => handleSelect(opt)}
                style={{ 
                  pointerEvents: selected ? "none" : "auto",
                  border: isSelected && !isCorrect 
                    ? "3px solid #ff6b9d" 
                    : isSelected && isCorrect
                    ? "3px solid #26de81"
                    : "3px solid transparent",
                  cursor: selected ? "not-allowed" : "pointer"
                }}
              >
                <img
                  src={opt.image}
                  alt="emotion"
                  className="emotion-image"
                  style={{
                    filter: selected && !isCorrect && isSelected ? "grayscale(100%)" : "none"
                  }}
                />
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#636e72",
          fontSize: "16px",
          fontWeight: 500
        }}>
          <span>Current Score: {score} / {current + (selected ? 1 : 0)}</span>
          <span>{Math.round((score / (current + (selected ? 1 : 0))) * 100) || 0}% Correct</span>
        </div>
      </div>
    </>
  );
}