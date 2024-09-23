import React, { useState } from "react";
import Quiz from "./Quiz"; // Adjust the path as necessary
import quizData from "../Quiz/questions.json"; // Adjust the path as necessary

const QuizApp = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0); // Track user's score
    const [isQuizFinished, setIsQuizFinished] = useState(false); // Track if quiz is finished
    const [quizClosed, setQuizClosed] = useState(false); // Track if quiz is closed

    const currentQuestion = quizData[currentIndex];
    const correctOption = currentQuestion.correctOption;

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsAnswered(true); // Mark the question as answered
        if (option === correctOption) {
            setScore(score + 1); // Increment score if the correct answer is selected
        }
    };

    const handleNext = () => {
        if (selectedOption) {
            if (currentIndex < quizData.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null); // Reset for next question
                setIsAnswered(false);
            } else {
                setIsQuizFinished(true); // Mark quiz as finished
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(null); // Reset for previous question
            setIsAnswered(false);
        }
    };

    const handleCloseQuiz = () => {
        // Display message instead of resetting the quiz
        setQuizClosed(true);
    };

    const previousDisabled = currentIndex === 0;
    const nextLabel = currentIndex === quizData.length - 1 ? "Finish" : "Next";
    const nextDisabled = !selectedOption; // Disable Next button if no option is selected

    if (quizClosed) {
        return (
            <div className="quiz-container">
                <h2>Quiz is over. Please move to the next task.</h2>
            </div>
        );
    }

    return (
        <div>
            <Quiz 
                question={currentQuestion.question}
                questionNumber={currentIndex + 1} 
                totalQuestions={quizData.length}
                options={currentQuestion.options}
                selectedOption={selectedOption}
                correctOption={correctOption}
                onSelectOption={handleSelectOption}
                onNext={handleNext}
                onPrevious={handlePrevious}
                previousDisabled={previousDisabled}
                nextDisabled={nextDisabled} // Pass nextDisabled state
                nextLabel={nextLabel}
                isAnswered={isAnswered}
                isQuizFinished={isQuizFinished} // Pass quiz finished state
                score={score} // Pass the score to the component
                onCloseQuiz={handleCloseQuiz} // Pass close function to show message
            />
        </div>
    );
};

export default QuizApp;
