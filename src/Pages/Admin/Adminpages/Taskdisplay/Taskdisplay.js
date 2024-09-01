import React, { useEffect, useState } from 'react';
import './Taskdisplay.css';

const Taskdisplay = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('./taskcheck.json')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="task-container">
            <button className="add-task-button">Add task</button>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task Title</th>
                        <th>Difficulty</th>
                        <th>Task time</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.difficulty}</td>
                            <td>{task.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Taskdisplay;
