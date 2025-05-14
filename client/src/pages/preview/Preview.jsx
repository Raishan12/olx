import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Preview = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    console.log('Product ID from params:', productId);
    const fetchProduct = async () => {
      if (!productId) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:7000/api/olx/getproduct/${productId}`
        );
        console.log('Fetched product:', response.data);
        setProduct(response.data);
        if (response.data.photos && response.data.photos.length > 0) {
          setMainImage(`http://localhost:7000/images/${response.data.photos[0]}`);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (image) => {
    setMainImage(`http://localhost:7000/images/${image}`);
  };

  const handleContactSeller = () => {
    alert('Chat with seller functionality to be implemented');
  };

  const handleCallSeller = () => {
    alert('Call seller functionality to be implemented');
  };

  const handleShare = () => {
    alert('Share functionality to be implemented');
  };

  const handleReport = () => {
    alert('Report ad functionality to be implemented');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-600 mb-2">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              OLX
            </span>{' '}
            &gt;{' '}
            <span className="cursor-pointer hover:underline">
              {product.category || 'Cars'}
            </span>{' '}
            &gt; <span>{product.adtitle}</span>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <div className="space-x-4">
              <button
                onClick={handleShare}
                className="text-gray-600 hover:text-gray-800"
              >
                Share
              </button>
              <button
                onClick={handleReport}
                className="text-gray-600 hover:text-gray-800"
              >
                Report this ad
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="banner">
              <img src="/banner_copy.png" alt="banner" className="w-full" />
            </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={
                    mainImage || 'https://via.placeholder.com/600x400?text=No+Image'
                  }
                  alt={product.adtitle}
                  className="w-full h-[400px] object-contain rounded-lg"
                />
              </div>
              {/* Thumbnails */}
              {product.photos && product.photos.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {product.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`http://localhost:7000/images/${photo}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                        mainImage === `http://localhost:7000/images/${photo}`
                          ? 'border-blue-500'
                          : 'border-gray-200'
                      }`}
                      onClick={() => handleImageClick(photo)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* Price and Title */}
              <h1 className="text-2xl font-bold text-gray-800">
                ₹ {product.price.toLocaleString()}
              </h1>
              <h2 className="text-lg text-gray-600 mt-1">{product.adtitle}</h2>

              {/* Location and Date */}
              <div className="text-sm text-gray-500 mt-2">
                <p>
                  {product.location[0].neighbourhood}, {product.location[0].city},{' '}
                  {product.location[0].state}
                </p>
                <p>
                  Posted: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleCallSeller}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
                >
                  Make Offer
                </button>
                <button
                  onClick={handleContactSeller}
                  className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition flex items-center justify-center"
                >
                  Chat with Seller
                </button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Seller Information
              </h3>
              <p className="text-gray-600 mt-2">
                Seller: <span className="font-medium">Not available</span>
              </p>
              <p className="text-gray-600">
                Member since: <span className="font-medium">Not available</span>
              </p>
              {/* Update with actual seller data if available */}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
            <div>
              <p>
                <span className="font-medium">Brand:</span>{' '}
                {product.brand || 'Toyota'}
              </p>
              <p>
                <span className="font-medium">Model:</span>{' '}
                {product.model || 'Innova Crysta'}
              </p>
              <p>
                <span className="font-medium">Year:</span>{' '}
                {product.year || 'Not specified'}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Condition:</span>{' '}
                {product.condition || 'Used'}
              </p>
              <p>
                <span className="font-medium">Ad ID:</span> {product._id}
              </p>
              <p>
                <span className="font-medium">Category:</span>{' '}
                {product.category || 'Cars'}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">
            {product.description || 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;