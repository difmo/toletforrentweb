import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const AmenitiesStep = ({ formData, onFormChange }) => {
  const amenityCategories = [
    {
      title: 'Essential Amenities',
      amenities: [
        { id: 'wifi', name: 'WiFi Internet', icon: 'Wifi' },
        { id: 'kitchen', name: 'Kitchen Access', icon: 'ChefHat' },
        { id: 'laundry', name: 'Laundry', icon: 'Shirt' },
        { id: 'parking', name: 'Parking', icon: 'Car' },
        { id: 'heating', name: 'Heating', icon: 'Thermometer' },
        { id: 'ac', name: 'Air Conditioning', icon: 'Snowflake' }
      ]
    },
    {
      title: 'Comfort & Convenience',
      amenities: [
        { id: 'tv', name: 'Television', icon: 'Tv' },
        { id: 'dishwasher', name: 'Dishwasher', icon: 'Utensils' },
        { id: 'microwave', name: 'Microwave', icon: 'Zap' },
        { id: 'elevator', name: 'Elevator', icon: 'ArrowUp' },
        { id: 'balcony', name: 'Balcony/Terrace', icon: 'TreePine' },
        { id: 'storage', name: 'Storage Space', icon: 'Archive' }
      ]
    },
    {
      title: 'Security & Safety',
      amenities: [
        { id: 'security', name: 'Security System', icon: 'Shield' },
        { id: 'doorman', name: 'Doorman/Concierge', icon: 'UserCheck' },
        { id: 'intercom', name: 'Intercom', icon: 'Phone' },
        { id: 'smoke_detector', name: 'Smoke Detector', icon: 'AlertTriangle' },
        { id: 'fire_extinguisher', name: 'Fire Extinguisher', icon: 'Flame' },
        { id: 'first_aid', name: 'First Aid Kit', icon: 'Heart' }
      ]
    },
    {
      title: 'Recreation & Lifestyle',
      amenities: [
        { id: 'gym', name: 'Gym/Fitness Center', icon: 'Dumbbell' },
        { id: 'pool', name: 'Swimming Pool', icon: 'Waves' },
        { id: 'garden', name: 'Garden/Yard', icon: 'Flower' },
        { id: 'bbq', name: 'BBQ Area', icon: 'Flame' },
        { id: 'workspace', name: 'Workspace/Office', icon: 'Briefcase' },
        { id: 'pet_friendly', name: 'Pet Friendly', icon: 'Heart' }
      ]
    }
  ];

  const selectedAmenities = formData?.amenities || [];

  const handleAmenityToggle = (amenityId) => {
    const updatedAmenities = selectedAmenities?.includes(amenityId)
      ? selectedAmenities?.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    
    onFormChange('amenities', updatedAmenities);
  };

  const getSelectedCount = () => selectedAmenities?.length;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Property Amenities</h3>
        <p className="text-sm text-muted-foreground">
          Select all amenities available at your property ({getSelectedCount()} selected)
        </p>
      </div>
      {amenityCategories?.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h4 className="font-medium text-foreground text-base border-b border-border pb-2">
            {category?.title}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category?.amenities?.map((amenity) => (
              <div
                key={amenity?.id}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-smooth ${
                  selectedAmenities?.includes(amenity?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => handleAmenityToggle(amenity?.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedAmenities?.includes(amenity?.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={amenity?.icon} size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">
                      {amenity?.name}
                    </span>
                  </div>
                  <Checkbox
                    checked={selectedAmenities?.includes(amenity?.id)}
                    onChange={() => handleAmenityToggle(amenity?.id)}
                    className="pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Star" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Amenity Tips</p>
            <p className="text-xs text-muted-foreground mt-1">
              Properties with 8+ amenities receive 40% more inquiries. Focus on essential amenities first, then add comfort features.
            </p>
          </div>
        </div>
      </div>
      {getSelectedCount() > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {getSelectedCount()} amenities selected
            </span>
          </div>
          <p className="text-xs text-primary/80 mt-1">
            Great selection! This will make your property more attractive to potential tenants.
          </p>
        </div>
      )}
    </div>
  );
};

export default AmenitiesStep;