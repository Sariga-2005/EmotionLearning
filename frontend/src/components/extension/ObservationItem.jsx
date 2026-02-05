import React from 'react';

// CONCEPT: Stateless Component
// This component solely accepts props and renders UI. It manages no internal state.
const ObservationItem = ({ data, index }) => {
    return (
        <div className="glass-panel" style={{
            padding: '15px',
            marginBottom: '15px',
            background: 'rgba(255,255,255,0.05)',
            borderLeft: `4px solid ${data.moodRating === 'positive' ? '#00F5D4' : data.moodRating === 'negative' ? '#FF6584' : '#F9C74F'}`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong style={{ fontSize: '18px' }}>{data.studentName}</strong>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>{new Date().toLocaleDateString()}</span>
            </div>

            <div style={{ fontSize: '14px', marginBottom: '5px', color: 'var(--text-muted)' }}>
                Observer: {data.observerEmail}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <span style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '12px'
                }}>
                    {data.interactionType.toUpperCase()}
                </span>
                <span style={{ fontSize: '14px' }}>
                    {data.moodRating === 'positive' ? '😃' : data.moodRating === 'negative' ? '😟' : '😐'}
                </span>
            </div>

            {data.notes && (
                <p style={{ fontStyle: 'italic', fontSize: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                    "{data.notes}"
                </p>
            )}
        </div>
    );
};

export default ObservationItem;
