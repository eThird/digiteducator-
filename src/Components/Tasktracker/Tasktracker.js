import React, { useEffect, useState } from 'react';
import './Tasktracker.css';
import { Link } from 'react-router-dom';  // Import Link for navigation

const Tasktracker = () => {
  const [tasks, setTasks] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');  // Renamed state variable

  useEffect(() => {
    fetch('/task.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setTasks(data.tasks);
        setCourseTitle(data.courseTitle);
        setCompanyLogo(data.companyLogo);  // Updated to companyLogo
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  if (tasks.length === 0) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="task-tracker">
      <div className="task-tracker-header">
        <img src={companyLogo} alt={courseTitle} className="company-logo" /> {/* Updated className */}
        <h2>{courseTitle}</h2>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div 
            key={task.id} 
            className={`task-item ${task.current ? 'current' : 'disabled'}`}
          >
            <div className="task-index">
              <div className={`circle ${task.current ? 'active' : ''}`}>
                {index + 1}
                
              </div>
            </div>
            <div className="task-content">
              <h4>Task {task.id}</h4>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className="difficulty">{task.difficulty}</span>
                <img src="/clock.png" alt="Time" className="clock-icon" />
                <span className="time">{task.time}</span>
              </div>
            </div>
            {index === tasks.length - 1 && (
              <div className="finish-icon">
                <img src="/finish-line.png" alt="Finish Line" />
              </div>
            )}
            {task.current && (
              <Link to={`/overview/${task.id}`} className="task-link">
                {/* Link will be disabled with CSS if task is not current */}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasktracker;
