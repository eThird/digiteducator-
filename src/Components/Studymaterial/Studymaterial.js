import React from "react";
import './Studymaterial.css';

const documents = [
    { id: 1, name: "Document 1", src: "./document1.pdf" },
    { id: 2, name: "Document 2", src: "./document2.pdf" },
    { id: 3, name: "Document 3", src: "./document3.pdf" },
    { id: 4, name: "Document 4", src: "./document4.pdf" },
];

const Studymaterial = () => {
    return (
        <div className="Studymaterial-container">
            <h2>All Available Study Material are listed below</h2>
            <div className="documents-container">
                {documents.map(doc => (
                    <div className="documents" key={doc.id}>
                        <h6>{doc.name}</h6>
                        <a href={doc.src} download>
                            <img src="./download2.png" alt="download-icon" className="download-icon" />
                            <span className="tooltip">Click here to download</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Studymaterial;
