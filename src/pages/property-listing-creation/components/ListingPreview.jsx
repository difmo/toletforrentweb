import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ListingPreview = ({ formData, propertyType }) => {
  const getPropertyTypeDisplay = () => {
    switch (propertyType) {
      case 'room': return 'Room';
      case 'apartment': return 'Apartment';
      case 'house': return 'House';
      default: return 'Property';
    }
  };

  const getMainPhoto = () => {
    const photos = formData?.photos || [];
    const coverPhoto = photos?.find(photo => photo?.id === formData?.coverPhoto);
    return coverPhoto?.url || photos?.[0]?.url || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop';
  };

  const getPropertyDetails = () => {
    const details = formData?.details || {};
    const specs = [];

    if (propertyType === 'room') {
      if (details?.roomSize) specs?.push(`${details?.roomSize} sq ft`);
      if (details?.sharedBathrooms) specs?.push(`${details?.sharedBathrooms} shared bath`);
      if (details?.totalRoommates) specs?.push(`${details?.totalRoommates} roommates`);
    } else {
      if (details?.bedrooms) specs?.push(`${details?.bedrooms} bed`);
      if (details?.bathrooms) specs?.push(`${details?.bathrooms} bath`);
      if (details?.squareFootage) specs?.push(`${details?.squareFootage} sq ft`);
    }

    return specs;
  };

  const getAmenityCount = () => {
    return formData?.amenities?.length || 0;
  };

  const getFormattedPrice = () => {
    const pricing = formData?.pricing || {};
    const currency = pricing?.currency || 'USD';
    const amount = pricing?.baseRent || '0';
    const period = pricing?.rentPeriod || 'monthly';
    
    return `${currency} ${amount}/${period?.replace('ly', '')}`;
  };

  const getLocationDisplay = () => {
    const location = formData?.location || {};
    const parts = [];
    
    if (location?.city) parts?.push(location?.city);
    if (location?.state) parts?.push(location?.state);
    if (location?.country) {
      const countryMap = {
        'us': 'USA', 'uk': 'UK', 'ca': 'Canada', 'au': 'Australia',
        'de': 'Germany', 'fr': 'France', 'in': 'India', 'jp': 'Japan'
      };
      parts?.push(countryMap?.[location?.country] || location?.country);
    }
    
    return parts?.join(', ') || 'Location not set';
  };

  const getAvailabilityDisplay = () => {
    const availability = formData?.availability || {};
    if (availability?.availableFrom) {
      const date = new Date(availability.availableFrom);
      return `Available from ${date?.toLocaleDateString()}`;
    }
    return 'Availability not set';
  };

  const isListingComplete = () => {
    return !!(
      propertyType &&
      formData?.details?.title &&
      formData?.details?.description &&
      formData?.location?.address &&
      formData?.location?.city &&
      formData?.pricing?.baseRent &&
      formData?.availability?.availableFrom
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1">
      {/* Preview Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Live Preview</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isListingComplete() ? 'bg-success' : 'bg-warning'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isListingComplete() ? 'Complete' : 'In Progress'}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          This is how your listing will appear to potential tenants
        </p>
      </div>
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getMainPhoto()}
          alt="Property preview"
          className="w-full h-full object-cover"
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
          {getPropertyTypeDisplay()}
        </div>

        {/* Photo Count */}
        {formData?.photos?.length > 0 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
            <Icon name="Camera" size={12} />
            <span>{formData?.photos?.length}</span>
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
          <span className="font-semibold text-foreground text-lg">
            {getFormattedPrice()}
          </span>
        </div>
      </div>
      {/* Property Details */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h4 className="font-semibold text-foreground text-lg leading-tight">
            {formData?.details?.title || `Beautiful ${getPropertyTypeDisplay()} for Rent`}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{getLocationDisplay()}</span>
          </div>
        </div>

        {/* Property Specs */}
        {getPropertyDetails()?.length > 0 && (
          <div className="flex items-center space-x-4">
            {getPropertyDetails()?.map((spec, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="text-sm font-medium text-foreground">{spec}</span>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {formData?.details?.description || 
             `This ${getPropertyTypeDisplay()?.toLowerCase()} offers comfortable living with modern amenities. Perfect for professionals and students looking for quality accommodation in a great location.`}
          </p>
        </div>

        {/* Amenities Preview */}
        {getAmenityCount() > 0 && (
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              {getAmenityCount()} amenities included
            </span>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={14} className="text-success" />
          <span className="text-sm text-success font-medium">
            {getAvailabilityDisplay()}
          </span>
        </div>

        {/* Furnishing Status */}
        {formData?.details?.furnishing && (
          <div className="flex items-center space-x-2">
            <Icon name="Home" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground capitalize">
              {formData?.details?.furnishing?.replace('-', ' ')}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium text-sm hover:bg-primary/90 transition-smooth">
            Contact Owner
          </button>
          <button className="p-2 border border-border rounded-lg hover:bg-muted transition-smooth">
            <Icon name="Heart" size={16} />
          </button>
          <button className="p-2 border border-border rounded-lg hover:bg-muted transition-smooth">
            <Icon name="Share" size={16} />
          </button>
        </div>
      </div>
      {/* Completion Status */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Listing Completion</span>
          <span className="text-sm text-muted-foreground">
            {isListingComplete() ? '100%' : '75%'}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: isListingComplete() ? '100%' : '75%' }}
          />
        </div>
        {!isListingComplete() && (
          <p className="text-xs text-muted-foreground mt-2">
            Complete all required fields to publish your listing
          </p>
        )}
      </div>
    </div>
  );
};

export default ListingPreview;