import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, onPageChange }) => {
  const totalPages = 7;

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
          onClick={() => {
            // Make the 7th button unclickable
            if (index + 1 !== 7) {
              onPageChange(index + 1);
            }
          }}
          disabled={index + 1 === 7} // Disable the 7th button
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
