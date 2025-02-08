import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MidSec from "./MidSec";
import StatsSection from "./StatsSection";
import PropertyGrid from "./PropertyGrid";
import Card2 from "./Card2";

const PROPERTY_DATA = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2575&q=80",
    price: 1200000,
    address: "21 Gorham Road",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 2169,
    beds: 3,
    baths: 2,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3",
    price: 1500000,
    address: "45 Luxury Lane",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 3000,
    beds: 4,
    baths: 3,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3",
    price: 980000,
    address: "78 Window View",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 1800,
    beds: 3,
    baths: 2,
  },
];

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

      <PropertyGrid/>

      <MidSec
        text=" Stay informed and updated with the latest trends, home improvement ideas, and our clients story who have achieved their real estate dreams"
        hed="Uncover The Latest Trends And Stories"
      />

      <div className=" flex justify-center">
      <div className=" max-w-7xl h-fit grid grid-cols-1 lg:grid-cols-3  gap-6 " >
      <Card2 {...PROPERTY_DATA[1]} />
      <Card2 {...PROPERTY_DATA[2]} />
      <Card2 {...PROPERTY_DATA[0]} />

      </div>
      </div>


    </div> 
  );
}
