import React from 'react';
import './CourseDetail.css';
import data from '../CourseDetail/coursedetail.json';  // Assuming data is stored in this JSON file

const CourseDetail = () => {


    return (
        <div className="course-detail-container">
            <div className='header-container'>
                <div className="course-header">
                    <div className="breadcrumb">
                        <a href="#">Home</a> &gt; <a href="#">Categories</a> &gt; <span>{data.courseTitle}</span>
                    </div>
                        <h1>{data.courseTitle}</h1>
                        <p>{data.courseDescription}</p>
                    <div className="course-rating">
                            <img src='./star.png' alt='Start rating icon '/>
                            <span>{data.rating} ({data.reviewCount} ratings)</span>
                            <span>{data.totalHours} | Total Hours. {data.lectures} Lectures. {data.level}</span>
                    </div>
                        <p>Created by {data.instructor.name}</p>
                    <div className="languages">
                    <img src='./language.png' alt='Start rating icon '/>
                        <div className='langiage-text'>
                            {data.languages.map(lang => (
                                <span key={lang}>{lang}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="course-card">
                            <div className='courseimage-container'>
                            <img src="./bookandpeople.png" alt="Course Image"/>
                            </div>
                            <div class="price-section">
                                <span class="discount-price">$49.5</span>
                                <span class="original-price">$99.5</span>
                                <span class="discount">50% Off</span>
                            </div>
                            <div class="button-section">
                                <button class="add-to-cart">Add To Cart</button>
                                <button class="buy-now">Buy Now</button>
                            </div>
                            <div class="share-section">
                            <span>Share</span>
                            <div class="share-icons">
                            <img src="./facebookicon.png" alt="Facebook"/>
                            <img src="./googleicon.png" alt="Google"/>
                            <img src="./instagram.png" alt="X"/>
                            <img src="./twitter.png" alt="Microsoft"/>
                            </div>
                        </div>
                          
                </div>

            </div>
            <div className='detailing-tabs'>
                <div className='discription'>Description</div>
                <div className='discription'>Instructor</div>
                <div className='discription'>Syllabus</div>
                <div className='discription'>Reviews</div>
            </div>
            <div className='tab-details'>
            <div className="course-description">
                <h2>Course Description</h2>
                <p>{data.longDescription}</p>
                <h2>Certification</h2>
                <p>{data.certification}</p>
            </div>
            <div className="instructor">
                <h3>Instructor</h3>
                <div className="instructor-info">
                <h4>{data.instructor.name}</h4>
                <p>{data.instructor.title}</p>
                    <div className='instror-data '>
                    <img src={data.instructor.image} alt="instructor" />
                    <div className='instructor-stats'>
                    <img src={data.instructor.image} alt="instructor" />
                    <img src={data.instructor.image} alt="instructor" />
                    <img src={data.instructor.image} alt="instructor" />
                    </div>
                    </div> 
                    <p>{data.instructor.description}</p>
                </div>

            </div>
            <div className="syllabus">
                <h3>Syllabus</h3>
                {data.syllabus.map((section, index) => (
                    <div className="syllabus-section" key={index}>
                        <h4>{section.title}</h4>
                        <p>{section.lessons} Lessons - {section.duration}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>

    );
};

export default CourseDetail;
