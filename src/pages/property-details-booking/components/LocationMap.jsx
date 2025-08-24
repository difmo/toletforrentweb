import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ property }) => {
  const [showExactLocation, setShowExactLocation] = useState(false);

  // Mock coordinates for the property
  const coordinates = {
    lat: property?.coordinates?.lat || 40.7128,
    lng: property?.coordinates?.lng || -74.0060
  };

  const nearbyPlaces = [
    { name: "Central Park", distance: "0.3 miles", type: "Park", icon: "Trees" },
    { name: "Whole Foods Market", distance: "0.5 miles", type: "Grocery", icon: "ShoppingCart" },
    { name: "Metro Station", distance: "0.2 miles", type: "Transport", icon: "Train" },
    { name: "Coffee Shop", distance: "0.1 miles", type: "Cafe", icon: "Coffee" },
    { name: "Gym & Fitness", distance: "0.4 miles", type: "Fitness", icon: "Dumbbell" },
    { name: "Hospital", distance: "0.8 miles", type: "Healthcare", icon: "Heart" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Where you'll be</h2>
        <button
          onClick={() => setShowExactLocation(!showExactLocation)}
          className="text-primary hover:underline text-sm font-medium"
        >
          {showExactLocation ? 'Hide exact location' : 'Show exact location'}
        </button>
      </div>
      {/* Map Container */}
      <div className="relative w-full h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={property?.title}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}&z=14&output=embed`}
          className="border-0"
        />
        
        {!showExactLocation && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 text-center shadow-elevation-2">
              <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-foreground font-medium">Approximate location</p>
              <p className="text-sm text-muted-foreground">
                Exact location shown after booking
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Location Description */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-2">{property?.neighborhood}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {property?.locationDescription || `Located in the heart of ${property?.neighborhood}, this area offers excellent connectivity and vibrant local culture. You'll find yourself surrounded by cafes, restaurants, and local attractions within walking distance.`}
          </p>
        </div>

        {/* Transportation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Car" size={16} className="text-primary" />
              <span>Getting around</span>
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Train" size={14} />
                <span>Metro station - 2 min walk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Bus" size={14} />
                <span>Bus stop - 1 min walk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Car" size={14} />
                <span>Free street parking</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>Neighborhood highlights</span>
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>• Vibrant arts and culture scene</div>
              <div>• Excellent restaurants and cafes</div>
              <div>• Safe, well-lit streets</div>
              <div>• Close to major attractions</div>
            </div>
          </div>
        </div>
      </div>
      {/* Nearby Places */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">What's nearby</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nearbyPlaces?.map((place, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={place?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{place?.name}</span>
                  <span className="text-sm text-muted-foreground">{place?.distance}</span>
                </div>
                <span className="text-xs text-muted-foreground">{place?.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Walk Score */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Walk Score</h4>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">92</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Walker's Paradise</span>
            <span className="text-success font-medium">Excellent</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Daily errands do not require a car and most things can be accomplished on foot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;