import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Viewprofile = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setUsername(user.name || '');
    } else {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) return null;

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || 'U';

  const joinDate = new Date(user.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-start justify-between bg-white shadow-md p-6 rounded-md">
        {/* Left Panel - Profile Info */}
        <div className="flex flex-col items-center sm:items-start gap-4 sm:w-1/2">
          <div className="">
            <img src={user.picture} alt="" className=' rounded-full ' />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{username}</h2>
            <p className="text-gray-600 text-sm mt-1">Member since {joinDate}</p>
            <p className="text-gray-600 text-sm">0 Followers | 0 Following</p>
            {/* <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">User verified with</span>
              <img src="/icons/verified.svg" alt="verified" className="w-4 h-4" />
              <img src="/icons/email.svg" alt="email" className="w-4 h-4" />
            </div> */}
            <button
              onClick={() => navigate('/editprofiledetails')}
              className="mt-4 bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-blue-800 border hover:border-blue-800 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Panel - My Ads Empty State */}
        <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-0 sm:w-1/2">
          <img
            src="/webp/no-publications.webp" // Replace with actual image path
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
