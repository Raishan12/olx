import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Viewprofile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    joinDate: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
          throw new Error('User ID not found in localStorage.');
        }

        const res = await axios.get(`http://localhost:7000/api/olx/getUser/${user_id}`);
        const dbUser = res.data;

        const joinDate = dbUser.createdAt
          ? new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : new Date(user.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        setUserData({
          username: dbUser.username || user.name || '',
          email: dbUser.email || user.email || '',
          joinDate,
        });
      } catch (err) {
        console.error('Fetch user details error:', err);
        if (isAuthenticated && user) {
          setUserData({
            username: user.name || '',
            email: user.email || '',
            joinDate: new Date(user.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          });
        } else {
          setError('Failed to load user details. Please log in again.');
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

  if (!isAuthenticated || !user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start justify-between bg-white shadow-md p-6 rounded-md">
        <div className="flex flex-col items-center sm:items-start gap-4 sm:w-1/2">
          <div>
            <img src={user.picture} alt="Profile" className="rounded-full w-20 h-20" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{userData.username}</h2>
            <p className="text-gray-600 text-sm mt-1">Member since {userData.joinDate}</p>
            <p className="text-gray-600 text-sm">0 Followers | 0 Following</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={() => navigate('/editprofiledetails')}
              className="mt-4 bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-blue-800 border hover:border-blue-800 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-0 sm:w-1/2">
          <img
            src="/webp/no-publications.webp"
            alt="No Ads"
            className="w-40 mb-4"
          />
          <p className="text-lg font-semibold">You haven't listed anything yet</p>
          <p className="text-sm text-gray-500 mb-4">Let go of what you don’t use anymore</p>
          <button
            onClick={() => navigate('/post')}
            className="bg-blue-800 text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-blue-800 border hover:border-blue-800 transition"
          >
            Start selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewprofile;