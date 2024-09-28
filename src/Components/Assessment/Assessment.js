import React, { useState, useEffect } from "react";
import './Assessment.css';

const AssessmentApp = ({ assessmentData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAssessmentFinished, setIsAssessmentFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [assessmentClosed, setAssessmentClosed] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const totalAssignments = assessmentData?.length || 0;
    const currentAssignment = totalAssignments > 0 ? assessmentData[currentIndex] : null;

    const handleNext = () => {
        if (currentIndex < totalAssignments - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsAssessmentFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleCloseAssessment = () => {
        setAssessmentClosed(true);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setError(null);
            await handleUploadAssignment(file); // Automatically upload the file after selection
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    const handleDownload = (assignmentFileUrl) => {
        const link = document.createElement("a");
        link.href = assignmentFileUrl;
        link.download = assignmentFileUrl.split('/').pop();
        link.click();
    };

    const handleUploadAssignment = async (file) => {
        const formData = new FormData();
        formData.append('submitted_assignment', file);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/upload-assignment/${currentAssignment.id}/`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setIsUploaded(true);
                setError(null);
                alert("File uploaded successfully!");
                setSelectedFile(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Error uploading file");
            }
        } catch (error) {
            setError("An error occurred during the upload");
        }
    };

    const handleUploadClick = () => {
        document.getElementById('file-upload').click(); // Trigger the file input click
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setIsUploaded(false);
        document.getElementById('file-upload').value = ''; // Clear the file input
    };

    if (loading) {
        return <div>Loading assessment...</div>;
    }

    if (assessmentClosed) {
        return (
            <div className="assessment-closed-message">
                Well Done! You've Completed the Assessment!
            </div>
        );
    }

    return (
        <div className="assessment-container">
            {totalAssignments > 0 ? (
                !isAssessmentFinished ? (
                    <div>
                        <div className="assignment-overview">
                            <h2>{currentAssignment.assignment_name}</h2>
                            <p>{currentAssignment.assignment_description}</p>
                        </div>

                        <div className="assignment-instructions">
                            <h2>Instructions to do Assignment</h2>
                            <ol className="instruction-list">
                                {Array.isArray(currentAssignment.assignment_instruction) ? (
                                    currentAssignment.assignment_instruction.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))
                                ) : (
                                    <li>{currentAssignment.assignment_instruction}</li>
                                )}
                            </ol>
                        </div>

                        <div className="assignment-download-upload">
                            <div className="assignment-card">
                                <div className="assignment-download-section">
                                    <h2>Download Your Assignment here</h2>
                                    <div
                                        className="download-here"
                                        onClick={() => handleDownload(`http://127.0.0.1:8000${currentAssignment.download_assignment}`)}
                                    >
                                        <img src="../download.png" alt="download icon" />
                                        <h6>Click here to download</h6>
                                    </div>
                                </div>

                                <div className="assignment-upload-section">
                                    <h2>Upload your Assignment here</h2>
                                    <div className="upload-here" onClick={handleUploadClick}>
                                        <img src="../upload.png" alt="upload icon" />
                                        <h6>Click here to Upload</h6>
                                    </div>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{ display: "none" }}
                                        accept="application/pdf"
                                        onChange={handleFileChange} // Automatically triggers upload after file selection
                                    />
                                    {isUploaded && (
                                        <div className="upload-success">
                                            * Assignment has been uploaded successfully!
                                        </div>
                                    )}
                                    {error && <div className="upload-error">{error}</div>}
                                    {selectedFile && (
                                        <div className="file-display">
                                            <span className="file-name">{selectedFile.name}</span>
                                            <span className="remove-file" onClick={handleRemoveFile}>×</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Assessment Finished!</h2>
                        <p>Well done for completing all assignments!</p>
                        <button className="nav-button" onClick={handleCloseAssessment}>Close Assessment</button>
                    </div>
                )
            ) : (
                <div>No assessment available for this syllabus.</div>
            )}
        </div>
    );
};

export default AssessmentApp;
