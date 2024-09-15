import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedCourses.css';
import { useNavigate } from 'react-router-dom';

const FeaturedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courses/'); // Update with your Django API URL
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/courseDetail/${courseId}`);
    };

    const handleAllCoursesClick = () => {
        navigate('/courses');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading courses: {error.message}</p>;

    return (
        <div className="featured-courses">
            <div className="header">
                <h2>Featured Courses</h2>
                <button className="all-courses-btn" onClick={handleAllCoursesClick}>All Courses</button>
            </div>
            <p>Explore our Popular Courses</p>
            <div className="course-grid">
                {courses.map((course) => ( 
                    <div className="course-card" key={course.id}>
                        <div className="course-category">{course.category.category_name}</div>
                        <img src={course.course_image} alt={course.course_name} className="course-image" />
                        <h3 className="course-title">{course.course_name}</h3>
                        <p className="course-instructor">by {course.instructor.instructor_name}</p>
                        <div className="course-info">
                            <div className="course-info">
                                <span className="course-duration">
                                    <i className="fas fa-clock"></i>
                                    {course.course_duration}
                                </span>
                                <span className="students-count">
                                    <i className="fas fa-users"></i>
                                    {course.students_count} Students
                                </span>
                            </div>
                        </div>
                        <div className="course-price-container">
                            <button className="view-more-btn" onClick={() => handleCourseClick(course.id)}>View More</button>
                            <span className="original-price">{course.original_price}</span>
                            <span className="price">{course.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCourses;
