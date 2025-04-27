import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Upload, X } from "lucide-react";

function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    price: "",
    propertyType: "house",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [],
    latitude: "",
    longitude: "",
    amenities: [],
  });

  // Reset form function
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      price: "",
      propertyType: "house",
      bedrooms: "",
      bathrooms: "",
      area: "",
      features: [],
      latitude: "",
      longitude: "",
      amenities: [],
    });
    setImages([]);
    setPreviewImages((prevUrls) => {
      // Revoke all object URLs
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setErrors({});
  };

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Basic validations
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required";
      valid = false;
    }

    if (!formData.area || isNaN(formData.area) || Number(formData.area) <= 0) {
      newErrors.area = "Valid area is required";
      valid = false;
    }

    if (
      !formData.bedrooms ||
      isNaN(formData.bedrooms) ||
      Number(formData.bedrooms) < 0
    ) {
      newErrors.bedrooms = "Valid number of bedrooms is required";
      valid = false;
    }

    if (
      !formData.bathrooms ||
      isNaN(formData.bathrooms) ||
      Number(formData.bathrooms) < 0
    ) {
      newErrors.bathrooms = "Valid number of bathrooms is required";
      valid = false;
    }

    // Address validations
    if (!formData.address.street.trim()) {
      newErrors["address.street"] = "Street address is required";
      valid = false;
    }

    if (!formData.address.city.trim()) {
      newErrors["address.city"] = "City is required";
      valid = false;
    }

    if (!formData.address.state.trim()) {
      newErrors["address.state"] = "State is required";
      valid = false;
    }

    // ZIP code validation (exactly 6 digits)
    const zipCodeRegex = /^\d{6}$/;
    if (!zipCodeRegex.test(formData.address.zipCode)) {
      newErrors["address.zipCode"] = "ZIP code must be exactly 6 digits";
      valid = false;
    }

    if (!formData.address.country.trim()) {
      newErrors["address.country"] = "Country is required";
      valid = false;
    }

    // Standard latitude validation (-90 to 90, with up to 6 decimal places)
    if (formData.latitude) {
      const latRegex = /^-?([0-8]?\d(\.\d{1,6})?|90(\.0{1,6})?)$/;
      if (!latRegex.test(formData.latitude)) {
        newErrors.latitude =
          "Latitude must be between -90 and 90 with up to 6 decimal places";
        valid = false;
      }
    }

    // Standard longitude validation (-180 to 180, with up to 6 decimal places)
    if (formData.longitude) {
      const lngRegex =
        /^-?((1[0-7]\d(\.\d{1,6})?)|([0-9]?\d(\.\d{1,6})?)|180(\.0{1,6})?)$/;
      if (!lngRegex.test(formData.longitude)) {
        newErrors.longitude =
          "Longitude must be between -180 and 180 with up to 6 decimal places";
        valid = false;
      }
    }

    // Validate amenities
    if (formData.amenities.length > 0) {
      formData.amenities.forEach((amenity, index) => {
        if (!amenity.name.trim()) {
          newErrors[`amenities[${index}].name`] = "Amenity name is required";
          valid = false;
        }

        if (
          !amenity.distance ||
          isNaN(amenity.distance) ||
          Number(amenity.distance) < 0
        ) {
          newErrors[`amenities[${index}].distance`] =
            "Valid distance is required";
          valid = false;
        }
      });
    }

    // Images validation
    if (images.length === 0) {
      newErrors.images = "At least one image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for zipcode to ensure only digits
    if (name === "address.zipCode") {
      const digitOnly = value.replace(/\D/g, "").slice(0, 6); // Remove non-digits and limit to 6 chars

      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: digitOnly,
        },
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors((prev) => ({
        ...prev,
        images: "Some files were rejected. Images must be under 5MB.",
      }));
    } else {
      // Clear image error if it exists
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }
    }

    setImages((prev) => [...prev, ...validFiles]);

    // Create preview URLs
    const newPreviewImages = validFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Process features array if it's a string
      let featuresArray = formData.features;
      if (typeof formData.features === "string") {
        featuresArray = formData.features
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item);
      }

      // Create a processed data object for JSON fields
      const processedData = {
        ...formData,
        features: featuresArray,
        // Convert numeric fields to numbers
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        amenities: formData.amenities.map((a) => ({
          name: a.name,
          distance: Number(a.distance),
        })),
      };

      // Append all form fields as a JSON string
      formDataToSend.append("propertyData", JSON.stringify(processedData));

      // Append images with unique names
      images.forEach((image, index) => {
        formDataToSend.append(
          "images",
          image,
          `property_image_${index}_${Date.now()}.${image.name.split(".").pop()}`
        );
      });
    
      const response = await fetch("http://localhost:5000/api/v1/property/createProperty", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server error occurred");
      }

      const data = await response.json();

      if (data.success) {
        // Clean up preview URLs to prevent memory leaks
        previewImages.forEach((url) => URL.revokeObjectURL(url));

        // Reset form after successful submission
        resetForm();

        // Show success message
        alert("Property created successfully!");

        // Navigate to properties page
        navigate("/Property");
      } else {
        throw new Error(data.message || "Failed to create property");
      }
    } catch (error) {
      console.error("Error creating property:", error);

    
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturesChange = (e) => {
    const { value } = e.target;
    // Split by commas and trim whitespace
    const featuresArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => ({
      ...prev,
      features: featuresArray,
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...(prev.amenities || []), { name: "", distance: "" }],
    }));
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
  
    // Allow only numbers, decimal, and negative sign
    let sanitizedValue = value.replace(/[^\d.-]/g, '');
  
    if (name === "latitude") {
      const latRegex = /^-?(90(\.0{1,6})?|([0-8]?\d(\.\d{1,6})?))$/;
  
      setFormData(prev => ({
        ...prev,
        latitude: sanitizedValue
      }));
  
      if (sanitizedValue && !latRegex.test(sanitizedValue)) {
        const num = Number(sanitizedValue);
        if (num < -90 || num > 90) {
          setErrors(prev => ({ ...prev, latitude: "Latitude must be between -90 and 90" }));
        } else if (sanitizedValue.includes('.') && sanitizedValue.split('.')[1].length > 6) {
          setErrors(prev => ({ ...prev, latitude: "Latitude can have at most 6 decimal places" }));
        } else {
          setErrors(prev => ({ ...prev, latitude: "Invalid latitude format" }));
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.latitude;
          return newErrors;
        });
      }
    } 
    else if (name === "longitude") {
      const lngRegex = /^-?(180(\.0{1,6})?|((1[0-7]\d|[1-9]?\d)(\.\d{1,6})?))$/;
  
      setFormData(prev => ({
        ...prev,
        longitude: sanitizedValue
      }));
  
      if (sanitizedValue && !lngRegex.test(sanitizedValue)) {
        const num = Number(sanitizedValue);
        if (num < -180 || num > 180) {
          setErrors(prev => ({ ...prev, longitude: "Longitude must be between -180 and 180" }));
        } else if (sanitizedValue.includes('.') && sanitizedValue.split('.')[1].length > 6) {
          setErrors(prev => ({ ...prev, longitude: "Longitude can have at most 6 decimal places" }));
        } else {
          setErrors(prev => ({ ...prev, longitude: "Invalid longitude format" }));
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.longitude;
          return newErrors;
        });
      }
    }
  };
  

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  // Clean up preview URLs on component unmount to prevent memory leaks
  React.useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Location Coordinates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleCoordinateChange }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleCoordinateChange }
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="e.g., Swimming Pool, Garden, Garage"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          {formData.amenities?.map((amenity, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenity Name
                </label>
                <input
                  type="text"
                  value={amenity.name}
                  onChange={(e) => {
                    const newAmenities = [...formData.amenities];
                    newAmenities[index].name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      amenities: newAmenities,
                    }));
                  }}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amenity.distance}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      const newAmenities = [...formData.amenities];
                      newAmenities[index].distance = value;
                      setFormData((prev) => ({
                        ...prev,
                        amenities: newAmenities,
                      }));
                    }
                  }}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                amenities: [
                  ...(prev.amenities || []),
                  { name: "", distance: "" },
                ],
              }))
            }
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Amenity
          </button>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Property Images</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    Click to upload images
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProperty;
