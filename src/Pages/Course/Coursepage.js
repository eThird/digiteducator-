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
      category: [], // Set category to an empty array initially
      level: null,
    });

  const [sort, setSort] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const navigate = useNavigate();
  const [collapsedSections, setCollapsedSections] = useState({
    rating: false,
    chapters: false,
    price: false,
    category: false,
    level: false, // Collapsed state for the level section
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/all_courses/');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      rating: null,
      chapters: null,
      price: null,
      category: [],
      level: null,
    });
  };

  // Check if any filter is applied
  const isAnyFilterActive = () => {
    return (
      filters.rating !== null ||
      filters.chapters !== null ||
      filters.price !== null ||
      filters.category.length > 0 ||
      filters.level !== null
    );
  };

  const handleCollapseToggle = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-detail/${courseId}`);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
      if (filterType === 'category') {
        // Handle category as before
        setFilters((prevFilters) => {
          const categories = prevFilters.category.includes(value)
            ? prevFilters.category.filter((category) => category !== value) // Deselect category
            : [...prevFilters.category, value]; // Select category
          return { ...prevFilters, category: categories };
        });
      } else {
        // For chapters and other filters, just set the value directly
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterType]: value, // Set value directly for radio buttons
        }));
      }
    };


    const applyFilters = (courses) => {
      let filteredCourses = [...courses];

      // Filter by rating
      if (filters.rating) {
        const [min, max] = filters.rating;
        filteredCourses = filteredCourses.filter(
          (course) => course.course_rating >= min && course.course_rating <= max
        );
      }

      // Filter by number of lectures
      if (filters.chapters) {
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.total_lecture >= filters.chapters[0] && course.total_lecture <= filters.chapters[1]
        );
      }

      // Apply price filter
      if (filters.price !== null) {
        filteredCourses = filteredCourses.filter((course) =>
          filters.price === 'free' ? course.price === 0 : course.price > 0
        );
      }

      // Apply multiple category filter
        if (filters.category && filters.category.length > 0) {
          filteredCourses = filteredCourses.filter(
            (course) => filters.category.includes(course.category.category_name)
          );
        }


      // Apply course level filter
      if (filters.level) {
        filteredCourses = filteredCourses.filter(
          (course) => course.course_level === filters.level
        );
      }

      // Sorting logic remains the same
      if (sort === 'price-asc') {
        filteredCourses.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        filteredCourses.sort((a, b) => b.price - a.price);
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
            <button className="filter-button">
              <i className="fas fa-filter"></i> Filter
            </button>
            <button
              className="clear-filters-button"
              onClick={clearFilters}
              disabled={!isAnyFilterActive()} // Disable if no filter is active
            >
              Clear All Filters
            </button>
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
                  {collapsedSections.rating && (
                    <div className="filter-content">
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value="1-2"
                          onChange={() => handleFilterChange('rating', [1, 2])}
                        />{' '}
                        1-2 Stars
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value="2-3"
                          onChange={() => handleFilterChange('rating', [2, 3])}
                        />{' '}
                        2-3 Stars
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value="3-4"
                          onChange={() => handleFilterChange('rating', [3, 4])}
                        />{' '}
                        3-4 Stars
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="rating"
                          value="4-5"
                          onChange={() => handleFilterChange('rating', [4, 5])}
                        />{' '}
                        4-5 Stars
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
                      className={collapsedSections.chapters ? 'rotated' : ''}
                    />
                  </div>
                  {collapsedSections.chapters && (
                    <div className="filter-content">
                      <label>
                        <input
                          type="radio"
                          name="chapters"
                          value="1-10"
                          onChange={() => handleFilterChange('chapters', [1, 10])}
                        />{' '}
                        1-10 Chapters
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="chapters"
                          value="10-15"
                          onChange={() => handleFilterChange('chapters', [10, 15])}
                        />{' '}
                        10-15 Chapters
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="chapters"
                          value="15-20"
                          onChange={() => handleFilterChange('chapters', [15, 20])}
                        />{' '}
                        15-20 Chapters
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
                    className={collapsedSections.price ? 'rotated' : ''}
                  />
                </div>
                {collapsedSections.price && (
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
                      className={collapsedSections.category ? 'rotated' : ''}
                    />
                  </div>
                  {collapsedSections.category && (
                    <div className="filter-content">
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleFilterChange('category', 'Marketing')}
                          checked={filters.category.includes('Marketing')}
                        />{' '}
                        Marketing
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleFilterChange('category', 'Engineering')}
                          checked={filters.category.includes('Engineering')}
                        />{' '}
                        Engineering
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleFilterChange('category', 'Business')}
                          checked={filters.category.includes('Business')}
                        />{' '}
                        Business
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleFilterChange('category', 'IT')}
                          checked={filters.category.includes('IT')}
                        />{' '}
                        IT
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleFilterChange('category', 'Cyber Security')}
                          checked={filters.category.includes('Cyber Security')}
                        />{' '}
                        Cyber Security
                      </label>
                    </div>
                  )}
                </div>


              {/* Course Level Filter */}
              <div className="filter-group">
                <div
                  className="filter-header"
                  onClick={() => handleCollapseToggle('level')}
                >
                  Course Level
                  <img
                    src="./down-arrow.png"
                    alt="toggle arrow"
                    className={collapsedSections.level ? 'rotated' : ''}
                  />
                </div>
                {collapsedSections.level && (
                  <div className="filter-content">
                    <label>
                      <input
                        type="radio"
                        name="level"
                        value="beginner"
                        onChange={() => handleFilterChange('level', 'beginner')}
                      />{' '}
                      Beginner
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="level"
                        value="intermediate"
                        onChange={() => handleFilterChange('level', 'intermediate')}
                      />{' '}
                      Intermediate
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="level"
                        value="advanced"
                        onChange={() => handleFilterChange('level', 'advanced')}
                      />{' '}
                      Advanced
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
                      <div className="coursepage-image-container">
                        <img
                          src={course.course_image}
                          alt={course.course_name}
                          className="coursepage-image"
                        />
                      </div>
                      <h3 className="courses-title">{course.course_name}
                      <p className="courses-rating">
                          <img src="/star.png" alt="star rating" className="star-icon" />
                          {course.course_rating}
                      </p></h3>
                      <p className="courses-instructor">by {course.instructor.instructor_name}</p>

                      <div className="courses-info">
                         {course.total_hours} Total hours. {course.total_lecture} Lectures. {course.course_level}
                      </div>

                      <button onClick={() => handleCourseClick(course.id)} className="course-details-btn">
                        View Course
                      </button>
                      <div className="course-pricing">
                        <span className="original-price">{course.original_price}</span>
                        <span className="price">{course.price}</span>
                      </div>
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