import React, { useState, useEffect } from "react";
import './Assessment.css';

const Assessment = () => {
    const [data, setData] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Simulating fetching data from JSON
        fetch('./assessment.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIsUploaded(true); // Show the success message
        }
    };

    const handleUploadClick = () => {
        // Trigger the hidden file input on button click
        document.getElementById('file-upload').click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null); // Reset the file
        setIsUploaded(false); // Hide the success message
        document.getElementById('file-upload').value = ''; // Reset the file input
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Assessment-maincontainer">
            <div className="Assessment-overview">
                <h2>Assessment Overview</h2>
                <div className="overview-detail">
                    <p>{data.overview}</p>
                </div>
            </div>

            <div className="Assessment-Instructions">
                <h2>Instructions to do Assignment</h2>
                <div className="Instruction-detail">
                    <ol>
                        {data.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="Assessment-download-upload">
                <div className="Assessment-download-section">
                    <h2>Download Your Assignment here</h2>
                    <div className="download-here">
                        <img src="./download.png" alt="download icon" />
                        <h6>Click here to download</h6>
                    </div>
                </div>
                <div className="Assessment-upload-section">
                    <h2>Upload your Assignment here</h2>
                    <div className="Upload-here" onClick={handleUploadClick}>
                        <img src="./upload.png" alt="upload icon" />
                        <h6>Click here to Upload</h6>
                    </div>
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    {isUploaded && (
                        <div className="upload-success">
                            * Assignment has been uploaded successfully!
                        </div>
                    )}
                    {selectedFile && (
                        <div className="file-display">
                            <span className="file-name">{selectedFile.name}</span>
                            <span className="remove-file" onClick={handleRemoveFile}>×</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Assessment;
