import React from "react";
import './Studymaterial.css';

const Studymaterial = ({ materialData }) => {
    const handleDownload = (materialFilePath, materialFileName) => {
        if (!materialFilePath) {
            console.error('File path is undefined');
            return;
        }

        // Log the material file URL being accessed
        console.log('Downloading from:', materialFilePath);

        // Create a link and trigger the download
        const link = document.createElement('a');
        link.href = materialFilePath; // Use the correct file path
        link.download = materialFileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Log materialData to see its structure
    console.log('Material data:', materialData);

    return (
        <div className="Studymaterial-container">
            <div className="documents-container">
                <h2>All Available Study Materials are listed below:</h2>

                {/* Iterate over materialData */}
                {materialData && materialData.length > 0 ? (
                    materialData.map((doc) => (
                        <div
                            key={doc.id}
                            className="download-here"
                            onClick={() => handleDownload(doc.download_study_material, doc.study_material_name)} // Use the correct property names
                        >
                            <img src="../download.png" alt="download icon" className="download-icon" />
                            <h6>{doc.study_material_name} - Click here to download</h6>
                        </div>
                    ))
                ) : (
                    <div>No study materials available.</div>
                )}
            </div>
        </div>
    );
}

export default Studymaterial;
