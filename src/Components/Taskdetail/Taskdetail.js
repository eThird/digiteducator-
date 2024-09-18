import React, { useEffect, useState } from "react";
import './Taskdetail.css';

const Taskdetail = () => {
    const [videoOverview, setVideoOverview] = useState('');
    const [keyLearning, setKeyLearning] = useState('');

    useEffect(() => {
        fetch('/taskdetails.json')
        .then(response => {
            console.log(response); // Add this line to check the response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const taskDetail = data[0] || {};
            setVideoOverview(taskDetail.videoOverview || ''); 
            setKeyLearning(taskDetail.keyLearning || ''); 
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="details">
            <div className="video-overview">
                <h3>Video Overview</h3>
                <p>{videoOverview}</p>
            </div>
            <div className="key-learnings">
                <h3>Key Learning Objectives</h3>
                <p>{keyLearning}</p>
            </div>
        </div>
    );
};

export default Taskdetail;
