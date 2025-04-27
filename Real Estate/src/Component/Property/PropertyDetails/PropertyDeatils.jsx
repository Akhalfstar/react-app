import React, { useState, useEffect } from "react";
import {
  MapPin,
  Home,
  Ruler,
  Phone,
  Mail,
  Star,
  Loader,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation } from "react-router";
import PropertyMap from "./OSM";

function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  const location = useLocation();
  const { _id } = location.state;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/property/searchOne?_id=${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response = await res.json();
        console.log("API Response:", response);

        if (response.success) {
          setProperty(response.data);
        } else {
          console.error("Failed to fetch property data");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!property) return null;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const previousImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="relative mb-8">
        <div className="flex gap-4 h-96">
          {/* Main Image */}
          <div className="flex-grow relative rounded-xl overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[activeImage].url}
                alt={`Property view ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Side Images */}
          {property.images && property.images.length > 1 && (
            <div className="flex flex-col gap-4 w-64">
              <div className="h-1/2 rounded-xl overflow-hidden">
                <img
                  src={
                    property.images[(activeImage + 1) % property.images.length]
                      .url
                  }
                  alt={`Property view ${
                    ((activeImage + 1) % property.images.length) + 1
                  }`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() =>
                    setActiveImage((activeImage + 1) % property.images.length)
                  }
                />
              </div>
              {property.images.length > 2 && (
                <div className="h-1/2 rounded-xl overflow-hidden relative">
                  <img
                    src={
                      property.images[
                        (activeImage + 2) % property.images.length
                      ].url
                    }
                    alt={`Property view ${
                      ((activeImage + 2) % property.images.length) + 1
                    }`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() =>
                      setActiveImage((activeImage + 2) % property.images.length)
                    }
                  />
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold hover:bg-black/60 transition-colors"
                  >
                    View All Photos
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {property.images && property.images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-72 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Full Image Gallery Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/90 z-50 p-8">
          <div className="relative h-full">
            <button
              onClick={() => setShowAllImages(false)}
              className="absolute right-0 top-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-full">
              {property.images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setActiveImage(idx);
                    setShowAllImages(false);
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Property view ${idx + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span>{property.propertyType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                <span>{property.area} sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>
                  {property.address.city}, {property.address.state}
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-6">
              ₹{property.price.toLocaleString()}
            </div>
            <p className="text-gray-600">{property.description}</p>

            {/* Property Features */}
            {property.features && property.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-500">Bedrooms</span>
                <span className="font-semibold">{property.bedrooms}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Bathrooms</span>
                <span className="font-semibold">{property.bathrooms}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold capitalize">
                  {property.status}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Area</span>
                <span className="font-semibold">{property.area} sqft</span>
              </div>
            </div>
          </div>

          {/* Full Address Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">Address</h2>
            <div className="space-y-2">
              <p className="text-gray-600">{property.address.street}</p>
              <p className="text-gray-600">
                {property.address.city}, {property.address.state}{" "}
                {property.address.zipCode}
              </p>
              <p className="text-gray-600">{property.address.country}</p>
            </div>
          </div>
        </div>

        {/* Agent Contact Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              {property.agent && (
                <p className="text-gray-600">Agent ID: {property.agent._id}</p>
              )}
            </div>
            <div className="space-y-4">
              {property.agent && property.agent.email && (
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5" />
                  {property.agent.email}
                </a>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* Map & Amenities Section */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Location & Nearby Amenities</h2>

        {/* Map container with explicit height */}
        <div
          className="h-96 bg-gray-100 rounded-lg mb-6"
          style={{ minHeight: "400px" }}
        >
          {property.location &&
          property.location.coordinates &&
          property.location.coordinates.length === 2 ? (
            <PropertyMap
              latitude={property.location.coordinates[1]}
              longitude={property.location.coordinates[0]}
              zoom={15}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Location coordinates not available
            </div>
          )}
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold">{amenity.name}</h4>
                  <p className="text-sm text-gray-600">
                    {amenity.distance} miles
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
