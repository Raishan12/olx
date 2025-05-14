import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({ searchResults }) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  async function loadData() {
    try {
      const res = await axios.get('http://localhost:7000/api/olx/getads');
      setAllData(res.data);
    } catch (error) {
      console.log({ message: 'Load function error', error });
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
        (item.location &&
          item.location[0]?.city &&
          item.location[0].city.toLowerCase().includes(searchTermLower)) ||
        (item.location &&
          item.location[0]?.neighbourhood &&
          item.location[0].neighbourhood.toLowerCase().includes(searchTermLower))
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
  }, []);

  useEffect(() => {
    if (typeof searchResults === 'string') {
      filterData(searchResults);
    }
  }, [searchResults, allData]);

  const paginatedData = getPaginatedData();
  const totalPages = getTotalPages();

  return (
    <div className="home-container mx-40 my-10">
      <div className="ml-13">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">
            {isSearching
              ? `Search Results for "${searchTerm}"`
              : 'Fresh recommendations'}
          </h2>

          {isSearching && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              onClick={clearSearch}
            >
              Show All Products
            </button>
          )}
        </div>

        {isSearching && filteredData.length === 0 && (
          <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-xl text-gray-500">
              No products found matching "{searchTerm}"
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={clearSearch}
            >
              Show All Products
            </button>
          </div>
        )}

        <div className="cards flex flex-wrap gap-5">
          {paginatedData.map((card) => (
            <div
              key={card._id}
              className="card bg-white w-65 h-75 p-2 rounded border-1 border-[rgb(207,204,204)] hover:shadow-md transition duration-300"
              onClick={() => handleOnClickCard(card._id)}
            >
              <img
                src={`http://localhost:7000/images/${card.photos[0]}`}
                className="card-img-top h-50 mx-auto object-contain bg-black"
                alt={card.adtitle}
              />
              <div className="card-body p-2">
                <h5 className="card-price text-2xl font-extrabold">₹ {card.price}</h5>
                <p className="card-title text-lg text-stone-500 truncate">{card.adtitle}</p>
                <p className="card-title text-sm text-stone-500 font-light truncate">
                  {card.location[0].neighbourhood}, {card.location[0].city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {paginatedData.length === 0 && !isSearching && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">No products available</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded ${
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
              className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
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
