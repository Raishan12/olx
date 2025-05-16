import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editprofiledetails = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    about: '',
  });
  const [error, setError] = useState(null);

  // Fetch user data and initialize form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
          setError('User ID not found. Please log in again.');
          return;
        }

        const res = await axios.get(`http://localhost:7000/api/olx/getUser/${user_id}`);
        const userData = res.data;
        setFormData({
          username: user.name || userData.username || '',
          phoneNumber: userData.phone || '',
          about: userData.about || '',
        });
      } catch (error) {
        console.error('Fetch user details error:', error);
        setError('Failed to load user details. Please try again.');
      }
    };

    if (isAuthenticated && user) {
      fetchUserDetails();
    } else {
      navigate('/'); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        setError('User ID not found. Please log in again.');
        return;
      }

      const res = await axios.put(`http://localhost:7000/api/olx/updateProfile/${user_id}`, formData);
      if (res.status === 200) {
        alert('Profile updated successfully!');
        navigate('/profile'); // Redirect back to profile page
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/profile'); // Redirect back to profile page without saving
  };

  if (!isAuthenticated || !user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-10 shadow-md">
      {/* Sidebar - Profile Picture + View Button */}
      <div className="w-full lg:w-1/3">
        <div className="rounded p-4 text-center">
          <img
            src={user.picture}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <button
            onClick={() => navigate('/profile')}
            className="text-blue-600 font-semibold border border-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition"
          >
            View profile
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="w-full lg:w-2/3">
        <div className="border border-gray-300 rounded p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

          {/* Section: Basic Information */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Basic information</h3>
            <div className="flex items-start gap-4 mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                maxLength={30}
                placeholder="Enter your name"
                className="border rounded w-full h-12 px-4"
              />
              <div className="bg-gray-100 p-3 rounded text-sm text-gray-600 w-1/2">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 text-lg">💡</span>
                  <p>
                    <strong>Why is it important?</strong><br />
                    OLX is built on trust. Help others get to know you.
                  </p>
                </div>
              </div>
            </div>

            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="About me (optional)"
              rows={3}
              className="border rounded w-full px-4 py-2 resize-none"
              maxLength={200}
            />
          </div>

          <hr /><br />

          {/* Section: Contact Information */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Contact information</h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border rounded w-full h-12 px-4"
                placeholder="+91 Phone Number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="border rounded w-full h-12 px-4 bg-gray-100 text-gray-700 cursor-not-allowed"
              />
              <p className="text-gray-400 text-xs mt-1">
                Your email is never shared externally.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Discard
            </button>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-700 text-white px-5 py-2 rounded font-semibold hover:bg-blue-600 transition"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofiledetails;