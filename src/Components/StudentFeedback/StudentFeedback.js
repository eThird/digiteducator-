import React, { useState, useEffect } from 'react';
import './StudentFeedback.css';
import feedbackData from './feedback.json'; // Assuming feedback.json is in the same folder

const StudentFeedback = () => {
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeedbackIndex((prevIndex) => 
                (prevIndex + 1) % feedbackData.length // Looping through feedbacks
            );
        }, 5000); // Change feedback every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const { name, country, feedback, photo } = feedbackData[currentFeedbackIndex];

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