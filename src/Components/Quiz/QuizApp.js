import React, { useState } from "react";
import Quiz from "./Quiz"; // Adjust the path as necessary
import quizData from "../Quiz/questions.json"; // Adjust the path as necessary

const QuizApp = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const currentQuestion = quizData[currentIndex];
    const previousDisabled = currentIndex === 0; // Disable Previous on the first question

    return (
        <div>
            <Quiz 
                question={currentQuestion.question} 
                options={currentQuestion.options} 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
                previousDisabled={previousDisabled} // Pass the prop
            />
        </div>
    );
};

export default QuizApp;
