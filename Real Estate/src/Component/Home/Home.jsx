import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MidSec from "./MidSec";
import StatsSection from "./StatsSection";
import PropertyGrid from "./PropertyGrid";
import Card2 from "./Card2";
import TC from "./Testomonial/TC";

const testimonials = [
  {
    id: 1,
    name: "Rachel Hadid",
    image: "/path-to-rachel-image.jpg",
    text: "Choosing this real estate service was the best decision I ever made. Their team demonstrated exceptional professionalism and expertise. I highly recommend their services to anyone!",
    rating: 5,
  },
  {
    id: 2,
    name: "Louis Padtrige",
    image: "/path-to-louis-image.jpg",
    text: "Their expert negotiation skills helped me sell my property at a great price in no time. I would definitely work with them again.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anastasia Baldwin",
    image: "/path-to-anastasia-image.jpg",
    text: "They patiently answered all our questions, provided valuable insights, and helped us secure our dream home within our budget.",
    rating: 5,
  },
  {
    id: 4,
    name: "Harry Jenda",
    image: "/path-to-harry-image.jpg",
    text: "They presented us with a stunning selection of homes that perfectly matched our preferences. The team's attention to detail and in-depth knowledge of the local market truly impressed us!",
    rating: 5,
  },
];

const PROPERTY_DATA = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&w=250&q=80&auto=format",
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
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&w=250&q=80&auto=format",
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
    imageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&w=250&q=80&auto=format",
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

      <PropertyGrid />

      <MidSec
        text=" Stay informed and updated with the latest trends, home improvement ideas, and our clients story who have achieved their real estate dreams"
        hed="Uncover The Latest Trends And Stories"
      />

      <div className=" flex justify-center">
        <div className=" max-w-7xl h-fit grid grid-cols-1 md:grid-cols-3  gap-6 ">
          <Card2 {...PROPERTY_DATA[1]} />
          <Card2 {...PROPERTY_DATA[2]} />
          <Card2 {...PROPERTY_DATA[0]} />
        </div>
      </div>

      <div className=" flex justify-center mt-20">
        <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-6 ">
          <div className=" md:col-span-3">
            <TC {...testimonials[0]}/>
          </div>
          <div className=" col-span-1 md:col-span-2">
          <TC {...testimonials[1]} />
          </div>
          <div className=" col-span-1 md:col-span-2">
          <TC {...testimonials[2]} />
          </div>
          <div className=" col-span-1 md:col-span-3">
            <TC {...testimonials[3]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
