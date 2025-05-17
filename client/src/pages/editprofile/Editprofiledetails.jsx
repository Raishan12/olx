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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
          throw new Error('User ID not found. Please log in again.');
        }

        const res = await axios.get(`http://localhost:7000/api/olx/getUser/${user_id}`);
        const dbUser = res.data;

        setFormData({
          username: dbUser.username || user.name || '',
          phoneNumber: dbUser.phone || '',
          about: dbUser.about || '',
        });
      } catch (err) {
        console.error('Fetch user details error:', err);
        if (isAuthenticated && user) {
          setFormData({
            username: user.name || '',
            phoneNumber: '',
            about: '',
          });
        } else {
          setError('Failed to load user details. Please try again.');
          navigate('/');
        }
      }
    };

    if (isAuthenticated && user) {
      fetchUserDetails();
    } else {
      navigate('/');
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
        navigate('/profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-10 shadow-md">
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

      <div className="w-full lg:w-2/3">
        <div className="border border-gray-300 rounded p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

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
                  <span className="text-yellow-500 text-lg"><svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M318.061 279.272h-54.847l-61.517-61.517v-54.847h54.847l61.517 61.517v54.847zM512 240.485l-38.789-38.789v-77.575l38.789-38.789 38.789 38.789v77.575l-38.789 38.789zM938.667 473.211l-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575l38.789 38.789zM201.697 434.425l38.789 38.789-38.789 38.789h-77.575l-38.789-38.789 38.789-38.789h77.575zM822.303 217.755l-61.517 61.517h-54.847v-54.847l61.517-61.517h54.847v54.847zM621.73 621.73c-13.848 13.809-29.867 24.747-47.67 32.505l-23.272 35.569v54.924h-77.575v-54.924l-23.272-35.53c-17.804-7.757-33.823-18.734-47.67-32.582-60.47-60.47-60.47-158.913 0-219.385 60.51-60.51 158.952-60.51 219.462 0 60.47 60.47 60.47 158.913 0 219.385zM473.211 861.091h77.575v-38.789h-77.575v38.789zM512 279.272c-62.177 0-120.63 24.204-164.538 68.19-90.764 90.725-90.764 238.351 0 329.115 14.507 14.469 30.643 26.919 48.174 37.043v186.259l38.789 38.789h155.151l38.789-38.789v-186.259c17.57-10.163 33.669-22.574 48.174-37.081 90.764-90.725 90.764-238.391 0-329.115-43.909-43.909-102.323-68.15-164.538-68.15z"></path></svg></span>
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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