import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  Home,
  User,
  Settings,
  LogOut,
  MapPin,
  Calendar,
  Mail,
  Phone,
  ChevronRight,
  Key,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { NavLink } from "react-router";

export default function Agent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [likedpro, setlikedpro] = useState(null);
  const [mypro, setmypro] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      setUser(res.data);

      const resp2 = await fetch("http://localhost:5000/api/v1/like/userlike", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!resp2.ok) {
        throw new Error("Network response was not ok");
      }
      const res2 = await resp2.json();
      setlikedpro(res2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/property/userproperties",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user properties");
      }

      const res = await response.json();
      setmypro(res.data); // Make sure `setUserProperties` is defined in your state
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };

  const isAgent = (user) => {
    return user?.role === "agent";
  };

  useEffect(() => {
    fetchUser();
    fetchUserProperties();
  }, []);

  useEffect(() => {
    // console.log(user);
    // console.log(likedpro);
    console.log(mypro);
  }, [mypro]);

  const handleLogout = async () => {
    try {
      // Implement logout functionality
      const response = await fetch(
        "http://localhost:5000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        // Redirect to login page or home page after successful logout
        window.location.href = "/login";
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout.");
    }
  };

  // Mock user data
  const userData = useMemo(() => {
    const joinDate = user?.createdAt
      ? new Date(user?.createdAt).toLocaleString("en-US", { month: "long" }) +
        " " +
        new Date(user?.createdAt).getFullYear()
      : "Loading...";

    return {
      name: user?.fullName || "Loading...",
      email: user?.email || "hello@fmail",
      phone: user?.phone || "9998887776",
      location: user?.location || "Not provided",
      joinDate,
      profileImage: user?.avatar || "Avtar",
      settings: {
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        privacy: {
          showEmail: false,
          showPhone: true,
          showLocation: true,
        },
        preferences: {
          darkMode: false,
          language: "English",
          currency: "INR",
        },
      },
    };
  }, [user]);

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Banner */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-400 to-blue-500 h-32 sm:h-48"></div>
          <div className="px-4 sm:px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center -mt-12 sm:-mt-16">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {userData.name}
                  </h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{userData.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0">
                <button
                  onClick={() => setActiveTab("settings")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition flex items-center"
                >
                  <Settings size={16} className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs and Main Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar / Tab Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white">
                <h2 className="font-semibold">Navigation</h2>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition duration-200 ${
                    activeTab === "profile"
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-3" />
                    <span>Profile Details</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={
                      activeTab === "profile"
                        ? "text-indigo-700"
                        : "text-gray-400"
                    }
                  />
                </button>
                <button
                  onClick={() => setActiveTab("likes")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition duration-200 ${
                    activeTab === "likes"
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Heart size={18} className="mr-3" />
                    <span>Liked Properties</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={
                      activeTab === "likes"
                        ? "text-indigo-700"
                        : "text-gray-400"
                    }
                  />
                </button>
                <button
                  onClick={() => setActiveTab("properties")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition duration-200 ${
                    activeTab === "properties"
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Home size={18} className="mr-3" />
                    <span>My Properties</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={
                      activeTab === "properties"
                        ? "text-indigo-700"
                        : "text-gray-400"
                    }
                  />
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition duration-200 ${
                    activeTab === "settings"
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Settings size={18} className="mr-3" />
                    <span>Settings</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={
                      activeTab === "settings"
                        ? "text-indigo-700"
                        : "text-gray-400"
                    }
                  />
                </button>
                <button
                  onClick={handleLogout}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition duration-200 ${
                    activeTab === "logout"
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    Profile Details
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
                      <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
                        <Mail className="mr-3 h-5 w-5 text-indigo-500" />
                        Email Address
                      </div>
                      <div className="w-full md:w-2/3 text-gray-900">
                        {userData.email}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center border border-gray-100">
                      <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
                        <Phone className="mr-3 h-5 w-5 text-indigo-500" />
                        Phone Number
                      </div>
                      <div className="w-full md:w-2/3 text-gray-900">
                        {userData.phone}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
                      <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
                        <MapPin className="mr-3 h-5 w-5 text-indigo-500" />
                        Location
                      </div>
                      <div className="w-full md:w-2/3 text-gray-900">
                        {userData.location}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center border border-gray-100">
                      <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
                        <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
                        Member Since
                      </div>
                      <div className="w-full md:w-2/3 text-gray-900">
                        {userData.joinDate}
                      </div>
                    </div>

                    <div className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Account Status
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Active
                        </span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Premium Member
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Verified User
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "likes" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    Liked Properties
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {likedpro.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                      >
                        <div className="relative">
                          <img
                            src={item.property.images[0]?.url}
                            alt={item.property.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute top-0 right-0 m-3">
                            <button className="bg-white p-2 rounded-full shadow-md">
                              <Heart className="h-5 w-5 text-red-500 fill-current" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <span className="text-white font-bold text-lg">
                            ₹ {item.property.price}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-indigo-600 transition">
                            {item.property.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {item.property.address || "Unknown Address"}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <span className="font-semibold">
                                {item.property.bedrooms}
                              </span>
                              <span className="mx-1">Beds</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold">
                                {item.property.bathrooms}
                              </span>
                              <span className="mx-1">Baths</span>
                            </div>
                            <div className="flex items-center">
                              <span>{item.property.area} sqft</span>
                            </div>
                          </div>
                          <NavLink to = "/Details" state={{_id : item.property._id}}>
                            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover: cursor-pointer hover:bg-indigo-700 transition flex items-center justify-center">
                              View Details
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "properties" &&
                (isAgent(user) ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                      My Properties
                    </h2>

                    <div className="mb-6 flex flex-wrap gap-4">
                      <NavLink to="/Addproperty">
                      <button
                        className="px-4 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        Add New Property
                      </button>
                      </NavLink>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                        Export Listings
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="py-3 px-4 font-semibold rounded-tl-lg">
                              Property
                            </th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 font-semibold">
                              Listed Date
                            </th>
                            <th className="py-3 px-4 font-semibold">Price</th>
                            <th className="py-3 px-4 font-semibold">Stats</th>
                            <th className="py-3 px-4 font-semibold rounded-tr-lg">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {mypro.map((property) => (
                            <tr key={property._id} className="hover:bg-gray-50">
                            <NavLink to = "/Details" state={{_id : property._id}}>
                            <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <img
                                    src={property.images[0]?.url}
                                    alt={property.title}
                                    className="w-12 h-12 rounded-md object-cover mr-3"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {property.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      N/A
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </NavLink>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    property.status === "available"
                                      ? "bg-green-100 text-green-800"
                                      : property.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {property.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-700">
                                {new Date(
                                  property.createdAt
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 font-medium text-gray-900">
                              ₹ {property.price}
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div>0 views</div>
                                  <div>0 inquiries</div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex space-x-2">
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    Edit
                                  </button>
                                  <button className="p-1 text-red-600 hover:text-red-800">
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-10 bg-red-50 text-red-700 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                      Access Denied
                    </h2>
                    <p className="text-lg">
                      You are not registered as an agent.
                    </p>
                    <p className="text-sm mt-2 text-red-500">
                      Please contact support if you think this is a mistake.
                    </p>
                  </div>
                ))}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    Account Settings
                  </h2>

                  {/* Profile Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={userData.phone}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.location}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Notification Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receive updates about new properties and messages
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={
                              userData.settings.notifications.email
                            }
                          />
                          <label
                            htmlFor="email-notifications"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                              userData.settings.notifications.email
                                ? "bg-indigo-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                userData.settings.notifications.email
                                  ? "transform translate-x-6"
                                  : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Push Notifications
                          </h4>
                          <p className="text-sm text-gray-600">
                            Get notified about activity in real-time
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            id="push-notifications"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={
                              userData.settings.notifications.push
                            }
                          />
                          <label
                            htmlFor="push-notifications"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                              userData.settings.notifications.push
                                ? "bg-indigo-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                userData.settings.notifications.push
                                  ? "transform translate-x-6"
                                  : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            SMS Notifications
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receive important alerts via text messages
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            id="sms-notifications"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={userData.settings.notifications.sms}
                          />
                          <label
                            htmlFor="sms-notifications"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                              userData.settings.notifications.sms
                                ? "bg-indigo-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                userData.settings.notifications.sms
                                  ? "transform translate-x-6"
                                  : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Privacy Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Show Email Address
                          </h4>
                          <p className="text-sm text-gray-600">
                            Display your email to other users
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            id="show-email"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={userData.settings.privacy.showEmail}
                          />
                          <label
                            htmlFor="show-email"
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                              userData.settings.privacy.showEmail
                                ? "bg-indigo-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform ${
                                userData.settings.privacy.showEmail
                                  ? "transform translate-x-6"
                                  : ""
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            Show Phone Number
                          </h4>
                          <p className="text-sm text-gray-600">
                            Make your phone number visible to others
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6">
                          <input
                            type="checkbox"
                            id="show-phone"
                            className="opacity-0 w-0 h-0"
                            defaultChecked={userData.settings.privacy.showPhone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
