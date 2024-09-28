import React, { useState, useEffect } from 'react';
import './DisplayCategory.css';

const DisplayCategory = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category/')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data); // Set the fetched course data to state
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  // Filter out duplicate categories by category_name
  const uniqueCategories = [];
  const categoryMap = new Map();

  courses.forEach(course => {
    const category = course.category;
    if (category && !categoryMap.has(category.category_name)) {
      categoryMap.set(category.category_name, true);
      uniqueCategories.push(category);
    }
  });

  return (
    <div className="category-container">
      <div className="header-row">
        <h1 className="title">Top Categories</h1>
        <p className="subtitle">Explore our Popular Categories</p>
      </div>
      <div className="category-grid">
        {uniqueCategories.length > 0 ? (
          uniqueCategories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="icon-container">
                <img
                  src={category.category_icon || 'default-icon.png'}
                  alt={category.category_name || 'Category'}
                  className="category-icon"
                />
              </div>
              <h2 className="category-name">{category.category_name || 'Category'}</h2>
              <p className="course-count">
                {category.total_courses || 0} Courses
              </p>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default DisplayCategory;
