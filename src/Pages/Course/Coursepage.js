import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import courseData from './courses.json'; // Import the local JSON data
import PopularMentors from '../../Components/PopularMentors/PopularMentors';
import FeaturedCourses from '../../Components/FeaturedCourses/FeaturedCourses';
import { useNavigate } from 'react-router-dom';
import './Coursepage.css';

const Coursepage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    rating: null,
    chapters: null,
    price: null,
    category: null,
  });
  const [sort, setSort] = useState('relevance'); // Default sorting by relevance
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const navigate = useNavigate();
  const [collapsedSections, setCollapsedSections] = useState({
    rating: false,
    chapters: false,
    price: false,
    category: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourses(courseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCollapseToggle = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courseDetail/${courseId}`);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const applyFilters = (courses) => {
    let filteredCourses = [...courses];
    if (filters.rating) {
      filteredCourses = filteredCourses.filter((course) => course.rating >= filters.rating);
    }
    if (filters.chapters) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.chapters >= filters.chapters[0] && course.chapters <= filters.chapters[1]
      );
    }
    if (filters.price !== null) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.price === 'free' ? course.price === 0 : course.price > 0
      );
    }
    return filteredCourses;
  };

  const paginate = (courses) => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return courses.slice(startIndex, endIndex);
  };

  const filteredCourses = applyFilters(courses);
  const paginatedCourses = paginate(filteredCourses);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;

  return (
    <div className="course-page-maincontainer">
      <Navbar />
      <div className="mainarea">
        {/* Sidebar Area */}
        <div className="Sidebar-area">
          <div className="filter-section">
            <button className="filter-btn">Filter</button>
            <div className="filter-options">
              {/* Rating Filter */}
              <div className="filter-group">
                <div
                  className="filter-header"
                  onClick={() => handleCollapseToggle('rating')}
                >
                  Rating
                  <img
                    src="./down-arrow.png"
                    alt="toggle arrow"
                    className={collapsedSections.rating ? 'rotated' : ''}
                  />
                </div>
                {!collapsedSections.rating && (
                  <div className="filter-content">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value="5"
                        onChange={() => handleFilterChange('rating', 5)}
                      />{' '}
                      5 Stars
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value="4"
                        onChange={() => handleFilterChange('rating', 4)}
                      />{' '}
                      4 Stars
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value="3"
                        onChange={() => handleFilterChange('rating', 3)}
                      />{' '}
                      3 Stars
                    </label>
                  </div>
                )}
              </div>

              {/* Number of Chapters Filter */}
              <div className="filter-group">
                <div
                  className="filter-header"
                  onClick={() => handleCollapseToggle('chapters')}
                >
                  Number of Chapters
                  <img
                    src="./down-arrow.png"
                    alt="toggle arrow"
                    className={collapsedSections.rating ? 'rotated' : ''}
                  />
                </div>
                {!collapsedSections.chapters && (
                  <div className="filter-content">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('chapters', [1, 10])}
                      />{' '}
                      1-10
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('chapters', [10, 15])}
                      />{' '}
                      10-15
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('chapters', [15, 20])}
                      />{' '}
                      15-20
                    </label>
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <div
                  className="filter-header"
                  onClick={() => handleCollapseToggle('price')}
                >
                  Price
                  <img
                    src="./down-arrow.png"
                    alt="toggle arrow"
                    className={collapsedSections.rating ? 'rotated' : ''}
                  />
                </div>
                {!collapsedSections.price && (
                  <div className="filter-content">
                    <label>
                      <input
                        type="radio"
                        name="price"
                        value="free"
                        onChange={() => handleFilterChange('price', 'free')}
                      />{' '}
                      Free
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="price"
                        value="paid"
                        onChange={() => handleFilterChange('price', 'paid')}
                      />{' '}
                      Paid
                    </label>
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <div
                  className="filter-header"
                  onClick={() => handleCollapseToggle('category')}
                >
                  Category
                  <img
                    src="./down-arrow.png"
                    alt="toggle arrow"
                    className={collapsedSections.rating ? 'rotated' : ''}
                  />
                </div>
                {!collapsedSections.category && (
                  <div className="filter-content">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('category', 'Development')}
                      />{' '}
                      Development
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('category', 'Design')}
                      />{' '}
                      Design
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => handleFilterChange('category', 'Marketing')}
                      />{' '}
                      Marketing
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Area */}
        <div className="course-area">
          <div className="Sortby-section">
            Sort by:
            <select value={sort} onChange={handleSortChange} className="sort-dropdown">
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="courses">
            <div className="courses-grid">
              {paginatedCourses.map((course) => (
                <div className="courses-card" key={course.id}>
                  <div className="courses-category">{course.category.category_name}</div>
                  <img src={course.course_image} alt={course.course_name} className="course-image" />
                  <h3 className="courses-title">{course.course_name}</h3>
                  <p className="courses-instructor">by {course.instructor.instructor_name}</p>
                  <div className="courses-info">
                    <span className="courses-duration">
                      <i className="fas fa-clock"></i>
                      {course.course_duration}
                    </span>
                    <span className="students-count">
                      <i className="fas fa-users"></i>
                      {course.students_count} students
                    </span>
                  </div>
                  <button onClick={() => handleCourseClick(course.id)} className="course-details-btn">
                    View Course
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Section */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredCourses.length / coursesPerPage)))
              }
              disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <PopularMentors />
      <FeaturedCourses />
      <Footer />
    </div>
  );
};

export default Coursepage;
