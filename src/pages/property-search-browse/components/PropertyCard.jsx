import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, onToggleFavorite, isFavorite }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const handleCardClick = () => {
    navigate(`/property-details-booking?id=${property?.id}`);
  };

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    onToggleFavorite(property?.id);
  };

  const handleShareClick = (e) => {
    e?.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: `Check out this property: ${property?.title}`,
        url: window.location?.origin + `/property-details-booking?id=${property?.id}`
      });
    } else {
      navigator.clipboard?.writeText(window.location?.origin + `/property-details-booking?id=${property?.id}`);
    }
  };

  return (
    <div 
      className="bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property?.images?.[0]}
          alt={property?.title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoading(false)}
        />
        
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {property?.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleFavoriteClick}
            className="w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={16} 
              className={isFavorite ? "text-error fill-current" : "text-muted-foreground"} 
            />
          </button>
          <button
            onClick={handleShareClick}
            className="w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth"
          >
            <Icon name="Share" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Availability Status */}
        {property?.status === 'available' && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
              Available Now
            </span>
          </div>
        )}
      </div>
      {/* Property Details */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {property?.title}
          </h3>
          {property?.rating && (
            <div className="flex items-center space-x-1 ml-2">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{property?.rating}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-3">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{property?.location}</span>
        </div>

        {/* Amenities */}
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

        {/* Key Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property?.features?.slice(0, 3)?.map((feature, index) => (
            <span 
              key={index}
              className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {property?.features?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{property?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">${property?.price}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;