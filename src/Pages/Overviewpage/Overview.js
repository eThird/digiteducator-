import React, { useState, useEffect } from 'react';
import Pagination from '../../Components/Paginations/Pagination';
import TaskTracker from '../../Components/Tasktracker/Tasktracker'; 
import Navbar from '../../Components/Navbar/Navbar';
import './Overview.css';

const Overview = () => {
  const [tasks, setTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/task.json')
      .then(response => response.json())
      .then(data => {
        setTasks(data.tasks);
        setCurrentTask(data.tasks[0]);
      })
      .catch(error => console.error('Error fetching task data:', error));
  }, []);

  if (!tasks || !currentTask) {
    return <div>Loading...</div>;//
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 7 && !isSubmitted && currentPage === 6) {
      alert('Please submit your assignment before proceeding.');
      return;
    }

    // Handle movement from page 7 to the next task
    if (pageNumber === 7) {
      setCurrentPage(pageNumber);
    } else if (pageNumber > currentTask.pages.length) {
      const currentTaskIndex = tasks.findIndex(task => task.id === currentTask.id);
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTask(tasks[currentTaskIndex + 1]);
        setCurrentPage(1);
        setIsSubmitted(false);
      } else {
        setCurrentPage(8); // Page 8 will display the "Hurray! Course complete." message
      }
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    alert('Assignment submitted successfully!');
  };

  return (
    <div className="overview-page">
      <Navbar />
      <div className="overview-container">
        <div className="task-tracker">
          <TaskTracker tasks={tasks} currentTask={currentTask} />
        </div>
        <div className="task-detail">
          <div className="task-header">
            <h3>{currentPage === 8 ? "Course Complete" : `Task ${currentTask.id}: ${currentTask.title}`}</h3>
            {currentPage !== 8 && (
              <Pagination
                pages={currentTask.pages.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          <div className="task-content">
            {currentPage === 1 && (
              <div>
                <div className="learn">
                  <h2>What you'll learn</h2>
                  <ul>
                    {currentTask.pages[0].whatYouLearn.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="do">
                  <h2>What you'll do</h2>
                  <ul>
                    {currentTask.pages[0].whatYouDo.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {currentPage === 2 && (
              <div>
                <iframe
                  width="560"
                  height="315"
                  src={currentTask.pages[1].videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {currentPage === 3 && (
              <div>
                <h2>{currentTask.pages[2].title}</h2>
                <p>{currentTask.pages[2].content}</p>
              </div>
            )}
            {currentPage === 4 && (
              <div>
                <h2>{currentTask.pages[3].topicTitle}</h2>
                <p>{currentTask.pages[3].topicExplanation}</p>
              </div>
            )}
            {currentPage === 5 && (
              <div>
                <h2>{currentTask.pages[4].title}</h2>
                <p>{currentTask.pages[4].assignmentExplanation}</p>
              </div>
            )}
            {currentPage === 6 && (
              <div>
                <h2>{currentTask.pages[5].title}</h2>
                <p>{currentTask.pages[5].content}</p>
                <div className="assignment-download">
                  <a href={currentTask.pages[5].downloadLink} download>
                    <img src="/google-docs.png" alt="Google Docs Icon" />
                    <p>Click here to download Assignment</p>
                  </a>
                </div>
                <div className="resources-section">
                  <h3>{currentTask.pages[5].resourcesTitle}</h3>
                  <p>{currentTask.pages[5].resourcesContent}</p>
                  <h4>{currentTask.pages[5].usefulLinksTitle}</h4>
                  <ul>
                    {currentTask.pages[5].usefulLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="submission-section">
                  <h3>Your Submission</h3>
                  <div className="upload-section">
                    <form onSubmit={handleFileUpload}>
                      <label>
                        <p>Upload your Assignment here:</p>
                        <input type="file" accept=".pdf, .docx, .doc" required />
                      </label>
                      <button type="submit">Submit</button>
                    </form>
                    {isSubmitted && (
                      <p className="submission-message">Submission complete, great work!</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentPage === 7 && (
              <div>
                <h2>Nice work!</h2>
                <img src="/focus.png" alt="Focus Icon" className="focus-icon" />
              </div>
            )}
            {currentPage === 8 && (
              <div>
                <h2>Hurray! Course complete.</h2>
              </div>
            )}
          </div>
          <div className="pagination-controls">
            {currentPage > 1 && currentPage <= 7 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>Back</button>
            )}
            {currentPage < currentTask.pages.length && currentPage !== 7 && currentPage !== 8 && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
            {currentPage === 6 && isSubmitted && (
              <button onClick={() => handlePageChange(7)}>Next</button>
            )}
            {currentPage === 7 && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Go to next task</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
