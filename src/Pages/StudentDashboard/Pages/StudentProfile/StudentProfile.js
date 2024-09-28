import React, { useState } from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', branch: '', description: '', language: '', image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSave = () => {
    // Logic to save the form data to the backend
    console.log(formData);
  };

  return (
    <div className="student-profile-container">
      <form className="student-profile-form">
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            placeholder="E.g. CSE"
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write something about you..."
          />
        </div>

        <div className="input-group">
          <label>Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
          >
            <option value="" disabled>Label</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <div className="image-section">
          <h3>Image Preview</h3>
          <div className="image-preview">
            {formData.image ? (
              <img src={formData.image} alt="Profile Preview" />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
          </div>

          <div className="image-upload-section">
              <div className="upload-container">
                <label>Add/Change Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button className="upload-button">Choose File</button> {/* Added button here */}
              </div>
              <button className="save-button">Save Changes</button> {/* Save button on the right */}
          </div>
          </div>
      </form>
    </div>
  );
};

export default StudentProfile;
