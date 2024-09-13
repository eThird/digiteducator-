import React, { useState, useEffect } from 'react';
import './StudentFeedback.css';

const StudentFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

    useEffect(() => {
        // Fetch feedback data from Django backend
        fetch('http://localhost:8000/api/feedback/')
            .then(response => response.json())
            .then(data => setFeedbacks(data))
            .catch(error => console.error('Error fetching feedback:', error));
    }, []);

    useEffect(() => {
        if (feedbacks.length > 0) {
            const interval = setInterval(() => {
                setCurrentFeedbackIndex((prevIndex) => 
                    (prevIndex + 1) % feedbacks.length // Looping through feedbacks
                );
            }, 5000); // Change feedback every 5 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [feedbacks]);

    if (feedbacks.length === 0) return <div>Loading...</div>;

    const { name, country, feedback, photo } = feedbacks[currentFeedbackIndex];

    return (
        <div className="student-feedback">
            <h2>
                <span className="highlight">What</span> our students Say
            </h2>
            <p className="intro-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....</p>
            
            <div className="feedback-container">
                <div className="quote-icon">“</div>
                <div className="feedback-text">
                    <p>{feedback}</p>
                </div>
                <div className="student-info">
                    <img src={photo} alt={name} className="student-photo" />
                    <p className="student-name">{name}</p>
                    <p className="student-country">{country}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentFeedback;
