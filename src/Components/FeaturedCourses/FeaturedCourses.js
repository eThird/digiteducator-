import React from 'react';
import './FeaturedCourses.css';
import courses from './course.json'; // Assuming course.json is in the same folder
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const FeaturedCourses = () => {
    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/courseDetail/${courseId}`);
    };

    const handleAllCoursesClick = () => {
        navigate('/courses');
    };

    return (
        <div className="featured-courses">
            <div className="header">
                <h2>Featured Courses</h2>
                <button className="all-courses-btn" onClick={handleAllCoursesClick}>All Courses</button>
            </div>
            <p>Explore our Popular Courses</p>
            <div className="course-grid">
                {courses.map((course, index) => ( 
                    <div className="course-card" key={index}>
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
