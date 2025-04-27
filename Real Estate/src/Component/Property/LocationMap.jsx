import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function LocationPickerMap({ 
  latitude, 
  longitude, 
  zoom = 13, 
  onCoordinatesChange 
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      try {
        // Fix for default marker icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Create map with initial coordinates or default values
        const initialLat = parseFloat(latitude) || 0;
        const initialLng = parseFloat(longitude) || 0;
        const map = L.map(mapRef.current).setView(
          initialLat !== 0 && initialLng !== 0 ? [initialLat, initialLng] : [20, 0], 
          initialLat !== 0 && initialLng !== 0 ? zoom : 2
        );
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker if coordinates are provided
        if (initialLat !== 0 && initialLng !== 0) {
          markerRef.current = L.marker([initialLat, initialLng]).addTo(map);
        }
        
        // Add click handler to set/update marker
        map.on('click', function(e) {
          const { lat, lng } = e.latlng;
          
          if (markerRef.current) {
            markerRef.current.setLatLng(e.latlng);
          } else {
            markerRef.current = L.marker(e.latlng).addTo(map);
          }
          
          if (onCoordinatesChange) {
            onCoordinatesChange({
              latitude: lat.toFixed(6),
              longitude: lng.toFixed(6)
            });
          }
        });
        
        // Add current location button
        const locateControl = L.control({ position: 'topleft' });
        locateControl.onAdd = function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          const button = L.DomUtil.create('a', '', container);
          button.href = '#';
          button.title = 'Your Location';
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin: 6px;">
              <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0zm0 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3z"/>
              <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
            </svg>
          `;
          
          L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.stop(e);
            map.locate({ setView: true, maxZoom: 16 });
          });
          
          return container;
        };
        locateControl.addTo(map);
        
        // Handle location found event
        map.on('locationfound', function(e) {
          if (markerRef.current) {
            markerRef.current.setLatLng(e.latlng);
          } else {
            markerRef.current = L.marker(e.latlng).addTo(map);
          }
          
          if (onCoordinatesChange) {
            onCoordinatesChange({
              latitude: e.latlng.lat.toFixed(6), 
              longitude: e.latlng.lng.toFixed(6)
            });
          }
        });
        
        // Handle location error
        map.on('locationerror', function(e) {
          alert("Could not find your location: " + e.message);
        });
        
        // Save map instance
        mapInstanceRef.current = map;
        setMapInitialized(true);
        
        // Force resize to ensure map renders correctly
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (err) {
        console.error("Error initializing map:", err);
      }
    };
    
    initMap();
    
    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, onCoordinatesChange]);
  
  // Update marker when coordinates change externally
  useEffect(() => {
    if (!mapInitialized || !mapInstanceRef.current) return;
    
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
      }
    }
  }, [latitude, longitude, mapInitialized]);

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Using Nominatim API for geocoding (OpenStreetMap's geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}&limit=5`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Location search error:', error);
      alert('Failed to search for location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle selecting a search result
  const handleSelectLocation = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], 15);
      
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
      }
      
      if (onCoordinatesChange) {
        onCoordinatesChange({
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6)
        });
      }
    }
    
    // Clear search results after selection
    setSearchResults([]);
    setSearchValue('');
  };

  return (
    <div className="relative">
      {/* Search Control */}
      <div className="absolute top-2 right-2 z-[1000] bg-white rounded-md shadow-md p-2 w-64">
        <form onSubmit={handleSearch} className="flex flex-col">
          <div className="flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a location..."
              className="flex-1 border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={isSearching} 
              className="bg-blue-500 text-white px-2 py-1 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSearching ? 
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 
                'Search'
              }
            </button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-md shadow-md max-h-60 overflow-y-auto">
              <ul>
                {searchResults.map((result) => (
                  <li 
                    key={result.place_id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSelectLocation(result)}
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
      
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="h-full w-full rounded-lg" 
        style={{ minHeight: "400px" }}
      />
      
      {/* Coordinates Display */}
      <div className="absolute bottom-2 left-2 z-[1000] bg-white bg-opacity-90 p-2 rounded-md shadow-sm text-xs">
        <div>Latitude: {latitude || '0.000000'}</div>
        <div>Longitude: {longitude || '0.000000'}</div>
      </div>
    </div>
  );
}

export default LocationPickerMap;