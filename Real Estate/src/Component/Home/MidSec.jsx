import React from 'react'

function MidSec({
    text,
    hed
}) {
  return (
    <section className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-10 lg:py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 lg:gap-12">
        {/* Left side - Title */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            {hed}
          </h1>
          <div className="relative mt-6">
            <div className="absolute left-0 w-24 h-1 bg-gray-900"></div>
          </div>
        </div>

        {/* Right side - Description */}
        <div className="max-w-xl mt-6 md:mt-0">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default MidSec