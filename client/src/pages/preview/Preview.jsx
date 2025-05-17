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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerError, setOfferError] = useState('');
  const [initialPrice, setInitialPrice] = useState('');

  useEffect(() => {
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
        setProduct(response.data);
        if (response.data.photos && response.data.photos.length > 0) {
          setMainImage(`http://localhost:7000/images/${response.data.photos[0]}`);
        }
        setInitialPrice(response.data.price?.toString() || '');
        setOfferPrice(response.data.price?.toString() || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.response?.data?.message || 'Failed to load product details');
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const user_id = localStorage.getItem('id');
        if (!user_id) return;

        const res = await axios.get(`http://localhost:7000/api/olx/getWishlist/${user_id}`);
        const wishlistIds = res.data.wishlist.map((item) => item._id.toString());
        setIsWishlisted(wishlistIds.includes(productId));
      } catch (error) {
        console.error('Load wishlist error:', error);
      }
    };

    fetchProduct();
    fetchWishlist();
  }, [productId]);

  const handleImageClick = (image) => {
    setMainImage(`http://localhost:7000/images/${image}`);
  };

  const handleWishlistToggle = async () => {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to add to wishlist');
        return;
      }

      const res = await axios.post(`http://localhost:7000/api/olx/toggleWishlist/${user_id}/${productId}`);
      if (res.status === 200) {
        setIsWishlisted(!isWishlisted);
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      alert('Failed to update wishlist');
    }
  };

  const handleContactSeller = () => {
    alert('Chat with seller functionality to be implemented');
  };

  const handleCallSeller = async () => {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to make an offer');
        return;
      }

      const res = await axios.get(`http://localhost:7000/api/olx/getUser/${user_id}`);
      const userData = res.data;

      if (!userData.phone) {
        alert('Please add your phone number to make an offer');
        navigate('/editprofiledetails');
        return;
      }

      setIsOfferModalOpen(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to verify user details. Please try again.');
    }
  };

  const handleMakeOfferSubmit = async () => {
    try {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        alert('Please log in to make an offer');
        return;
      }

      const offer = parseFloat(offerPrice);
      if (isNaN(offer) || offer <= 0) {
        setOfferError('Please enter a valid offer price');
        return;
      }

      const res = await axios.post(`http://localhost:7000/api/olx/makeOffer`, {
        userId: user_id,
        productId,
        offerPrice: offer,
      });

      if (res.status === 200) {
        alert('Offer submitted successfully and emails sent!');
        setIsOfferModalOpen(false);
        setOfferPrice(initialPrice);
        setOfferError('');
      }
    } catch (error) {
      console.error('Make offer error:', error);
      setOfferError(error.response?.data?.message || 'Failed to submit offer');
    }
  };

  const handleOfferPriceChange = (e) => {
    const value = e.target.value;
    setOfferPrice(value);

    if (!product || !value) {
      setOfferError('');
      return;
    }

    const price = product.price;
    const offer = parseFloat(value);
    if (isNaN(offer) || offer <= 0) {
      setOfferError('Please enter a valid offer price');
      return;
    }

    const maxOffer = price * 1.1;
    const minOffer = price * 0.9;

    if (offer > maxOffer || offer < minOffer) {
      setOfferError('Offer must be within 10% of the listed price');
    } else {
      setOfferError('');
    }
  };

  const handleShare = () => {
    alert('Share functionality to be implemented');
  };

  const handleReport = () => {
    alert('Report ad functionality to be implemented');
  };

  // Capitalize category for display
  const displayCategory = (category) => {
    if (!category) return 'Unknown';
    const categoryMap = {
      cars: 'Cars',
      mobiles: 'Mobiles',
      bikes: 'Bikes',
    };
    return categoryMap[category.toLowerCase()] || category;
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
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="text-sm text-gray-600 mb-2">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              OLX
            </span>{' '}
            &gt;{' '}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              {displayCategory(product.category)}
            </span>{' '}
            &gt; <span>{product.adtitle}</span>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline flex items-center"
              aria-label="Go back"
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
                aria-label="Share this ad"
              >
                Share
              </button>
              <button
                onClick={handleReport}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Report this ad"
              >
                Report this ad
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="banner">
          <img src="/banner_copy.png" alt="Banner" className="w-full" />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                <img
                  src={
                    mainImage || 'https://via.placeholder.com/600x400?text=No+Image'
                  }
                  alt={product.adtitle}
                  className="w-full h-[400px] object-contain rounded-lg"
                />
                <button
                  className="wishbutton absolute bg-white p-1 rounded-full right-6 top-4"
                  onClick={handleWishlistToggle}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <img
                    src={isWishlisted ? '/png/wished.png' : '/png/wish.png'}
                    alt="Wishlist icon"
                    className="size-4.5"
                  />
                </button>
              </div>
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

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h1 className="text-2xl font-bold text-gray-800">
                ₹ {product.price ? product.price.toLocaleString() : 'N/A'}
              </h1>
              <h2 className="text-lg text-gray-600 mt-1">{product.adtitle}</h2>

              <div className="text-sm text-gray-500 mt-2">
                <p>
                  {product.location?.neighbourhood}, {product.location?.city},{' '}
                  {product.location?.state}
                </p>
                <p>Posted: {new Date(product.date).toLocaleDateString()}</p>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={handleCallSeller}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
                  aria-label="Make an offer"
                >
                  Make Offer
                </button>
                <button
                  onClick={handleContactSeller}
                  className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition flex items-center justify-center"
                  aria-label="Chat with seller"
                >
                  Chat with Seller
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Seller Information
              </h3>
              <p className="text-gray-600 mt-2">
                Seller:{' '}
                <span className="font-medium">
                  {product.user_id?.username || 'Not available'}
                </span>
              </p>
              <p className="text-gray-600">
                Member since:{' '}
                <span className="font-medium">
                  {product.user_id?.createdAt
                    ? new Date(product.user_id.createdAt).toLocaleDateString()
                    : 'Not available'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600">
            <div>
              <p>
                <span className="font-medium">Brand:</span>{' '}
                {product.brand || 'Not specified'}
              </p>
              <p>
                <span className="font-medium">
                  {product.category === 'cars' ? 'Year' : 'Model'}:
                </span>{' '}
                {product.model || 'Not specified'}
              </p>
              {product.category === 'cars' && (
                <p>
                  <span className="font-medium">Fuel:</span>{' '}
                  {product.fuel || 'Not specified'}
                </p>
              )}
            </div>
            <div>
              <p>
                <span className="font-medium">Condition:</span>{' '}
                {product.owner || 'Not specified'}
              </p>
              <p>
                <span className="font-medium">Ad ID:</span> {product._id}
              </p>
              <p>
                <span className="font-medium">Category:</span>{' '}
                {displayCategory(product.category)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">
            {product.description || 'No description available'}
          </p>
        </div>
      </div>

      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Make an Offer
            </h3>
            <div className="mb-4">
              <p className="text-gray-600">
                Listed Price:{' '}
                <span className="font-medium">
                  ₹ {product.price ? product.price.toLocaleString() : 'N/A'}
                </span>
              </p>
            </div>
            <div className="mb-4">
              <label htmlFor="offerPrice" className="block text-gray-600 mb-1">
                Your Offer
              </label>
              <input
                id="offerPrice"
                type="number"
                value={offerPrice}
                onChange={handleOfferPriceChange}
                className="border-2 rounded bg-white h-10 w-full px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your offer price"
                aria-label="Offer price"
              />
              {offerError && (
                <p className="text-red-500 text-sm mt-2">{offerError}</p>
              )}
            </div>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => {
                  setIsOfferModalOpen(false);
                  setOfferPrice(initialPrice);
                  setOfferError('');
                }}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
                aria-label="Cancel offer"
              >
                Cancel
              </button>
              <button
                onClick={handleMakeOfferSubmit}
                disabled={!!offerError || !offerPrice}
                className={`bg-blue-600 text-white font-bold py-2 px-4 rounded transition ${
                  offerError || !offerPrice
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                aria-label="Submit offer"
              >
                Make Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;