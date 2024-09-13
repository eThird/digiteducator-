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
                const response = await axios.get('http://your-django-backend-url/api/courses/'); // Replace with your Django API URL
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
                        <div className="course-category">{course.category}</div>
                        <img src={course.image} alt={course.title} className="course-image" />
                        <h3 className="course-title">{course.title}</h3>
                        <p className="course-instructor">by {course.instructor}</p>
                        <div className="course-info">
                            <span>{course.duration}</span>
                            <span>{course.students} Students</span>
                        </div>
                        <div className="course-price">
                            <span className={course.isDiscounted ? "discounted" : ""}>
                                {course.originalPrice}
                            </span>
                            <span className="current-price">{course.price}</span>
                        </div>
                        <button className="view-more-btn" onClick={() => handleCourseClick(course.id)}>View More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCourses;
