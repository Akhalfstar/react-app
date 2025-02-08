const StatsCard = ({ number, label, className = "" }) => (
  <div className={`p-6 ${className} flex flex-col justify-between`}>
    <h2 className="text-4xl pb-6 lg:text-5xl font-bold">{number}</h2>
    <p className="mt-2">{label}</p>
  </div>
);

const StatsSection = () => {
  return (
    <section className="">
      <div className=" grid md:gri\
       lg:grid-cols-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
        <div className="grid grid-col-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Satisfied Customers */}
          <StatsCard
            number="17K+"
            label="Satisfied Customers"
            className="bg-white rounded-xl "
          />

          {/* Years of Experience */}
          <StatsCard
            number="25+"
            label="Year of Experience"
            className="bg-gray-900 text-white rounded-xl"
          />
          <StatsCard
            number="150+"
            label="Award Winning"
            className="bg-gray-50 rounded-xl"
          />
          <StatsCard
            number="25+"
            label="Propety Collections"
            className="bg-gray-200  rounded-xl"
          />
        </div>

        {/* Description Box */}
        <div className="p-6 bg-gray-200 rounded-xl grid grid-cols-1 lg:grid-cols-2 ">
          <div className=" flex flex-col justify-between">
            <p className="text-gray-800 text-lg">
              We have witnessed the ever-evolving landscape of the real estate
              market and become a trusted partner by thousands of clients.
            </p>
            <div className="my-10">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white transform rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[3/4]">
              <img
                src="/images/midpic.jpg"
                alt="Property"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
