import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4 shadow-md bg-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-black"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
};

export default Nav;
