import React, { useState, useEffect } from 'react';
import './Addtask.css';

const Addtask = ({ taskId, onSave, onDelete }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [timeToComplete, setTimeToComplete] = useState('');

    // Fetch the task data from the backend if a taskId is provided
    useEffect(() => {
        if (taskId) {
            // connect backend: Fetch task data from Django backend
            fetch(`/api/tasks/${taskId}/`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title || '');
                    setDescription(data.description || '');
                    setDifficulty(data.difficulty || 'Beginner');
                    setTimeToComplete(data.timeToComplete || '');
                })
                .catch(error => console.error('Error fetching task data:', error));
        }
    }, [taskId]);

    const handleSave = () => {
        const task = {
            title,
            description,
            difficulty,
            timeToComplete
        };

        if (taskId) {
            // connect backend: Update task data in Django backend
            fetch(`/api/tasks/${taskId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
            .then(response => response.json())
            .then(data => {
                onSave(data);  // Notify parent component that the save was successful
            })
            .catch(error => console.error('Error saving task:', error));
        } else {
            // connect backend: Create new task in Django backend
            fetch('/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
            .then(response => response.json())
            .then(data => {
                onSave(data);  // Notify parent component that the save was successful
            })
            .catch(error => console.error('Error creating task:', error));
        }
    };

    const handleDelete = () => {
        if (taskId) {
            // connect backend: Delete task from Django backend
            fetch(`/api/tasks/${taskId}/`, {
                method: 'DELETE',
            })
            .then(() => {
                onDelete();  // Notify parent component that the delete was successful
            })
            .catch(error => console.error('Error deleting task:', error));
        }
    };

    const difficultyStyles = {
        Beginner: { color: 'green' },
        Intermediate: { color: 'Blue' },
        Advanced: { color: 'red' }
    };

    return (
        <div className="add-task-container">
            <div className="task-header">
                <button className="back-button">{'<'}</button>
                <h2>Enter Task</h2>
            </div>
            <div className="task-details">
                <div className="task-section">
                    <h3>Task</h3>
                    <p>Enter here basic task details</p>
                </div>
                <div className="task-fields">
                    <div className="task-left">
                        <div className="task-input">
                            <label>Title</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                        <div className="task-input">
                            <label>Description</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="task-right">
                        <div className="task-input">
                            <label>Difficulty</label>
                            <select 
                                value={difficulty} 
                                onChange={(e) => setDifficulty(e.target.value)}
                                style={difficultyStyles[difficulty]}
                            >
                              <option value="Beginner" style={{color: 'green'}}>Beginner</option>
                                <option value="Intermediate" style={{color: 'Blue'}}>Intermediate</option>
                                <option value="Advanced" style={{color: 'red'}}>Advanced</option>
                            </select>
                        </div>
                        <div className="task-input">
                            <label>Time takes to complete task</label>
                            <input 
                                type="text" 
                                value={timeToComplete} 
                                onChange={(e) => setTimeToComplete(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="task-actions">
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="save-button" onClick={handleSave}>Save Task</button>
                </div>
            </div>
        </div>
    );
};

export default Addtask;
