import React, { useState, useEffect } from 'react';
import './Quiz.css'; // Make sure to import the CSS file

const QuizApp = ({ quizData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [quizClosed, setQuizClosed] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulating data fetch delay for example purposes
        setTimeout(() => {
            setLoading(false); // Data fetched, set loading to false
        }, 1000);
    }, []);

    // Ensure quizData is defined and has content
    const totalQuestions = quizData?.length || 0;
    const currentQuestion = totalQuestions > 0 ? quizData[currentIndex] : null;

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsAnswered(true);
        if (option === currentQuestion.correct_option) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setIsQuizFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    };

    const handleCloseQuiz = () => {
        setQuizClosed(true);
    };

    const nextDisabled = isAnswered ? false : true;
    const previousDisabled = currentIndex === 0;
    const nextLabel = isQuizFinished ? 'Finish Quiz' : 'Next';

    // Loading state to prevent rendering until data is ready
    if (loading) {
        return <div>Loading quiz...</div>;
    }

    // If quiz closed
    if (quizClosed) {
        return (
            <div className="quiz-closed-message">
                Well Done! You've Completed the Quiz!
            </div>
        );
    }

    // Calculate progress bar width
    const progressBarWidth = `${((currentIndex + 1) / totalQuestions) * 100}%`;

    return (
        <div className="quiz-container">
            {totalQuestions > 0 ? (
                !isQuizFinished ? (
                    <div>
                        <div className="question-number-display">
                            <h2 style={{ fontSize: '14px' }}>Question {currentIndex + 1}/{totalQuestions}</h2>
                            <div className="progress-bar" style={{ width: progressBarWidth }} />
                        </div>

                        <div className="question-container">
                            <p>{currentQuestion.question}</p>
                        </div>
                        <div className="options-container">
                            {/* Directly render options without <ul> and <li> */}
                            {Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 ? (
                                currentQuestion.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option ${isAnswered ? (option === currentQuestion.correct_option ? 'correct' : selectedOption === option ? 'wrong' : '') : ''}`}
                                        onClick={() => handleSelectOption(option)}>
                                        {option}
                                    </div>
                                ))
                            ) : (
                                <div>No options available for this question.</div>
                            )}

                        </div>
                        <div className="navigation-buttons">
                            {currentIndex > 0 && (
                                <button className="nav-button" onClick={handlePrevious} disabled={previousDisabled}>
                                    Previous
                                </button>
                            )}
                            <button className="nav-button" onClick={handleNext} disabled={nextDisabled} style={{ marginLeft: 'auto' }}>
                                {nextLabel}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Quiz Finished!</h2>
                        <p>Your final score is {score}/{totalQuestions}</p>
                        <button className="nav-button" onClick={handleCloseQuiz}>Close Quiz</button>
                    </div>
                )
            ) : (
                <div>No quiz available for this syllabus.</div>
            )}
        </div>
    );
};

export default QuizApp;
