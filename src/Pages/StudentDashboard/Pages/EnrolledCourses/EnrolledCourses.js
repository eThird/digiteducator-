import React, { useState, useEffect } from 'react';
import './EnrolledCourses.css'; // CSS file import
import ProgressBar from '@ramonak/react-progress-bar'; // You can use any progress bar package or create one yourself.

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Load the data from the JSON file
        fetch('./enrolledCourses.json') // Adjust the path according to your setup
            .then((response) => response.json())
            .then((data) => setCourses(data.courses))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="enrolled-courses">
            <h2>Courses</h2>
            {courses.length === 0 ? (
                <p>Please enroll in a course to view the content.</p>
            ) : (
                <div className="course-flex-container">
                    {courses.map((course, index) => (
                        <div key={index} className="enrolled-course-card">
                            <div className='enrolled-course-image'><img
                                src={course.imageSrc} // Add image path
                                alt={course.title}
                                className="enrolled-course-image"
                            /></div>
                            <h5>{course.title}</h5>
                            <p>By {course.instructor}</p>
                            <div className="course-progress">
                                <ProgressBar
                                    completed={course.progress} // Progress from JSON
                                    bgColor="#2563EB" // Progress bar color
                                    height="4px"
                                    labelColor="transparent"
                                />
                            </div>
                            <div className="enrolled-course-rating">
                            <span className="stars">
                                <img src='./star.png' alt='rating icon'/>
                                <img src='./star.png' alt='rating icon'/>
                                <img src='./star.png' alt='rating icon'/>
                                <img src='./star.png' alt='rating icon'/>
                                <img src='./star.png' alt='rating icon'/>
                            </span>
                                <span>{course.ratings} Ratings</span>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;