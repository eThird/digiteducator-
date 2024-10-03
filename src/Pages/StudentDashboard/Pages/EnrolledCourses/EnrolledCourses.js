import React, { useState, useEffect } from 'react';
import './EnrolledCourses.css'; // CSS file import
import ProgressBar from '@ramonak/react-progress-bar'; // You can use any progress bar package or create one yourself.

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage

            try {
                const response = await fetch('http://127.0.0.1:8000/api/enrolled-courses/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Use Bearer token for authentication
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled courses');
                }

                const data = await response.json();
                setCourses(data); // Set the fetched courses to state
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div className="enrolled-courses">
            <h2>Enrolled Courses</h2>
            {courses.length === 0 ? (
                <p>Please enroll in a course to view the content.</p>
            ) : (
                <div className="course-flex-container">
                    {courses.map((course, index) => (
                        <div key={index} className="enrolled-course-card">
                            <div className='enrolled-course-image'>
                                <img
                                    src={course.course_image} // Add image path
                                    alt={course.course_name}
                                    className="enrolled-course-image"
                                />
                            </div>
                            <h5>{course.course_name}</h5>
                            <p>By {course.instructor.instructor_name}</p>
                            <div className="course-progress">
                                <ProgressBar
                                    completed={course.progress} // Placeholder for actual progress if available
                                    bgColor="#2563EB" // Progress bar color
                                    height="4px"
                                    labelColor="transparent"
                                />
                            </div>
                            <div className="enrolled-course-rating">
                                <span className="stars">
                                    {/* Render rating stars */}
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <img key={i} src='./star.png' alt='rating icon' />
                                    ))}
                                </span>
                                <span>{course.total_ratings_count} Ratings</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
