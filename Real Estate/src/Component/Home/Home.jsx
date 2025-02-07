import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MidSec from "./MidSec";
import StatsSection from "../Contact/StatsSection";

export default function Home() {
  return (
    <div className=" px-8 ">
      <div
        className="relative bg-cover bg-center h-screen rounded-xl opacity-80 "
        style={{ backgroundImage: 'url("images/hero3.jpg")' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 rounded-xl "></div>

        {/* Content */}
        <div className="relative z-2 flex flex-col items-center justify-center text-center h-full text-white px-4">
          {/* Title and Subtitle */}
          <h1 className="text-2xl md:text-7xl font-bold mb-4">
            Journey To Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl mb-8"></p>
          <SearchBar />
        </div>
      </div>
      <MidSec
        text="A cutting-edge real estate agent that offers a seamless and immersive experience for finding your dream home in the heart of the city"
        hed="Your Trusted Real Estate Advisors"
      />
      <StatsSection />
      <MidSec 
      text="Embark on a journey of discovery through exclusive collections of homes, luxury properties to fulfill your aspirations and inspire your imagination"
      hed="Discover Your Perfect Property Match"
      />
    </div>
  );
}
