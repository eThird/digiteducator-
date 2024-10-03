import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate for routing
import './ShoppingCart.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const ShoppingCart = () => {
  const { courseId } = useParams();
  const navigate = useNavigate(); // Initialize navigate for routing
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch course details using courseId
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/course/${courseId}/`);
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchCourseDetail();
  }, [courseId]);

  // Apply Coupon
  const applyCoupon = async () => {
    if (!couponCode) {
      alert('Please enter a coupon code');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/validate-coupon/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: courseId,
          coupon_code: couponCode,
        }),
      });
      const result = await response.json();

      if (result.valid) {
        setCouponApplied(true);
        setDiscount(result.discount_percentage);
        setMessage(`Coupon applied! You get a ${result.discount_percentage}% discount.`);
      } else {
        setCouponApplied(false);
        setDiscount(0);
        setMessage(result.error || 'Invalid coupon code');
      }
    } catch (error) {
      setMessage('An error occurred while validating the coupon');
    }
  };

    const handleEnroll = async () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const token = localStorage.getItem('token');

        if (isLoggedIn !== 'true') {
            alert('You must be logged in to enroll in a course.');
            return;
        }

        if (!token) {
            alert('Authentication token not found. Please log in again.');
            return;
        }

        try {
            console.log('Token being sent:', token); // Debugging log

            const response = await fetch(`http://127.0.0.1:8000/api/enroll/${courseId}/`, {
                method: 'POST',
                credentials: 'include', // Optional, for cookies-based authentication
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ensure the token is sent correctly
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Debugging log
                throw new Error(errorData.detail || 'Failed to enroll in course');
            }

            const data = await response.json();
            alert(data.message || 'Enrolled successfully!');
            navigate(`/course-overview/${courseId}`);
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Error enrolling in course: ' + error.message);
        }
    };


  // Handle button clicks
  const handleButtonClick = () => {
    if (discount === 100) {
      // Call the enroll function when "Enroll for Free" is clicked
      handleEnroll();
    } else {
      // Do nothing on "Proceed to Checkout" button click
      console.log('Proceed to checkout button clicked');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course details: {error.message}</p>;

  if (!course) return <div>No course data found.</div>;

  const price = course.price ? parseFloat(course.price) : 0.00;
  const originalPrice = course.original_price ? parseFloat(course.original_price) : 0.00;
  const totalPrice = price;
  const discountAmount = (discount / 100) * totalPrice;
  const total = totalPrice - discountAmount;

  return (
    <div>
      <Navbar />
      <div className="shopping-cart-container">
        <div className="cart-items">
          <div className="shopping-cart-header">
            <h2 className="shopping-cart-title">Shopping Cart</h2>
            <div className="breadcrumb">
              <span>Courses &gt; Details &gt; Shopping Cart</span>
            </div>
          </div>
          <hr className="divider" />
          <div className="card">
            <div key={course.id} className="cart-item">
              <img src={course.course_image} alt={course.title} />
              <div className="course-details">
                <h3>{course.course_name}</h3>
                <p>By {course.instructor?.instructor_name}</p> {/* Optional chaining to prevent undefined error */}
                <div className="shopping_course-rating">
                  <span className="rating">{course.course_rating}</span>
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="rating-count">({course.total_ratings_count} ratings)</span>
                </div>
                <p>{course.total_hours} Total Hours. {course.total_lecture} Lectures. {course.course_level}</p>
                <div className="course-actions">
                  <span className="save">Save for later</span> | <span className="remove">Remove</span>
                </div>
              </div>
              <div className="course-price original-price">{originalPrice.toFixed(2)}</div>
              <div className="course-price discounted-price">{price.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="order-summary-container">
          <h3 className="order-details-title">Order Details</h3>
          <div className="course-card2">
            <img src={course.course_image} alt={course.course_image} className="course-image" />
            <div className="course-info">
              <h3>{course.course_name}</h3>
              <div className="course-meta">
                <p>{course.total_lecture} Lectures · {course.total_hours} Total Hours · {course.course_level}</p>
                <p>{price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="order-summary">
            <div className="summary-item">
              <span>Price</span>
              <span>{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Discount</span>
              <span>-{discountAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>{total.toFixed(2)}</span>
            </div>

            <div className="coupon-container">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
                className="coupon-input"
              />
              <button className="apply-coupon-button" onClick={applyCoupon}>
                Apply Coupon
              </button>
            </div>
            {message && <div className="coupon-message">{message}</div>}

            <button
              className={`checkout-button ${discount === 100 ? 'green-button' : 'blue-button'}`}
              onClick={handleButtonClick}
            >
              {discount === 100 ? 'Enroll for Free' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
