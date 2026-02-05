import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ObservationForm from './ObservationForm';
import ObservationItem from './ObservationItem';

// CONCEPT: Function Component
const ExtensionPage = () => {
    const navigate = useNavigate();

    // CONCEPT: State Management (using Hooks)
    const [observations, setObservations] = useState([]);

    // Handler to receive data from Child Class Component
    const handleFormSubmit = (newData) => {
        setObservations([newData, ...observations]);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/dashboard')}
                className="back-btn"
                style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                ⬅ Back to Dashboard
            </button>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: '32px',
                    background: 'var(--gradient-main)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '10px'
                }}>
                    Teacher Observation Log
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    Extended Feature: Track student behavior and emotional progress.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                {/* Left Column: Form */}
                <div>
                    <ObservationForm onSubmit={handleFormSubmit} />
                </div>

                {/* Right Column: List of items */}
                <div>
                    <h3 style={{ marginBottom: '20px' }}>📋 Recent Logs ({observations.length})</h3>

                    {observations.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No observations recorded yet.
                        </div>
                    ) : (
                        observations.map((obs, index) => (
                            // Using the Stateless Component here
                            <ObservationItem key={index} data={obs} index={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExtensionPage;
