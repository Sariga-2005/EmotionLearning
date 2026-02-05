# Emotion Learning & Expression System

## 📘 About the Use Case
The **Emotion Learning & Expression System** is a web-based application designed to help children with **Autism Spectrum Disorder (ASD)** recognize, learn, and express emotions in a simple and supportive way. The system uses clear visual emotion cards and voice assistance to reinforce emotional understanding and improve emotional vocabulary.

The interface is intentionally calm and sensory-friendly, with minimal distractions and predictable navigation to reduce cognitive overload. Children can explore emotions at their own pace and practice identifying them through structured matching activities with limited choices to maintain focus.

By recording learning interactions and test results, the system supports continuous emotional development in a safe, engaging, and confidence-building environment.

## 🎯 Purpose
Designed to support emotional understanding and expression in children with ASD through a calm, structured, and sensory-friendly digital environment.

*   **Sensory Regulation:** Soft color palettes, minimal animations, and controlled visual elements.
*   **Predictability & Safety:** Consistent layouts and simple navigation.
*   **Focused Emotional Learning:** One concept at a time using large, image-based cards.
*   **Accessible Communication Support:** Integrated voice assistance (Text-to-Speech).
*   **Self-Paced Development:** No time pressure on learning or tests.

## 🛠️ Technology Stack
*   **Frontend:** React.js (Vite), CSS Modules (Glassmorphism), Lucide-React Icons.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB (with Mongoose).
*   **Features:** Web Speech API, JWT Authentication, Custom Progress Tracking.

## 🚀 Key Features
1.  **Dashboard Navigation:** Central hub for Learning, Testing, and Leaderboard.
2.  **Emotion Learning Mode:** Interactive cards with voice feedback.
3.  **Test Mode:** Quiz module to evaluate understanding.
4.  **Leaderboard:** Live data display of user progress (Gamification).
5.  **Teacher Observation Log (Lab Extension):** A specialized form for teachers to log student behavior and mood observations.

## 📦 Lab Evaluation Extension
**Feature:** Teacher Observation Log
-   **Route:** `/extension`
-   **Description:** A feature allowing teachers/parents to log specific observations about a child's interaction.
-   **Components:**
    -   `ObservationForm.jsx` (Class Component)
    -   `ObservationItem.jsx` (Stateless Component)
    -   `ExtensionPage.jsx` (Functional Component)

## 🏃‍♂️ How to Run

### Prerequisites
-   Node.js installed
-   MongoDB running locally or Atlas URI

### 1. Backend
```bash
cd backend
npm install
npm run dev
# Server starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
# App runs on http://localhost:3000
```

---
**Course:** FULLSTACK FRAMEWORKS (23CSE461)
**Student:** Sarigasini M (CB.SC.U4CSE23065)
