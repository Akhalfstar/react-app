import React from 'react';
import HeartIcon from './HeartIcon';

const Card2 = ({
  imageUrl = '',
  price = 0,
  address = '',
  city = '',
  zipCode = '',
  squareFeet = 0,
  beds = 0,
  baths = 0,
  className = '',
}) => {
  const formatPrice = (value) => {
    if (value == null) return '$0';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  const formatSquareFeet = (value) => {
    if (value == null) return '0';
    return value.toLocaleString();
  };

  return (
    <div className={`group relative rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Image Container */}
      <div className="relative">
        <img 
          src={imageUrl || '/placeholder-image.jpg'}
          alt="Property" 
          className="w-full h-80 object-cover"
        />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};

export default Card2;