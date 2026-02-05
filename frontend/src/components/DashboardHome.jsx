import React from 'react';

export default function DashboardHome({ setView }) {
  const userName = localStorage.getItem("userName") || "Friend";

  const cards = [
    {
      id: 'learn',
      title: 'Learn Emotions',
      icon: '😊',
      description: 'Explore and understand different feelings.',
      color: 'linear-gradient(135deg, #6C63FF 0%, #5a52d5 100%)'
    },
    {
      id: 'test',
      title: 'Take a Test',
      icon: '📝',
      description: 'Challenge yourself and earn points!',
      color: 'linear-gradient(135deg, #00F5D4 0%, #00b89f 100%)'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: '🏆',
      description: 'See how you compare with others.',
      color: 'linear-gradient(135deg, #FF6584 0%, #d63d5e 100%)'
    },
    {
      id: 'extension',
      title: 'Teacher Log',
      icon: '📋',
      description: 'Log observations (Extended Feature).',
      color: 'linear-gradient(135deg, #F9C74F 0%, #F9844A 100%)'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '36px',
          marginBottom: '10px',
          fontWeight: '700'
        }}>
          Hello, <span style={{
            background: 'var(--gradient-main)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>{userName}!</span> 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
          What would you like to explore today?
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Force 2 columns for perfect 2x2 alignment
        gap: '30px',
        padding: '0 20px',
        maxWidth: '900px', // Slightly reduced width for better centered look
        margin: '0 auto'
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="glass-panel"
            onClick={() => setView(card.id)}
            style={{
              padding: '50px 30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '350px', // Taller cards
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: card.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              marginBottom: '30px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>
              {card.icon}
            </div>

            <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>{card.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: 'auto' }}>
              {card.description}
            </p>

            <div style={{
              marginTop: '30px',
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 20px',
              borderRadius: '20px',
              color: 'var(--secondary)',
              fontWeight: '600',
              fontSize: '14px',
            }}>
              Start Now
            </div>
          </div>
        ))}
      </div>

      {/* Extra Content to "Extend Down" */}
      <div style={{
        maxWidth: '1000px',
        margin: '50px auto 20px',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px'
      }}>
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>🔥 Daily Streak</h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent)' }}>3 Days</div>
          <p style={{ color: 'var(--text-muted)' }}>Keep it up!</p>
        </div>
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>🌟 Total Points</h3>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary)' }}>1,250</div>
          <p style={{ color: 'var(--text-muted)' }}>You're doing great!</p>
        </div>
      </div>

      {/* About & Contact Section */}
      <div style={{
        maxWidth: '1000px',
        margin: '20px auto 60px',
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>About EmoteLearn</h2>
        <p style={{
          color: 'var(--text-muted)',
          maxWidth: '600px',
          margin: '0 auto 30px',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          EmoteLearn is a dedicated platform designed to help children understand, express, and manage their emotions through interactive games and lessons. Our mission is to build emotional intelligence in a fun and safe digital environment.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--secondary)' }}>10,000+</div>
            <div style={{ color: 'var(--text-muted)' }}>Happy Students</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--accent)' }}>50+</div>
            <div style={{ color: 'var(--text-muted)' }}>Schools Partnered</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary)' }}>4.9/5</div>
            <div style={{ color: 'var(--text-muted)' }}>Parent Rating</div>
          </div>
        </div>

        <button
          className="glass-button"
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            background: 'var(--gradient-main)',
            boxShadow: 'var(--shadow-glow)'
          }}
          onClick={() => setView('contact')}
        >
          📞 Contact Us
        </button>
      </div>
    </div>
  );
}