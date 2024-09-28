import React from "react";
import './Quiz.css';

const Quiz = ({
    question,
    questionNumber,
    totalQuestions,
    options,
    selectedOption,
    correctOption,
    onSelectOption,
    onNext,
    onPrevious,
    previousDisabled,
    nextDisabled, // Disable Next button if no option is selected
    nextLabel,
    isAnswered,
    isQuizFinished,
    score,
    onCloseQuiz
}) => {
    if (isQuizFinished) {
        return (
            <div className="quiz-container">
                <h2>Quiz Finished!</h2>
                <p>Your total score is: {score} / {totalQuestions}</p>
                <button className="close-button" onClick={onCloseQuiz}>
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="question-container">
                <strong>Question {questionNumber}:</strong> {question}
            </div>
            <div className="options-container">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`option ${isAnswered ?
                            (option === correctOption ? 'correct' : option === selectedOption ? 'wrong' : '')
                            : ''}`}
                        onClick={() => !isAnswered && onSelectOption(option)} // Prevent changes after selecting
                    >
                        {option}
                    </div>
                ))}
            </div>
            <div className="navigation-buttons">
                {/* <button
                    className="nav-button"
                    onClick={onPrevious}
                    disabled={previousDisabled}
                >
                    Previous
                </button> */}
                <button className="nav-button" onClick={onNext} disabled={nextDisabled}>
                    {nextLabel}
                </button>
            </div>
            <div className="question-number-display">
                {questionNumber} / {totalQuestions}
            </div>
        </div>
    );
};

export default Quiz;