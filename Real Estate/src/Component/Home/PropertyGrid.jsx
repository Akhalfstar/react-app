import React from "react";
import PropertyCard from "./PropertyCard";
import Card2 from "./Card2";

const PROPERTY_DATA = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
    price: 2500000,
    address: "456 Modern Ave",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 3000,
    beds: 4,
    baths: 3,
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3",
    price: 850000,
    address: "789 Wooden Lane",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 1800,
    beds: 2,
    baths: 2,
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3",
    price: 950000,
    address: "101 High Rise Blvd",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 1500,
    beds: 2,
    baths: 2,
  },
];

const PropertyGrid = () => {
  return (
    <div className="flex justify-center mb-20">
  <div className="container max-w-7xl mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6">
      {/* Featured Property */}
      <div className="col-span-2 row-span-2 h-166 w-full">
        <PropertyCard {...PROPERTY_DATA[0]} />
      </div>
      
      {/* Other Properties */}
      <div className="col-span-2">
        <Card2 {...PROPERTY_DATA[1]} />
      </div>
      <div className="md:col-span-1 col-span-2">
        <Card2 {...PROPERTY_DATA[2]} />
      </div>
      <div className="md:col-span-1">
        <Card2 {...PROPERTY_DATA[3]} />
      </div>
    </div>
  </div>
</div>
  );
};

export default PropertyGrid;
