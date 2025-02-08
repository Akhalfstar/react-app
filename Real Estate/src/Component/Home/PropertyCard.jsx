import React from 'react';
import HeartIcon from './HeartIcon';


const PropertyCard = ({
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
    <div className={`relative h-full rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Image Container */}
      <div className="relative h-full">
        <img 
          src={imageUrl || '/placeholder-image.jpg'}
          alt="Property" 
          className="w-full h-full object-cover"
        />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
          <HeartIcon />
        </button>

        {/* Overlay Content Container */}
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#282828]/90 backdrop-blur-sm">
          {/* Price */}
          <div className="text-2xl font-bold text-white mb-2">
            {formatPrice(price)}
          </div>

          {/* Address */}
          <div className="text-white mb-4">
            <div className="font-medium">{address}</div>
            <div className="opacity-80">{city && zipCode ? `${city}, ${zipCode}` : ''}</div>
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center">
              <span>{formatSquareFeet(squareFeet)} Sq. Ft.</span>
            </div>
            <div className="flex items-center">
              <span>{beds} Beds</span>
            </div>
            <div className="flex items-center">
              <span>{baths} Baths</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;