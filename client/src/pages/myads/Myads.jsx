import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Myads = () => {
  const [ads, setAds] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function loadUserAds() {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        setError('Please log in to view your ads');
        setLoading(false);
        return;
      }

      const res = await axios.get(`http://localhost:7000/api/olx/getUserAds/${user_id}`);
      setAds(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Load user ads error:', error);
      setError('Failed to load your ads');
      setLoading(false);
    }
  }

  async function loadWishlist() {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) return;

      const res = await axios.get(`http://localhost:7000/api/olx/getWishlist/${user_id}`);
      setWishlist(res.data.wishlist.map((item) => item._id.toString()));
    } catch (error) {
      console.error('Load wishlist error:', error);
    }
  }

  async function handleWishlistToggle(productId) {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to add to wishlist');
        return;
      }

      const isWishlisted = wishlist.includes(productId);
      const res = await axios.post(`http://localhost:7000/api/olx/toggleWishlist/${user_id}/${productId}`);

      if (res.status === 200) {
        if (isWishlisted) {
          setWishlist(wishlist.filter((id) => id !== productId));
        } else {
          setWishlist([...wishlist, productId]);
        }
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      alert('Failed to update wishlist');
    }
  }

  const handleOnClickCard = (id) => {
    navigate(`/preview/${id}`);
  };

  useEffect(() => {
    loadUserAds();
    loadWishlist();
  }, []);

  if (loading || error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">
        {error ? <span className="text-red-500">{error}</span> : 'Loading...'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Want to sell more?</h3>
          <p className="text-sm text-gray-500">Post more Ads for less. Save money with our packages.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Show me packages</button>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Ad Title"
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded"
        />
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded-full">View all ({ads.length})</button>
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Active Ads ({ads.length})</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">Inactive Ads (0)</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">Pending Ads (0)</button>
          <button className="px-3 py-1 bg-gray-200 rounded-full">Moderated Ads (0)</button>
        </div>
      </div>

      {ads.map((ad) => (
        <div
          key={ad._id}
          className="border border-gray-300 rounded-lg p-4 mb-6 flex justify-between items-center hover:shadow-sm transition"
        >
          <div className="flex gap-4 items-start w-full" onClick={() => handleOnClickCard(ad._id)}>
            <img
              src={ad.photos?.[0] ? `http://localhost:7000/images/${ad.photos[0]}` : 'https://via.placeholder.com/150?text=No+Image'}
              className="w-24 h-24 object-contain border rounded"
              alt={ad.adtitle}
            />
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium">
                FROM: {new Date(ad.createdAt).toLocaleDateString()} TO: {new Date(ad.expiryDate || Date.now()).toLocaleDateString()}
              </p>
              <h4 className="text-lg font-bold">{ad.adtitle}</h4>
              <p className="text-sm text-gray-500">{ad.location?.neighbourhood}, {ad.location?.city}</p>
            </div>
            <div
              className="absolute right-6 top-4"
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle(ad._id);
              }}
            >
              <img
                src={wishlist.includes(ad._id) ? '/png/wished.png' : '/png/wish.png'}
                alt="wishlist"
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="text-right min-w-fit">
            <p className="text-xl font-extrabold mb-1">₹ {parseFloat(ad.price).toLocaleString()}</p>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">ACTIVE</span>
            <p className="mt-2 text-sm text-gray-600">This ad is currently live</p>
            <div className="mt-4 flex gap-2 justify-end">
              <button className="border px-3 py-1 rounded text-sm">Mark as sold</button>
              <button className="border px-3 py-1 bg-blue-600 text-white rounded text-sm">Sell faster now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Myads;
