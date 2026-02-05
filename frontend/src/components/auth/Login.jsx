import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      // Store user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userName", data.user.name);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧠</div>

        <h2 style={{
          fontSize: '32px',
          marginBottom: '10px',
          background: 'linear-gradient(to right, #fff, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Welcome Back!</h2>

        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Let's continue learning about emotions.
        </p>

        {error && (
          <div style={{
            background: 'rgba(255, 101, 132, 0.1)',
            border: '1px solid rgba(255, 101, 132, 0.3)',
            color: '#FF6584',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input
              className="glass-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className="glass-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="glass-button"
            disabled={loading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? "Logging in..." : "Start Learning"}
          </button>
        </form>

        <div style={{ marginTop: '30px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
}
