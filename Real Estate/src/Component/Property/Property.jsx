import React, { useState , useEffect } from 'react'
import PropertyCard from '../Home/PropertyCard';


const PROPERTY_DATA = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3",
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
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&w=250&q=80&auto=format",
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
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&w=250&q=80&auto=format",
    price: 950000,
    address: "101 High Rise Blvd",
    city: "Belmont",
    zipCode: "MA 02478",
    squareFeet: 1500,
    beds: 2,
    baths: 2,
  },
];

// Get all properties
// store in array 
// show all properties in UI

function Property() {
  const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    


  const fetchProperties = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/property/search');
        if (!response.success) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllProperties(data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};
  
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className='flex justify-center' >
    <div className=' max-w-7xl' >
      <div className=' grid grid-cols-2 gap-8 ' >
        {
          allProperties.map( (pro) =>{
            return <PropertyCard {...pro} />
          })
        }
      </div>
    </div> 
    </div>
    </>
  )
}

export default Property