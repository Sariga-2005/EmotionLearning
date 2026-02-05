import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Toggle Theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(curr => curr === 'dark' ? 'light' : 'dark');
  };

  // Get user info safely
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || localStorage.getItem('userName') || 'Friend';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <header className="glass-panel" style={{
      marginTop: '20px',
      padding: '12px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 100,
      background: 'var(--bg-card)',
      backdropFilter: 'blur(20px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'var(--gradient-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          boxShadow: '0 0 15px rgba(108, 99, 255, 0.4)'
        }}>
          ✨
        </div>
        <div>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '700',
            margin: 0,
            background: 'linear-gradient(to right, #6C63FF, #00F5D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            EmoteLearn
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Learning Emotions safely</span>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px',
            transition: 'transform 0.2s'
          }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-main)',
              fontSize: '16px'
            }}
          >
            <span style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontWeight: '600' }}>{userName}</span>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--secondary)' }}>Level 1 Explorer</span>
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--primary)'
            }}>
              👤
            </div>
          </button>

          {showProfile && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '120%',
              right: 0,
              width: '200px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(255, 101, 132, 0.15)',
                  color: '#FF6584',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
