// ============================================
// FILE: src/components/EmotionGame.jsx
// ============================================

import { useState } from "react";
import "./Dashboard.css";

const emotions = [
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


const speakEmotion = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

export default function EmotionGame({ showSubmit = true, onSubmit }) {
  const [selected, setSelected] = useState(null);

  const handleSelectEmotion = (emo) => {
    setSelected(emo);
    speakEmotion(emo.label);
  };

  const submitEmotion = () => {
    if (selected && onSubmit) {
      onSubmit(selected);
    } else if (selected) {
      alert(`Emotion submitted: ${selected.label}`);
    }
  };

  return (
    <div className="game-card">
      <h2>How are you feeling? 💭</h2>
      <p>Tap an emotion to hear it and select</p>

      <div className="emotion-grid">
        {emotions.map((emo) => (
          <div
            key={emo.label}
            className={`emotion-card ${
              selected?.label === emo.label ? "active" : ""
            }`}
            onClick={() => handleSelectEmotion(emo)}
          >
<img
  src={emo.image}
  alt={emo.label}
  className="emotion-image"
/>
            <p>{emo.label}</p>
          </div>
        ))}
      </div>

      {showSubmit && (
        <button
          className="submit-btn"
          disabled={!selected}
          onClick={submitEmotion}
        >
          {selected ? `Submit: ${selected.label}` : "Select an Emotion"}
        </button>
      )}
    </div>
  );
}