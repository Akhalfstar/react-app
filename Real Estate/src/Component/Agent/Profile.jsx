import React from 'react'

function Profile({userData}) {
  return (
    <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Profile Details</h2>
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
          <Mail className="mr-3 h-5 w-5 text-indigo-500" />
          Email Address
        </div>
        <div className="w-full md:w-2/3 text-gray-900">{userData.email}</div>
      </div>
      <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center border border-gray-100">
        <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
          <Phone className="mr-3 h-5 w-5 text-indigo-500" />
          Phone Number
        </div>
        <div className="w-full md:w-2/3 text-gray-900">{userData.phone}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
          <MapPin className="mr-3 h-5 w-5 text-indigo-500" />
          Location
        </div>
        <div className="w-full md:w-2/3 text-gray-900">{userData.location}</div>
      </div>
      <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center border border-gray-100">
        <div className="w-full md:w-1/3 font-medium text-gray-700 flex items-center mb-2 md:mb-0">
          <Calendar className="mr-3 h-5 w-5 text-indigo-500" />
          Member Since
        </div>
        <div className="w-full md:w-2/3 text-gray-900">{userData.joinDate}</div>
      </div>
      
      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Status</h3>
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
  )
}

export default Profile