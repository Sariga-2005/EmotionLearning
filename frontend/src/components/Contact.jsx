import React, { useState } from 'react';

const Contact = ({ goBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="glass-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
                    <h2 style={{ marginBottom: '15px' }}>Message Sent!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                        Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <button
                        className="glass-button"
                        onClick={goBack}
                        style={{ padding: '12px 30px' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <button
                onClick={goBack}
                className="back-btn"
                style={{ marginBottom: '20px' }}
            >
                ⬅ Back to Home
            </button>

            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Get in Touch 📬</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        We'd love to hear from you! Send us a message below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="glass-input"
                            placeholder="Friend"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="glass-input"
                            placeholder="friend@example.com"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="glass-input"
                            placeholder="How can we help you?"
                            style={{ width: '100%', resize: 'none' }}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="glass-button"
                        style={{
                            marginTop: '10px',
                            background: 'var(--gradient-main)',
                            fontSize: '18px',
                            padding: '15px'
                        }}
                    >
                        Send Message 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
