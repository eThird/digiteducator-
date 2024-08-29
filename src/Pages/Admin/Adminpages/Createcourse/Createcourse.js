import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Createcourse.css";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
    validateForm(e.target.value, description, courseDate, thumbnail);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateForm(courseName, e.target.value, courseDate, thumbnail);
  };

  const handleCourseDateChange = (e) => {
    setCourseDate(e.target.value);
    validateForm(courseName, description, e.target.value, thumbnail);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    validateForm(courseName, description, courseDate, file);
  };

  const validateForm = (name, desc, date, thumb) => {
    if (name && desc && date && thumb) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async () => {
    if (formValid) {
      const formData = new FormData();
      formData.append("name", courseName);
      formData.append("description", description);
      formData.append("course_date", courseDate);
      formData.append("thumbnail", thumbnail);

      try {
        const response = await axios.post("http://localhost:8000/create-course/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          alert("Course created successfully!");
          navigate('/Coursedisplay'); // Redirect to the Courses page
        }
      } catch (error) {
        console.error("There was an error creating the course!", error);
        alert("There was an error creating the course!");
      }
    }
  };

  return (
    <div className="create-course-container">
      <div className="course-details">
        <h2>Course Details</h2>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={handleCourseNameChange}
            placeholder="Course Name"
          />
        </div>
        <div className="form-group upload-image">
          <label htmlFor="thumbnail">Upload Intro Image</label>
          <div className="upload-area">
            <input
              type="file"
              id="thumbnail"
              accept="image/jpeg, image/png"
              onChange={handleThumbnailChange}
              style={{ display: "none" }}
            />
            <label htmlFor="thumbnail" className="upload-label">
              {thumbnail ? (
                <span>{thumbnail.name}</span>
              ) : (
                <span>
                  Drag and drop files, or <span className="browse-link">Browse</span>
                </span>
              )}
            </label>
            <p className="file-info">Upload Thumbnail in JPEG, PNG.</p>
          </div>
        </div>
        <div className="form-group description">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDate">Set Course Date</label>
          <input
            type="date"
            id="courseDate"
            value={courseDate}
            onChange={handleCourseDateChange}
          />
        </div>
        <button
          className="continue-button"
          onClick={handleSubmit}
          disabled={!formValid}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
