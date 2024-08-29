import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/course", { title }); // sending data to API
      navigate("/Admin-coursepage");
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-new-course-container">
      <h1 className="create-new-course-title">Name your Course</h1>
      <p className="create-new-course-description">
        What would you like to name your course? Don't worry, you can change it
        later.
      </p>
      <form onSubmit={handleSubmit} className="create-new-course-form">
        <div className="form-item">
          <label className="form-label">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 'Advanced Web Development'"
            disabled={isSubmitting}
            className="form-input"
            required
          />
          <p className="form-description">
            What will you teach in this course?
          </p>
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="form-cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title || isSubmitting}
            className="form-submit-button"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCourse;
