import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties, selectedProperty, onPropertySelect, onClose }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [zoom, setZoom] = useState(12);

  // Mock map implementation with property markers
  const PropertyMarker = ({ property, isSelected, onClick }) => {
    const markerStyle = {
      position: 'absolute',
      left: `${(property?.coordinates?.lng + 74.0060) * 10 + 50}%`,
      top: `${(40.7128 - property?.coordinates?.lat) * 10 + 50}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: isSelected ? 20 : 10
    };

    return (
      <div style={markerStyle}>
        <button
          onClick={() => onClick(property)}
          className={`relative px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
            isSelected
              ? 'bg-primary text-primary-foreground shadow-elevation-2'
              : 'bg-card text-foreground shadow-elevation-1 hover:shadow-elevation-2'
          }`}
        >
          ${property?.price}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-current"></div>
        </button>
      </div>
    );
  };

  const PropertyPopup = ({ property, onClose }) => (
    <div className="absolute bottom-4 left-4 right-4 bg-card rounded-lg shadow-elevation-3 p-4 z-30">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground flex-1 pr-2">
          {property?.title}
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex items-center space-x-1 mb-2">
        <Icon name="MapPin" size={14} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{property?.location}</span>
      </div>
      
      <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Bed" size={12} />
          <span>{property?.bedrooms} bed</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Bath" size={12} />
          <span>{property?.bathrooms} bath</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Square" size={12} />
          <span>{property?.area} sqft</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-foreground">${property?.price}</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <Button variant="default" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-muted">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 space-y-2">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
          className="w-10 h-10 bg-card shadow-elevation-1 rounded-lg flex items-center justify-center hover:shadow-elevation-2 transition-smooth"
        >
          <Icon name="Plus" size={16} className="text-foreground" />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 1, 8))}
          className="w-10 h-10 bg-card shadow-elevation-1 rounded-lg flex items-center justify-center hover:shadow-elevation-2 transition-smooth"
        >
          <Icon name="Minus" size={16} className="text-foreground" />
        </button>
      </div>
      {/* Close Button (Mobile) */}
      <div className="absolute top-4 left-4 z-20 md:hidden">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-card shadow-elevation-1 rounded-lg flex items-center justify-center hover:shadow-elevation-2 transition-smooth"
        >
          <Icon name="X" size={16} className="text-foreground" />
        </button>
      </div>
      {/* Mock Map Background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
        {/* Mock streets/roads */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-1 bg-gray-400"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-1 bg-gray-400"></div>
        </div>

        {/* Property Markers */}
        {properties?.map((property) => (
          <PropertyMarker
            key={property?.id}
            property={property}
            isSelected={selectedProperty?.id === property?.id}
            onClick={onPropertySelect}
          />
        ))}
      </div>
      {/* Property Popup */}
      {selectedProperty && (
        <PropertyPopup
          property={selectedProperty}
          onClose={() => onPropertySelect(null)}
        />
      )}
      {/* Map Attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded">
        © RentSpace Maps
      </div>
    </div>
  );
};

export default MapView;