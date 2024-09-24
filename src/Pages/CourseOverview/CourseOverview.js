import React, { useEffect, useState } from 'react';

import './CourseOverview.css';
import Taskdetail from '../../Components/Taskdetail/Taskdetail'; // Import Taskdetail
import QuizApp from '../../Components/Quiz/QuizApp';
import Assessment from '../../Components/Assessment/Assessment';

const CourseOverview = () => {
    const [tasks, setTasks] = useState([]);
    const [courseTitle, setCourseTitle] = useState('');
    const [sections, setSections] = useState([]); 
    const [activeTab, setActiveTab] = useState('Details'); // State to keep track of the active tab
    const [tabContent, setTabContent] = useState(''); // State to store tab content
    const [videoSrc, setVideoSrc] = useState(''); // State to store the video URL

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
                
                // Set the video URL from the first task in the first section
                if (data.sections.length > 0 && data.sections[0].tasks.length > 0) {
                    const firstTask = data.sections[0].tasks[0];
                    setVideoSrc(firstTask.video || ''); // Handle undefined video
                }
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const toggleSection = (index) => {
        setSections(sections.map((section, i) => 
          i === index ? { ...section, open: !section.open } : section
        ));
      };

    // Function to handle tab clicks
    const handleTabClick = (tab) => {
        setActiveTab(tab);

        switch (tab) {
            case 'Details':
                setTabContent(
                    // Rendering Taskdetail component when "Details" tab is clicked
                    <Taskdetail tasks={tasks} courseTitle={courseTitle} />
                );
                break;
            case 'Quiz':
                setTabContent(
                    <QuizApp/>
                );
                break;
            case 'Assignments':
                setTabContent(
                    <Assessment/>
                );
                break;
            case 'Study Materials':
                setTabContent('Study materials such as PDFs and links will be displayed here.');
                break;
            default:
                setTabContent('');
        }
    };

    return (
        <div className="courseoverview-maincontainer">
            <div className='courseoverview-leftcontainer'>
                <div>{sections.length > 0 && <h3>{sections[0].title}</h3>}</div>
            
                <div className='video-section'>
                    {videoSrc && (
                        <iframe 
                            className="about-video" 
                            src={videoSrc} 
                            title="About video" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    )}
                </div>

                <div className='detailing-tabs'>
                    {/* Tabs acting as buttons */}
                    <div 
                        className={`discription ${activeTab === 'Details' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Details')}>
                        Details
                    </div>
                    <div 
                        className={`discription ${activeTab === 'Quiz' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Quiz')}>
                
                        Quiz
                    </div>
                    <div 
                        className={`discription ${activeTab === 'Assignments' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Assignments')}>
                        Assignments
                    </div>
                    <div 
                        className={`discription ${activeTab === 'Study Materials' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Study Materials')}>
                        Study Materials
                    </div>
                </div>

                <div className='tabdetail-display'>
                    {/* Displaying the content based on the active tab */}
                    {tabContent}
                </div>
            </div>
            
            <div className="tasks-container">
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
            </div>
        </div>
    );
}

export default CourseOverview;
