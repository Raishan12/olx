import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bike = () => {
  const [formData, setFormData] = useState({
    brand: '',
    bikeName: '',
    year: '',
    fuel: '',
    transmission: '',
    noOfOwners: '',
    adTitle: '',
    description: '',
    price: '',
    kmDriven: '',
    images: [],
    category: "bikes"
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [location, setLocation] = useState({
    state: '',
    city: '',
    neighborhood: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const states = [
    {
      name: 'Kerala',
      cities: [
        { name: 'Ernakulam', neighborhoods: ['Kochi', 'Kaloor', 'Edappally', 'Kalamassery'] },
        { name: 'Idukki', neighborhoods: ['Kattappana', 'Painavu', 'Thodupuzha'] },
        { name: 'Kottayam', neighborhoods: ['Pala', 'Changanassery', 'Vaikom'] },
        { name: 'Trivandrum', neighborhoods: ['Pettah', 'Kowdiar', 'Sreekariyam'] },
      ],
    },
    {
      name: 'Tamil Nadu',
      cities: [
        { name: 'Chennai', neighborhoods: ['Adyar', 'T Nagar', 'Mylapore', 'Egmore'] },
        { name: 'Coimbatore', neighborhoods: ['RS Puram', 'Peelamedu', 'Gandhipuram'] },
        { name: 'Madurai', neighborhoods: ['Mattuthavani', 'KK Nagar', 'MGR Nagar'] },
        { name: 'Trichy', neighborhoods: ['Srirangam', 'Tidel Park', 'Thillai Nagar'] },
      ],
    },
    {
      name: 'Karnataka',
      cities: [
        { name: 'Bangalore', neighborhoods: ['Koramangala', 'Indiranagar', 'Jayanagar', 'Whitefield'] },
        { name: 'Mysore', neighborhoods: ['Jayalakshmipuram', 'Vontikoppal', 'Saraswathipuram'] },
        { name: 'Hubli', neighborhoods: ['Koppikar Road', 'Gokul Road', 'Vidyagiri'] },
        { name: 'Mangalore', neighborhoods: ['Kankanady', 'Bendoor', 'Bejai'] },
      ],
    },
    {
      name: 'Maharashtra',
      cities: [
        { name: 'Mumbai', neighborhoods: ['Andheri', 'Bandra', 'Colaba', 'Lower Parel'] },
        { name: 'Pune', neighborhoods: ['Kothrud', 'Hinjewadi', 'Camp'] },
        { name: 'Nagpur', neighborhoods: ['Gaddigodam', 'Sitabuldi', 'Civil Lines'] },
        { name: 'Nashik', neighborhoods: ['CIDCO', 'Indira Nagar', 'Gandhi Nagar'] },
      ],
    },
    {
      name: 'Andhra Pradesh',
      cities: [
        { name: 'Visakhapatnam', neighborhoods: ['Bheemunipatnam', 'Madhurawada', 'Dwarakanagar'] },
        { name: 'Vijayawada', neighborhoods: ['Governorpet', 'Kailasapuram', 'Benz Circle'] },
        { name: 'Tirupati', neighborhoods: ['Chandragiri', 'Srinivasa Nagar', 'Renigunta'] },
        { name: 'Guntur', neighborhoods: ['Suryaraopet', 'Peddagantyada', 'Arundelpet'] },
      ],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFuelChange = (fuel) => {
    setFormData((prev) => ({ ...prev, fuel }));
    setError('');
  };

  const handleTransmissionChange = (transmission) => {
    setFormData((prev) => ({ ...prev, transmission }));
    setError('');
  };

  const handleNoOfOwnersChange = (noOfOwners) => {
    setFormData((prev) => ({ ...prev, noOfOwners }));
    setError('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length <= 20) {
      const newImages = files.map((file) => file);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    } else {
      setError('You can upload a maximum of 20 images.');
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setLocation({ state: value, city: '', neighborhood: '' });
    } else if (name === 'city') {
      setLocation((prev) => ({ ...prev, city: value, neighborhood: '' }));
    } else {
      setLocation((prev) => ({ ...prev, neighborhood: value }));
    }
    setError('');
  };

  const validateForm = () => {
    const requiredFields = [
      { key: 'brand', value: formData.brand },
      { key: 'bikeName', value: formData.bikeName },
      { key: 'year', value: formData.year },
      { key: 'fuel', value: formData.fuel },
      { key: 'transmission', value: formData.transmission },
      { key: 'noOfOwners', value: formData.noOfOwners },
      { key: 'adTitle', value: formData.adTitle },
      { key: 'description', value: formData.description },
      { key: 'price', value: formData.price },
      { key: 'kmDriven', value: formData.kmDriven },
      { key: 'state', value: location.state },
      { key: 'city', value: location.city },
      { key: 'neighborhood', value: location.neighborhood },
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        return `Please fill in the ${field.key} field.`;
      }
    }

    if (formData.images.length === 0) {
      return 'Please upload at least one image.';
    }

    if (isNaN(formData.kmDriven) || formData.kmDriven < 0) {
      return 'Please enter a valid number for Kilometers Driven.';
    }

    return '';
  };

  const handlePostAd = async () => {
    setError('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const user_id = localStorage.getItem("id");
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images') {
          formDataToSend.append(key, value);
        }
      });

      formDataToSend.append('location[state]', location.state);
      formDataToSend.append('location[city]', location.city);
      formDataToSend.append('location[neighborhood]', location.neighborhood);
      formDataToSend.append("email", localStorage.getItem("email"));

      formData.images.forEach((image) => {
        formDataToSend.append('file', image);
      });

      console.log('Posting ad:', { ...formData, location });

      const response = await axios.post(`http://localhost:7000/api/olx/uploadads/${user_id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('Response:', response);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error posting ad:', error.response || error.message);
      setError('Failed to post ad. Please try again.');
    }
  };

  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-200 relative">
        <button
          className="text-2xl focus:outline-none absolute -left-[390px] top-2 sm:-left-8"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <div className="flex items-center mb-4">
          <h1 className="text-lg font-bold uppercase">Post Your Ad</h1>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* Selected Category Section */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Selected Category</h2>
            <div className="flex justify-between items-center p-2">
              <span className="text-sm text-gray-600">Bikes / Bikes</span>
              <span
                className="text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('/sell')}
              >
                Change
              </span>
            </div>
          </div>
          {/* Include Some Details Section */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Include Some Details</h2>
            <div className="p-2 space-y-4">
              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <div className="relative">
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Brand</option>
                    {[
                      'Bajaj', 'Hero', 'Honda', 'Royal Enfield', 'Yamaha',
                      'TVS', 'Suzuki', 'KTM', 'Harley-Davidson', 'Triumph',
                      'BMW Motorrad', 'Ducati', 'Kawasaki', 'Benelli', 'Jawa'
                    ].map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ▼
                  </span>
                </div>
              </div>
              {/* Bike Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bike Name *
                </label>
                <input
                  type="text"
                  name="bikeName"
                  value={formData.bikeName}
                  onChange={handleInputChange}
                  placeholder="Enter Bike Name (e.g., Pulsar, Bullet)"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Enter Bike Year"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Kilometers Driven */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kilometers Driven *
                </label>
                <input
                  type="number"
                  name="kmDriven"
                  value={formData.kmDriven}
                  onChange={handleInputChange}
                  placeholder="Enter Kilometers Driven"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Fuel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel *
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Petrol', 'Electric'].map((fuel) => (
                    <button
                      key={fuel}
                      onClick={() => handleFuelChange(fuel)}
                      className={`px-4 py-1 border rounded-md text-sm ${
                        formData.fuel === fuel
                          ? 'bg-gray-200 border-gray-400'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>
              </div>
              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission *
                </label>
                <div className="flex gap-2">
                  {['Automatic', 'Manual'].map((transmission) => (
                    <button
                      key={transmission}
                      onClick={() => handleTransmissionChange(transmission)}
                      className={`px-4 py-1 border rounded-md text-sm ${
                        formData.transmission === transmission
                          ? 'bg-gray-200 border-gray-400'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {transmission}
                    </button>
                  ))}
                </div>
              </div>
              {/* Number of Owners */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Owners *
                </label>
                <div className="flex flex-wrap gap-2">
                  {['First', 'Second', 'Third', '4th+'].map((noOfOwners) => (
                    <button
                      key={noOfOwners}
                      onClick={() => handleNoOfOwnersChange(noOfOwners)}
                      className={`px-4 py-1 border rounded-md text-sm ${
                        formData.noOfOwners === noOfOwners
                          ? 'bg-gray-200 border-gray-400'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {noOfOwners}
                    </button>
                  ))}
                </div>
              </div>
              {/* Ad Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Title *
                </label>
                <input
                  type="text"
                  name="adTitle"
                  value={formData.adTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Ad Title"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
            </div>
          </div>
          {/* Set a Price Section */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Set a Price</h2>
            <div className="p-2 space-y-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="₹ Enter Price"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          {/* Upload Photos Section */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Upload Photos</h2>
            <div className="p-2">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-10">
                {Array(20)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="relative">
                      {imagePreviews[index] ? (
                        <div>
                          <img
                            src={imagePreviews[index]}
                            alt={`Uploaded ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-solid border-gray-300 cursor-pointer hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={formData.images.length >= 20}
                          />
                          <span className="text-xl text-gray-500">
                            <svg
                              width="36px"
                              height="36px"
                              viewBox="0 0 1024 1024"
                              data-aut-id="icon"
                            >
                              <path
                                className="rui-jB92v"
                                d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"
                              ></path>
                            </svg>
                          </span>
                          {index === 0 && (
                            <span className="text-xs text-gray-600 text-center">
                              Add Photos
                            </span>
                          )}
                        </label>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Confirm Your Location Section */}
          <div className="mb-4">
            <h2 className="text-base font-bold uppercase p-2">Confirm Your Location</h2>
            <div className="p-2 space-y-4">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <div className="relative">
                  <select
                    name="state"
                    value={location.state}
                    onChange={handleLocationChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ▼
                  </span>
                </div>
              </div>
              {/* City */}
              {location.state && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={location.city}
                      onChange={handleLocationChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select City</option>
                      {states
                        .find((s) => s.name === location.state)
                        ?.cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ▼
                    </span>
                  </div>
                </div>
              )}
              {/* Neighborhood */}
              {location.city && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neighborhood *
                  </label>
                  <div className="relative">
                    <select
                      name="neighborhood"
                      value={location.neighborhood}
                      onChange={handleLocationChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Neighborhood</option>
                      {states
                        .find((s) => s.name === location.state)
                        ?.cities.find((c) => c.name === location.city)
                        ?.neighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ▼
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Post Your Ad Button */}
          <div className="p-2">
            <button
              onClick={handlePostAd}
              className="w-full py-2 text-white text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Your Ad
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Bike;