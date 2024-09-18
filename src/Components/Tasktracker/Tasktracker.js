import React, { useEffect, useState } from 'react';
import './Tasktracker.css';
import { Link } from 'react-router-dom';  // Import Link for navigation

const Tasktracker = () => {
  const [tasks, setTasks] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [sections, setSections] = useState([]);  // Initialize sections as an empty array

  useEffect(() => {
    fetch('/task.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks || []);  // Handle undefined tasks
        setCourseTitle(data.courseTitle || '');  // Handle undefined courseTitle
        setSections(data.sections || []);  // Handle undefined sections
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const toggleSection = (index) => {
    setSections(sections.map((section, i) => 
      i === index ? { ...section, open: !section.open } : section
    ));
  };

  return (
    <div className="task-tracker">
      <h2 className="course-title">{courseTitle}</h2>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="section">
            <div className="section-header" onClick={() => toggleSection(index)}>
              <img src="./down-arrow.png" alt="Toggle" className={`arrow-icon ${section.open ? 'open' : ''}`} />
              <h3>{section.title}</h3>
            </div>
            {section.open && (
              <div className="task-list">
                {section.tasks.map((task, i) => (
                  <div key={task.id} className={`task-item ${task.current ? 'current' : ''}`}>
                    <input type="checkbox" checked={task.completed} readOnly className="checkbox" />
                    <div className="task-content">
                      <span>{i + 1}. {task.title}</span>
                      <div className="task-meta">
                        <img src="/video.png" alt="Video" className="video-icon" />
                        <span className="time">{task.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Loading sections...</div>
      )}
    </div>
  );
};

export default Tasktracker;
