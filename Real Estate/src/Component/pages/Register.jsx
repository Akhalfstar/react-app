import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  Upload,
  MapPin,
} from "lucide-react";
import AuthLayout from "../auth/AuthLayout";
import FormInput from "../auth/FormInput";
import Button from "../ui/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validateName = (name) => {
    return name.trim() !== "" ? "" : "Full name is required";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email) ? "" : "Email is invalid";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone)
      ? ""
      : "Phone number is invalid. Please use format: (123) 456-7890";
  };

  const validateLocation = (location) => {
    return location.trim() !== "" ? "" : "Location is required";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return passwordRegex.test(password)
      ? ""
      : "Password must contain at least one number, one lowercase and one uppercase letter";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Confirm password is required";
    return confirmPassword === password ? "" : "Passwords do not match";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Block invalid typing for phone
    if (name === "phone") {
      const allowed = /^[0-9()+-\s.]*$/;
      if (!allowed.test(value)) {
        return;
      }
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    if (name === "fullName") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "location") error = validateLocation(value);
    if (name === "password") {
      error = validatePassword(value);
      if (formData.confirmPassword) {
        const confirmError = validateConfirmPassword(
          formData.confirmPassword,
          value
        );
        setErrors((prev) => ({
          ...prev,
          confirmPassword: confirmError,
        }));
      }
    }
    if (name === "confirmPassword")
      error = validateConfirmPassword(value, formData.password);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (!file) {
          newErrors.avatar = "Profile picture is required";
        } else {
          delete newErrors.avatar;
        }
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    newErrors.fullName = validateName(formData.fullName);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.location = validateLocation(formData.location);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    if (!avatar) {
      newErrors.avatar = "Profile picture is required";
    }

    // Remove empty errors
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(); 

    if (!isValid) {
      console.log("Form has errors. API call blocked.");
      return; 
    }

    console.log("Form valid. API call going ahead.");

    if (validate()) {
      setLoading(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("role", "user"); // Set default role as user

        if (avatar) {
          formDataToSend.append("avatar", avatar);
        }

        // Here you would make the actual API call to register the user
        const response = await fetch(
          "http://localhost:5000/api/v1/users/register",
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const data = await response.json();
        console.log("Registration successful:", data);
        setLoading(false);
        Navigate("/login")
      } catch (error) {
        setLoading(false);
        console.error("Registration error:", error);
        // Handle error (show error message, etc.)
      }
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join our real estate platform to find your dream property"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-600 mb-3 bg-gray-100 flex items-center justify-center cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload profile picture"
            name="avatar"
          />
          <p className="text-sm font-medium text-gray-700">Profile Picture</p>
          {errors.avatar && (
            <p className="text-xs text-red-600 mt-1">{errors.avatar}</p>
          )}
        </div>

        <FormInput
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Doe"
          icon={<User className="w-5 h-5 text-gray-400" />}
          autoComplete="name"
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="youremail@example.com"
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          autoComplete="email"
          required
        />

        <FormInput
          label="Phone Number"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="(123) 456-7890"
          icon={<Phone className="w-5 h-5 text-gray-400" />}
          autoComplete="tel"
          required
        />

        <FormInput
          label="Location"
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          placeholder="New York, NY"
          icon={<MapPin className="w-5 h-5 text-gray-400" />}
          required
        />

        <div className="relative">
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <FormInput
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Create Account
        </Button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
