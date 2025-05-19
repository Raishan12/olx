import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  async function loadWishlist() {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to view your wishlist');
        return;
      }

      const res = await axios.get(`http://localhost:7000/api/olx/getWishlist/${user_id}`);
      setWishlistData(res.data.wishlist);
      setWishlistIds(res.data.wishlist.map((item) => item._id.toString()));
    } catch (error) {
      console.log({ message: 'Load wishlist error', error });
      alert('Failed to load wishlist');
    }
  }

  async function handleWishlistToggle(productId) {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to add to wishlist');
        return;
      }

      const isWishlisted = wishlistIds.includes(productId);
      const res = await axios.post(`http://localhost:7000/api/olx/toggleWishlist/${user_id}/${productId}`);

      if (res.status === 200) {
        if (isWishlisted) {
          setWishlistData(wishlistData.filter((item) => item._id.toString() !== productId));
          setWishlistIds(wishlistIds.filter((id) => id !== productId));
        } else {
          const productRes = await axios.get(`http://localhost:7000/api/olx/getproduct/${productId}`);
          setWishlistData([...wishlistData, productRes.data]);
          setWishlistIds([...wishlistIds, productId]);
        }
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      alert('Failed to update wishlist');
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOnClickCard = (id) => {
    navigate(`/preview/${id}`);
  };

  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return wishlistData.slice(start, start + itemsPerPage);
  };

  const getTotalPages = () => {
    return Math.ceil(wishlistData.length / itemsPerPage);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const paginatedData = getPaginatedData();
  const totalPages = getTotalPages();

  return (
    <div className="home-container mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10 max-w-7xl">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-xl font-light underline underline-offset-12 decoration-1">
            Wishlist
          </h2>
        </div>

        {wishlistData.length === 0 && (
          <div className="text-center py-8 sm:py-10 rounded-lg">
            <img src="/webp/no-favorites.webp" alt="" className=' mx-auto h-50 w-auto ' />
            <h2 className=' text-xl font-bold text-gray-700 '>
              You haven't liked any ads yet
            </h2>
            <p className="text-lg sm:text-xl text-gray-500">
            Like ads and share<br />them with the world
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-white hover:text-blue-500 hover:border hover:border-2 hover:border=blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
              onClick={() => navigate('/')}
            >
              Discover
            </button>
          </div>
        )}

        <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {paginatedData.map((card) => (
            <div
              key={card._id}
              className="relative card bg-white p-2 sm:p-3 rounded border border-gray-200 hover:shadow-md transition duration-300 cursor-pointer"
              onClick={() => handleOnClickCard(card._id)}
            >
              <div
                className="wishbutton absolute bg-white p-1 rounded-full right-6 top-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(card._id);
                }}
              >
                <img
                  src={wishlistIds.includes(card._id) ? '/png/wished.png' : '/png/wish.png'}
                  alt="wishlist"
                  className="size-4.5"
                />
              </div>
              <img
                src={`http://localhost:7000/images/${card.photos[0]}`}
                className="w-full h-40 object-contain rounded"
                alt={card.adtitle}
              />
              <div className="card-body p-2">
                <h5 className="card-price text-lg sm:text-xl lg:text-2xl font-extrabold">
                  ₹ {card.price}
                </h5>
                <p className="card-title text-base sm:text-lg text-gray-600 truncate">
                  {card.adtitle}
                </p>
                <p className="card-title text-xs sm:text-sm text-gray-500 font-light truncate">
                  {card.location.neighbourhood}, {card.location.city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {paginatedData.length === 0 && wishlistData.length > 0 && (
          <div className="text-center py-6 sm:py-8">
            <p className="text-lg sm:text-xl text-gray-500">No products available</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8 lg:mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded text-sm sm:text-base ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;