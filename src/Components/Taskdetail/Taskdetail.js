import React from 'react';
import './Taskdetail.css';

const Taskdetail = ({ lectureDescription, tasks, courseTitle }) => {
    return (
        <div className="details">
            <div className="video-overview">
                <h3>Video Overview</h3>
                <p>{lectureDescription || 'No video overview available.'}</p>
            </div>
            <div className="key-learnings">
                <h3>Key Learning Objectives</h3>
                <p>{tasks.keyLearning || 'No key learning objectives available.'}</p>
            </div>
        </div>
    );
};

export default Taskdetail;
