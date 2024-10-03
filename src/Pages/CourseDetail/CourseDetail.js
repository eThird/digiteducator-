import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './CourseDetail.css';

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    // Function to toggle syllabus sections
    const toggleSection = (index) => {
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Function to fetch course details
    const fetchCourseDetail = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/`, {
                credentials: 'include', // Ensure cookies are sent for authentication
            });
            if (!response.ok) {
                throw new Error('Failed to fetch course details');
            }
            const data = await response.json();
            setCourse(data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Effect for fetching course details and checking login status
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            fetchCourseDetail(); // Fetch course details if logged in
        }
    }, [courseId, navigate]);

    const handleEnroll = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn !== 'true') {
            alert('You must be logged in to add a course to the cart.');
            navigate('/login');
            return;
        }

        // Navigate to the shopping cart page with the course ID
        navigate(`/shoppingcart/${courseId}`);
    };

    // Function to scroll to sections
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = 100; // Adjust this value based on your layout
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    // Loading and error handling
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading course details: {error.message}</p>;
    if (!course) return <p>No course data found.</p>;

    return (
        <div className="course-detail-container">
            <Navbar />
            <div className='header-container'>
                <div className="course-header">
                    <div className="breadcrumb">
                        <a href="#">Home</a> &gt; <a href="#">Categories</a> &gt; <span>{course.course_name}</span>
                    </div>
                    <h1>{course.course_name}</h1>
                    <p>{course.course_description}</p>
                    <div className="course-rating">
                        <img src='/star.png' alt='Star rating icon' />
                        <span>{course.course_rating} ({course.total_ratings_count} ratings) |</span>
                        <span> {course.total_hours} Total Hours</span>
                    </div>
                    <p>Created by {course.instructor.instructor_name}</p>
                </div>
                <div className="course-card1">
                    <div className='courseimage-container'>
                        <img src={course.course_image} alt="Course" />
                    </div>
                    <div className="price-section">
                        <span className="discount-price">{course.price}</span>
                        <span className="original-price1">{course.original_price}</span>
                    </div>
                    <div className="button-section">
                        <button className="add-to-cart" onClick={handleEnroll}>
                            Enroll Now
                        </button>
                    </div>
                    <div className="share-section">
                        <span>Share</span>
                        <div className="share-icons">
                            <img src="/facebookicon.png" alt="Facebook" />
                            <img src="/googleicon.png" alt="Google" />
                            <img src="/instagram.png" alt="Instagram" />
                            <img src="/twitter.png" alt="Twitter" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='detail-tabs'>
                <div className='description-tab' onClick={() => scrollToSection('course-description')}>Description</div>
                <div className='instructor-tab' onClick={() => scrollToSection('instructor')}>Instructor</div>
                <div className='syllabus-tab' onClick={() => scrollToSection('syllabus')}>Syllabus</div>
                <div className='reviews-tab'>Reviews</div>
            </div>
            <div className='tab-details'>
                <div className="course-description" id="course-description">
                    <h2>Course Description</h2>
                    <p>{course.course_description}</p>
                    <div className="line-separator"></div>
                    <h2>Certification</h2>
                    <p>{course.course_certification}</p>
                </div>
                <div className="instructor" id="instructor">
                    <h2>Instructor</h2>
                    <div className="instructor-info">
                        <div className="instructor-header">
                            <img src={course.instructor.profile_picture} alt="Instructor" className="rounded-image" />
                            <div className="instructor-details">
                                <h4 className="instructor-name">{course.instructor.instructor_name}</h4>
                                <p>{course.instructor.instructor_title}</p>
                            </div>
                        </div>
                        <div className='instructor-data'>
                            <p className="instructor-description">{course.instructor.description}</p>
                        </div>
                    </div>
                </div>
                <div className="syllabus-wrapper" id="syllabus">
                    <h3 className="syllabus-title">Syllabus</h3>
                    <div className="syllabus">
                        {course.syllabus.map((section, index) => (
                            <div className="syllabus-section" key={index}>
                                <div className="syllabus-header" onClick={() => toggleSection(index)}>
                                    <h4>{section.syllabus_name}</h4>
                                    <p>{section.lectures_count} Lessons - {section.total_duration}</p>
                                    <span className="toggle-button">
                                        {expandedSections[index] ? '-' : '+'}
                                    </span>
                                </div>
                                {expandedSections[index] && (
                                    <ul className="lecture-list">
                                        {section.lectures.map((lecture, lectureIndex) => (
                                            <li key={lectureIndex} className="lecture-item">
                                                {lecture.lecture_name}
                                                <span>{lecture.lecture_time} Mins</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CourseDetail;
