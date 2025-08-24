import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PropertyInfo = ({ property }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const amenityIcons = {
    'WiFi': 'Wifi',
    'Air Conditioning': 'Wind',
    'Kitchen': 'ChefHat',
    'Parking': 'Car',
    'Washing Machine': 'Shirt',
    'TV': 'Tv',
    'Gym': 'Dumbbell',
    'Pool': 'Waves',
    'Balcony': 'Home',
    'Pet Friendly': 'Heart',
    'Security': 'Shield',
    'Elevator': 'ArrowUp'
  };

  const truncateDescription = (text, maxLength = 300) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-8">
      {/* Property Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {property?.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{property?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="font-medium">{property?.rating}</span>
                <span>({property?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
              <Icon name="Share" size={20} />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
              <Icon name="Heart" size={20} />
            </button>
          </div>
        </div>

        {/* Property Stats */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{property?.maxGuests} guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bed" size={16} />
            <span>{property?.bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bath" size={16} />
            <span>{property?.bathrooms} bathrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Home" size={16} />
            <span>{property?.propertyType}</span>
          </div>
        </div>
      </div>
      {/* Host Information */}
      <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={20} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Hosted by {property?.host?.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{property?.host?.joinedYear} on RentSpace</span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{property?.host?.rating}</span>
            </div>
            <span>{property?.host?.reviewCount} reviews</span>
            {property?.host?.verified && (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span>Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">About this place</h2>
        <div className="text-muted-foreground leading-relaxed">
          {showFullDescription ? (
            <p>{property?.description}</p>
          ) : (
            <p>{truncateDescription(property?.description)}</p>
          )}
          {property?.description?.length > 300 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:underline font-medium mt-2 block"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
      {/* Amenities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">What this place offers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property?.amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon 
                name={amenityIcons?.[amenity] || 'Check'} 
                size={20} 
                className="text-primary" 
              />
              <span className="text-foreground">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      {/* House Rules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">House rules</h2>
        <div className="space-y-3">
          {property?.houseRules?.map((rule, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-1" />
              <span className="text-muted-foreground">{rule}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Safety & Property */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Safety & property</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property?.safetyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;