import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    program: '',
    yearOfStudy: '',
    language: '',
    description: '',
    image: null,
    email: '',
  });

  const [programs, setPrograms] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      navigate('/login');
    } else {
      fetchStudentData(userId);
    }
  }, [navigate]);

  // Fetch programs and languages
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/programs/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/languages/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchPrograms(), fetchLanguages()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchStudentData = async (userId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/student/data/${userId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setFormData({
        firstName: data.user.first_name || '',
        lastName: data.user.last_name || '',
        age: data.age || '',
        program: data.program ? data.program.id : '',
        yearOfStudy: data.year_of_study || '',
        language: data.language ? data.language.id : '',
        description: data.student_description || '',
        email: data.user.email || '',
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

const handleSave = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('first_name', formData.firstName);
    dataToSend.append('last_name', formData.lastName);
    dataToSend.append('age', formData.age);
    dataToSend.append('program', Number(formData.program));
    dataToSend.append('year_of_study', formData.yearOfStudy);
    dataToSend.append('language', Number(formData.language));
    dataToSend.append('student_description', formData.description);
    dataToSend.append('email', formData.email);

    if (formData.image) {
        dataToSend.append('student_profile_picture', formData.image);
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/student/update/', {
            method: 'PATCH',
            body: dataToSend,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Profile updated successfully:', responseData);
        } else {
            const errorData = await response.json();
            console.error('Error updating profile:', errorData);
        }
    } catch (error) {
        console.error('An error occurred while saving:', error);
    }
};

  if (loading) return <div>Loading...</div>;

  return (
    <div className="student-profile-container">
      <form className="student-profile-form" onSubmit={handleSave}>
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
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
              required
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              required
            />
          </div>

          <div className="input-group">
            <label>Program</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Program</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>{program.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Year of Study</label>
            <select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
              <option value="5">Fifth Year</option>
            </select>
          </div>

          <div className="input-group">
            <label>Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Language</option>
              {languages.map(language => (
                <option key={language.id} value={language.id}>{language.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email ID"
              required
              disabled // Disable if you want to prevent changes
            />
          </div>
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write something about you..."
            required
          />
        </div>

        <div className="image-section">
          <h3>Image Preview</h3>
          <div className="image-preview">
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} alt="Profile Preview" />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
          </div>

          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => document.getElementById('image-upload').click()}
              className="upload-button"
            >
              Choose File
            </button>
          </div>
        </div>

        <div className="button-row">
          <button type="submit" className="save-button">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
