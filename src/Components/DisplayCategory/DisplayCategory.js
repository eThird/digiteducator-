import React, { useState, useEffect } from 'react';
import './DisplayCategory.css';

const DisplayCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/');  // Update this URL to match your Django endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="category-container">
      <h1 className="title">Top Categories</h1>
      <p className="subtitle">Explore our Popular Categories</p>
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
