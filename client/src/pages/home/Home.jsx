import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const location = useLocation();

  async function loadData() {
    try {
      const res = await axios.get('http://localhost:7000/api/olx/getads');
      setAllData(res.data);
    } catch (error) {
      console.log({ message: 'Load function error', error });
    }
  }

  async function loadWishlist() {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) return;

      const res = await axios.get(`http://localhost:7000/api/olx/getWishlist/${user_id}`);
      setWishlist(res.data.wishlist.map((item) => item._id.toString()));
    } catch (error) {
      console.log({ message: 'Load wishlist error', error });
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

  const filterData = (query) => {
    if (!query || query.trim() === '') {
      setIsSearching(false);
      setSearchTerm('');
      setCurrentPage(1);
      return;
    }

    const searchTermLower = query.toLowerCase();
    const filtered = allData.filter((item) => {
      return (
        (item.adtitle && item.adtitle.toLowerCase().includes(searchTermLower)) ||
        (item.description && item.description.toLowerCase().includes(searchTermLower)) ||
        (item.category && item.category.toLowerCase().includes(searchTermLower)) ||
        (item.location?.city && item.location.city.toLowerCase().includes(searchTermLower)) ||
        (item.location?.neighbourhood && item.location.neighbourhood.toLowerCase().includes(searchTermLower))
      );
    });

    setFilteredData(filtered);
    setIsSearching(true);
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchTerm('');
    setCurrentPage(1);
    navigate('/'); // Clear query parameter
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOnClickCard = (id) => {
    navigate(`/preview/${id}`);
  };

  const getPaginatedData = () => {
    const data = isSearching ? filteredData : allData;
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const getTotalPages = () => {
    const dataLength = isSearching ? filteredData.length : allData.length;
    return Math.ceil(dataLength / itemsPerPage);
  };

  useEffect(() => {
    loadData();
    loadWishlist();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';
    filterData(searchQuery);
  }, [location.search, allData]);

  const paginatedData = getPaginatedData();
  const totalPages = getTotalPages();

  return (
    <div className="home-container mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10 max-w-7xl">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            {isSearching
              ? `Search Results for "${searchTerm}"`
              : 'Fresh recommendations'}
          </h2>
          {isSearching && (
            <button
              className="mt-2 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
              onClick={clearSearch}
            >
              Show All Products
            </button>
          )}
        </div>
        {isSearching && filteredData.length === 0 && (
          <div className="text-center py-8 sm:py-10 bg-gray-100 rounded-lg">
            <p className="text-lg sm:text-xl text-gray-500">
              No products found matching "{searchTerm}"
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base"
              onClick={clearSearch}
            >
              Show All Products
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
                  src={wishlist.includes(card._id) ? '/png/wished.png' : '/png/wish.png'}
                  alt="wishlist"
                  className='size-4.5'
                />
              </div>
              <img
                src={card.photos && card.photos.length > 0 ? `http://localhost:7000/images/${card.photos[0]}` : 'https://via.placeholder.com/150?text=No+Image'}
                className="w-full h-40 object-contain rounded"
                alt={card.adtitle}
              />
              <div className="card-body p-2">
                <h5 className="card-price text-lg sm:text-xl lg:text-2xl font-extrabold">
                  ₹ {parseFloat(card.price).toLocaleString()}
                </h5>
                <p className="card-title text-base sm:text-lg text-gray-600 truncate">
                  {card.adtitle}
                </p>
                <p className="card-title text-xs sm:text-sm text-gray-500 font-light truncate">
                  {card.location?.neighbourhood}, {card.location?.city}
                </p>
              </div>
            </div>
          ))}
        </div>
        {paginatedData.length === 0 && !isSearching && (
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

export default Home;