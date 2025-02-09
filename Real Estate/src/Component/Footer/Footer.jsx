const Footer = () => {
  return (
    <div className=" flex justify-center mt-15 pb-5" >
      <footer className="bg-[#282828] text-white py-16 rounded-xl max-w-7xl">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Left Side */}
          <div className="max-w-xl mb-10 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              Ready To Work With Us?
            </h2>
            <p className="text-gray-400 mb-8">
              Experience top-notch customer service and let us guide you on your property journey
            </p>
            
            {/* Email Input */}
            <div className="flex items-center max-w-md">
              <input
                type="email"
                placeholder="Write your email here"
                className="w-full bg-transparent border-b border-gray-600 py-2 px-4 focus:outline-none focus:border-[#B68D5F] text-white"
              />
              <button className="ml-4 bg-[#B68D5F] hover:bg-[#9A7B52] px-6 py-2 rounded-full flex items-center transition-colors duration-300">
                Submit
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Contact Button */}
          <div className="lg:ml-8">
            <div className="w-24 h-24 rounded-full bg-[#B68D5F] flex items-center justify-center cursor-pointer hover:bg-[#9A7B52] transition-colors duration-300">
              <svg 
                className="w-8 h-8 transform rotate-45" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Column */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full mr-2">
                  <img src="/images/logo.png" />
                </div>
                <span className="text-xl font-bold">Eastate</span>
              </div>
              <p className="text-gray-400 text-sm">
                A cutting-edge real estate agent that offers a seamless and immersive experience for finding your dream home
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Home Column */}
              <div>
                <h3 className="font-medium mb-4">Home</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Collection</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog & News</a></li>
                </ul>
              </div>

              {/* Security Column */}
              <div>
                <h3 className="font-medium mb-4">Security</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">User Agreements</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Copyright</a></li>
                </ul>
              </div>

              {/* Social Media Column */}
              <div>
                <h3 className="font-medium mb-4">Social Media</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default Footer;