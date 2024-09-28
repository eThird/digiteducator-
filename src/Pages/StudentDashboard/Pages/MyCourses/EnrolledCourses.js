import React, { useState, useEffect } from 'react';
import './EnrolledCourses.css'; // CSS file import

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
                <div className="course-grid">
                    {courses.map((course, index) => (
                        <div key={index} className="course-card">
                            <img
                                src={course.imageSrc} // Add image path
                                alt={course.title}
                                className="course-image"
                            />
                            <h3>{course.title}</h3>
                            <p>By {course.instructor}</p>
                            <div className="course-rating">
                                <span className="stars"><img src=''</span>
                                <span>({course.ratings} Ratings)</span>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
