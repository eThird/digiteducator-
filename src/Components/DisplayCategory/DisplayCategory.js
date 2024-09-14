import React, { useState, useEffect } from 'react';
import './DisplayCategory.css';
import categoryData from '../DisplayCategory/category.json'; // Assuming the JSON file is stored here

const DisplayCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoryData); // Load data from JSON
  }, []);

  return (
    <div className="category-container">
      <div className="header-row">
        <h1 className="title">Top Categories</h1>
        <p className="subtitle">Explore our Popular Categories</p>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="icon-container">
              <img src={category.icon} alt={category.name} className="category-icon" />
            </div>
            <h2 className="category-name">{category.name}</h2>
            <p className="course-count">{category.courseCount} Courses</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCategory;
