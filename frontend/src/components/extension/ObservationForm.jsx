import React, { Component } from 'react';
import '../Dashboard.css';

// CONCEPT: Class Component
// This component demonstrates a React Class Component with state and lifecycle methods
class ObservationForm extends Component {

    // CONCEPT: Event Handling (Constructor binding implied or arrow functions)
    constructor(props) {
        super(props);
        // CONCEPT: State Management (Initial State)
        this.state = {
            studentName: '',
            observerEmail: '',
            interactionType: 'learning',
            moodRating: 'neutral',
            notes: '',
            errors: {}
        };
    }

    // CONCEPT: Event Handling (onChange)
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        // Clear error when user types
        if (this.state.errors[name]) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    [name]: ''
                }
            }));
        }
    };

    // CONCEPT: Forms (Validation & Submission)
    handleSubmit = (e) => {
        e.preventDefault(); // CONCEPT: Event Handling (onSubmit)

        if (this.validateForm()) {
            // Pass data to parent
            this.props.onSubmit(this.state);
            // Reset form
            this.setState({
                studentName: '',
                observerEmail: '',
                interactionType: 'learning',
                moodRating: 'neutral',
                notes: '',
                errors: {}
            });
            alert("Observation Logged Successfully!");
        }
    };

    validateForm = () => {
        const { studentName, observerEmail } = this.state;
        let errors = {};
        let isValid = true;

        if (!studentName.trim()) {
            errors.studentName = "Student name is required";
            isValid = false;
        }

        if (!observerEmail.trim()) {
            errors.observerEmail = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(observerEmail)) {
            errors.observerEmail = "Email is invalid";
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    render() {
        const { studentName, observerEmail, interactionType, moodRating, notes, errors } = this.state;

        return (
            <div className="glass-panel" style={{ padding: '30px', marginTop: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>📝 New Observation Log</h3>

                <form onSubmit={this.handleSubmit}>

                    {/* CONCEPT: Forms (Text Input) */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Student Name:</label>
                        <input
                            type="text"
                            name="studentName"
                            value={studentName}
                            onChange={this.handleChange}
                            className="glass-input"
                            style={{ width: '100%' }}
                            placeholder="Enter student's name"
                        />
                        {errors.studentName && <span style={{ color: '#ff6b6b', fontSize: '12px' }}>{errors.studentName}</span>}
                    </div>

                    {/* CONCEPT: Forms (Email Input) */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Observer Email:</label>
                        <input
                            type="email"
                            name="observerEmail"
                            value={observerEmail}
                            onChange={this.handleChange}
                            className="glass-input"
                            style={{ width: '100%' }}
                            placeholder="teacher@school.com"
                        />
                        {errors.observerEmail && <span style={{ color: '#ff6b6b', fontSize: '12px' }}>{errors.observerEmail}</span>}
                    </div>

                    {/* CONCEPT: Forms (Select Dropdown) */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Interaction Context:</label>
                        <select
                            name="interactionType"
                            value={interactionType}
                            onChange={this.handleChange}
                            className="glass-input"
                            style={{ width: '100%', cursor: 'pointer' }}
                        >
                            <option value="learning">Learning Session</option>
                            <option value="playtime">Free Play</option>
                            <option value="test">Assessment</option>
                            <option value="social">Social Interaction</option>
                        </select>
                    </div>

                    {/* CONCEPT: Forms (Radio Buttons) */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Observed Mood:</label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="moodRating"
                                    value="positive"
                                    checked={moodRating === 'positive'}
                                    onChange={this.handleChange}
                                /> 😃 Positive
                            </label>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="moodRating"
                                    value="neutral"
                                    checked={moodRating === 'neutral'}
                                    onChange={this.handleChange}
                                /> 😐 Neutral
                            </label>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="moodRating"
                                    value="negative"
                                    checked={moodRating === 'negative'}
                                    onChange={this.handleChange}
                                /> 😟 Negative
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Detailed Notes:</label>
                        <textarea
                            name="notes"
                            value={notes}
                            onChange={this.handleChange}
                            className="glass-input"
                            style={{ width: '100%', height: '80px', resize: 'none' }}
                            placeholder="Any specific behaviors..."
                        />
                    </div>

                    <button type="submit" className="glass-button" style={{ width: '100%', padding: '12px' }}>
                        Submit Log
                    </button>
                </form>
            </div>
        );
    }
}

export default ObservationForm;
