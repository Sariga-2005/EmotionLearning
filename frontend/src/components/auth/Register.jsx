import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser(form);
      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
        maxWidth: '450px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>

        <h2 style={{
          fontSize: '32px',
          marginBottom: '10px',
          background: 'linear-gradient(to right, #fff, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Create Account</h2>

        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Join us and clear your path to emotional intelligence.
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

        {success && (
          <div style={{
            background: 'rgba(0, 245, 212, 0.1)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            color: '#00F5D4',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            className="glass-input"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={loading}
          />

          <input
            className="glass-input"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={loading}
          />

          <input
            className="glass-input"
            placeholder="Password (min 6 chars)"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            disabled={loading}
          />

          <input
            className="glass-input"
            placeholder="Age (optional)"
            type="number"
            min="3"
            max="18"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            disabled={loading}
          />

          <button
            type="submit"
            className="glass-button"
            disabled={loading}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div style={{ marginTop: '30px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
        </div>
      </div>
    </div>
  );
}