import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import LearningMode from "./LearningMode";
import TestMode from "./TestMode";
import Leaderboard from "./Leaderboard";
import Contact from "./Contact";
import "./Dashboard.css";

export default function Dashboard() {
  const [view, setView] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    if (view === 'extension') {
      navigate('/extension');
    }
  }, [view, navigate]);

  return (
    <div className="dashboard-content">
      {/* PAGE CONTENT */}
      {view === "home" && <DashboardHome setView={setView} />}

      {view === "learn" && (
        <LearningMode goBack={() => setView("home")} />
      )}

      {view === "test" && (
        <TestMode goBack={() => setView("home")} />
      )}

      {view === "leaderboard" && (
        <Leaderboard goBack={() => setView("home")} />
      )}

      {view === "contact" && (
        <Contact goBack={() => setView("home")} />
      )}
    </div>
  );
}
