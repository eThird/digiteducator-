import React, { useEffect, useState } from 'react';
import './CourseOverview.css';
import Taskdetail from '../../Components/Taskdetail/Taskdetail';
import Assessment from '../../Components/Assessment/Assessment';
import Studymaterial from '../../Components/Studymaterial/Studymaterial'
import QuizApp from '../../Components/Quiz/QuizApp';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';


const CourseOverview = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [activeSyllabusIndex, setActiveSyllabusIndex] = useState(0);
    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('Details'); // Set default tab to 'Details'
    const [tabContent, setTabContent] = useState(null);
    const [videoSrc, setVideoSrc] = useState('');
    const [selectedLectureId, setSelectedLectureId] = useState(null);
    const [openSyllabusIndex, setOpenSyllabusIndex] = useState(0);
    const [selectedLectureDescription, setSelectedLectureDescription] = useState('');
    const [completedLectures, setCompletedLectures] = useState(new Set()); // Track completed lectures
    const [quizzes, setQuizzes] = useState([]); // Store quizzes related to the selected syllabus
    const [studyMaterials, setStudyMaterials] = useState([]); // Store study materials related to the selected syllabus



    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourse(data);

                // Set the initial video source and description for the first lecture
                const firstLecture = data.syllabus[0]?.lectures[0];
                if (firstLecture) {
                    // Set the default video source and description
                    handleLectureClick(firstLecture);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleLectureClick = (lecture) => {
        setVideoSrc(lecture.video_file ? `http://127.0.0.1:8000${lecture.video_file}` : lecture.video_url);
        setSelectedLectureId(lecture.id);
        setSelectedLectureDescription(lecture.lecture_description || 'No video overview available.');

        // Update the completed lectures set
        setCompletedLectures(prev => new Set(prev).add(lecture.id));

        // Update the Taskdetail component with the selected lecture description
        setTabContent(<Taskdetail lectureDescription={lecture.lecture_description || 'No video overview available.'} tasks={course.syllabus} courseTitle={course.course_name} />);

        // Set the active tab to "Details" when a lecture is clicked
        setActiveTab('Details');
    };

    const toggleSyllabus = (index) => {
        if (openSyllabusIndex === index) {
            setOpenSyllabusIndex(-1);
        } else {
            setOpenSyllabusIndex(index);
            setActiveSyllabusIndex(index);
            handleSyllabusClick(course.syllabus[index].id); // Pass syllabus ID to fetch quiz
        }
    };


    const handleSyllabusClick = async (syllabusId) => {
        // Fetch quiz data related to the clicked syllabus
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/quiz/syllabus/${syllabusId}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const quizData = await response.json();

            // Check if quiz data is not empty before setting it
            if (quizData && quizData.length > 0) {
                setTabContent(<QuizApp quizData={quizData} />); // Pass quiz data to QuizApp
            } else {
                setTabContent(<div>No quiz available for this syllabus.</div>);
            }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            setTabContent(<div>Error fetching quiz data. Please try again later.</div>);
        }
    };


    const handleAssessmentClick = async (syllabusId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/assessment/syllabus/${syllabusId}/`);
            console.log(response)
            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from the response
                console.error('Error fetching assessment data:', errorText); // Log the error message
                throw new Error('Network response was not ok');
            }
            const assessmentData = await response.json();

            if (assessmentData && assessmentData.length > 0) {
                setTabContent(<Assessment assessmentData={assessmentData} />);
            } else {
                setTabContent(<div>No assessments available for this syllabus.</div>);
            }
        } catch (error) {
            console.error('Error fetching assessment data:', error);
            setTabContent(<div>Error fetching assessment data. Please try again later.</div>);
        }
    };


    const handleStudyMaterialClick = async (syllabusId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/study-material/syllabus/${syllabusId}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const materialData = await response.json();

            if (materialData && materialData.length > 0) {
                setTabContent(<Studymaterial materialData={materialData} />); // Pass the fetched data
            } else {
                setTabContent(<div>No study materials available for this syllabus.</div>);
            }
        } catch (error) {
            console.error('Error fetching study material data:', error);
            setTabContent(<div>Error fetching study material data. Please try again later.</div>);
        }
    };



    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Details') {
            setTabContent(<Taskdetail lectureDescription={selectedLectureDescription} tasks={course.syllabus} courseTitle={course.course_name} />);
        } else if (tab === 'Quiz') {
            if (course.syllabus[activeSyllabusIndex]) {
                handleSyllabusClick(course.syllabus[activeSyllabusIndex].id);
            } else {
                setTabContent(<div>No quiz available for this syllabus.</div>);
            }
        } else if (tab === 'Assessments') {
            if (course.syllabus[activeSyllabusIndex]) {
                handleAssessmentClick(course.syllabus[activeSyllabusIndex].id);
            } else {
                setTabContent(<div>No assessments available for this syllabus.</div>);
            }
        } else if (tab === 'Study Materials') {
            if (course.syllabus[activeSyllabusIndex]) {
                handleStudyMaterialClick(course.syllabus[activeSyllabusIndex].id); // Fetch study materials here
            } else {
                setTabContent(<div>No study materials available for this syllabus.</div>);
            }
        }
    };





    const formatLectureTime = (timeString) => {
        if (typeof timeString === 'string' && timeString.includes(':')) {
            const parts = timeString.split(':').map(Number);
            let hours = 0, minutes = 0, seconds = 0;

            if (parts.length === 3) {
                [hours, minutes, seconds] = parts;
            } else if (parts.length === 2) {
                [minutes, seconds] = parts;
            }

            const totalMinutes = hours * 60 + minutes;
            return `${totalMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        const totalSeconds = parseInt(timeString, 10);
        if (!isNaN(totalSeconds)) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        return '00:00';
    };

    // Calculate the completion percentage
    const totalLectures = course?.syllabus.reduce((acc, syllabus) => acc + syllabus.lectures.length, 0) || 0;
    const completedCount = completedLectures.size; // Number of completed lectures
    const completionPercentage = totalLectures > 0 ? (completedCount / totalLectures) * 100 : 0;

    // Set the initial tab content to show details of the first lecture after fetching course data
    useEffect(() => {
        if (course && course.syllabus.length > 0) {
            const firstLecture = course.syllabus[0].lectures[0];
            if (firstLecture) {
                setTabContent(<Taskdetail lectureDescription={firstLecture.lecture_description || 'No video overview available.'} tasks={course.syllabus} courseTitle={course.course_name} />);
            }
        }
    }, [course]);

    if (!course) {
        return <div>Loading course details...</div>;
    }

return (
        <div>
            <Navbar scrollToSection={() => {}} />
            <div className="courseoverview-maincontainer">
                <div className='courseoverview-leftcontainer'>
                    <div className="course-title-section">
                        <h3>
                            {course.course_name} &gt;{' '}
                            {course.syllabus && course.syllabus.length > 0 && activeSyllabusIndex < course.syllabus.length ? (
                                <span>{course.syllabus[activeSyllabusIndex]?.syllabus_name || 'No syllabus available'}</span>
                            ) : (
                                'No syllabus available'
                            )}
                        </h3>
                    </div>

                    <div className='video-section'>
                        {videoSrc ? (
                            <video
                                controls
                                className="about-video"
                                src={videoSrc}
                                onError={(e) => console.error("Video Error: ", e)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="no-video-message">
                                <p>No video available for this lecture.</p>
                            </div>
                        )}
                    </div>

                    {/* Tabs for Details, Quiz, Assignments, Study Materials */}
                    <div className='detailing-tabs'>
                        {['Details', 'Quiz', 'Assessments', 'Study Materials'].map(tab => (
                            <div
                                key={tab}
                                className={`description-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)} // Call handleTabClick
                            >
                                {tab}
                            </div>
                        ))}

                    </div>

                    <hr className="tabs-divider" />

                    {/* Display tab content */}
                    <div className='tabdetail-display'>
                        {tabContent}
                    </div>
                </div>

                {/* Sidebar with Syllabus and Lectures */}
                <div className="tasks-container">
                    {totalLectures > 0 && (
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${completionPercentage}%` }}>
                                <span className="progress-text">{Math.round(completionPercentage)}%</span>
                                <span className="remaining-text">{totalLectures - completedCount} lectures left</span>
                            </div>
                        </div>
                    )}

                    <div className="task-tracker">
                        <h2 className="course-title1">Course Completion</h2>
                        {course.syllabus && course.syllabus.length > 0 ? (
                            course.syllabus.map((syllabus, index) => (
                                <div key={index} className="section">
                                    <div className="section-header" onClick={() => toggleSyllabus(index)}>
                                        <img
                                            src="../down-arrow.png"
                                            alt="Toggle"
                                            className={`arrow-icon ${openSyllabusIndex === index ? 'open' : ''}`}
                                        />
                                        <h2 className="section-title">{syllabus.syllabus_name}</h2>
                                    </div>
                                    {openSyllabusIndex === index && (
                                        <div className="task-list">
                                            {syllabus.lectures.map((lecture) => (
                                                <div
                                                    key={lecture.id}
                                                    className="task-item"
                                                    onClick={() => handleLectureClick(lecture)}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        readOnly
                                                        checked={completedLectures.has(lecture.id)} // Check if this lecture is completed
                                                        className="checkbox"
                                                    />
                                                    <div className="task-content">
                                                        <span>{lecture.lecture_name}</span>
                                                        <div className="task-meta">
                                                            <img src="/video.png" alt="Video" className="video-icon" />
                                                            <span className="time">{formatLectureTime(lecture.lecture_time)} mins</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>No syllabuses available</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CourseOverview;