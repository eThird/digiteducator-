import React from "react";
import './Quiz.css';

const Quiz = ({ question, options, onNext, onPrevious, previousDisabled }) => {
    return (
        <div className="quiz-container">
            <div className="question-container">{question}</div>
            <div className="options-container">
                {options.map((option, index) => (
                    <div key={index} className="option">
                        {option}
                    </div>
                ))}
            </div>
            <div className="navigation-buttons">
                <button 
                    className="nav-button" 
                    onClick={onPrevious} 
                    disabled={previousDisabled}
                >
                    Previous
                </button>
                <button className="nav-button" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

export default Quiz;
