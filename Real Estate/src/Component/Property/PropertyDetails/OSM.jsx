import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// You need to make sure this CSS import happens somewhere in your app
// Either add it here, or in your main index.js/App.js file
import 'leaflet/dist/leaflet.css';

function PropertyMap({ latitude, longitude, zoom = 13 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Make sure Leaflet is available in the browser
    if (!window.L) {
      console.error("Leaflet is not loaded!");
      return;
    }

    // Defer map creation to ensure the DOM is ready
    const initMap = () => {
      // Check if the container exists and has dimensions
      if (!mapRef.current) {
        console.error("Map container not found");
        return;
      }

      // Fix for default marker icons
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      console.log("Creating map with coordinates:", latitude, longitude);

      // Clean up previous map instance if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      try {
        // Parse coordinates as numbers to ensure they're valid
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);

        // Validate coordinates
        if (isNaN(lat) || isNaN(lng)) {
          console.error("Invalid coordinates:", latitude, longitude);
          return;
        }

        // Create the map
        const map = L.map(mapRef.current).setView([lat, lng], zoom);
        
        // Add the tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add marker
        L.marker([lat, lng]).addTo(map);
        
        // Save instance for cleanup
        mapInstanceRef.current = map;
        
        // Force a resize event to ensure the map renders correctly
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (err) {
        console.error("Error initializing map:", err);
      }
    };

    // Initialize map with a short delay to ensure container is ready
    setTimeout(initMap, 300);
    
    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  return (
    <div 
      ref={mapRef} 
      className="h-full w-full rounded-lg" 
      style={{ minHeight: "100%", display: "block" }}
    />
  );
}

export default PropertyMap;