import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClose, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    price: true,
    type: true,
    amenities: false,
    dates: false
  });

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'studio', label: 'Studio' },
    { value: 'room', label: 'Room' },
    { value: 'condo', label: 'Condo' }
  ];

  const amenitiesList = [
    'WiFi', 'Parking', 'Air Conditioning', 'Heating', 'Laundry', 'Kitchen',
    'Gym', 'Pool', 'Pet Friendly', 'Furnished', 'Balcony', 'Garden'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = localFilters?.amenities || [];
    const updatedAmenities = currentAmenities?.includes(amenity)
      ? currentAmenities?.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', updatedAmenities);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      availableFrom: '',
      availableTo: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-card ${isMobile ? 'h-full' : 'h-fit'} flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        {isMobile && (
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-smooth">
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        )}
      </div>
      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Location */}
        <FilterSection title="Location" sectionKey="location">
          <Input
            type="text"
            placeholder="Enter city, neighborhood, or address"
            value={localFilters?.location || ''}
            onChange={(e) => handleFilterChange('location', e?.target?.value)}
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min price"
              value={localFilters?.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Max price"
              value={localFilters?.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
            />
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection title="Property Type" sectionKey="type">
          <Select
            placeholder="Select property type"
            options={propertyTypes}
            value={localFilters?.propertyType || ''}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Select
              placeholder="Bedrooms"
              options={[
                { value: '1', label: '1+ bed' },
                { value: '2', label: '2+ beds' },
                { value: '3', label: '3+ beds' },
                { value: '4', label: '4+ beds' }
              ]}
              value={localFilters?.bedrooms || ''}
              onChange={(value) => handleFilterChange('bedrooms', value)}
            />
            <Select
              placeholder="Bathrooms"
              options={[
                { value: '1', label: '1+ bath' },
                { value: '2', label: '2+ baths' },
                { value: '3', label: '3+ baths' }
              ]}
              value={localFilters?.bathrooms || ''}
              onChange={(value) => handleFilterChange('bathrooms', value)}
            />
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities" sectionKey="amenities">
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList?.map((amenity) => (
              <Checkbox
                key={amenity}
                label={amenity}
                checked={(localFilters?.amenities || [])?.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                size="sm"
              />
            ))}
          </div>
        </FilterSection>

        {/* Availability Dates */}
        <FilterSection title="Availability" sectionKey="dates">
          <div className="space-y-3">
            <Input
              type="date"
              label="Available from"
              value={localFilters?.availableFrom || ''}
              onChange={(e) => handleFilterChange('availableFrom', e?.target?.value)}
            />
            <Input
              type="date"
              label="Available to"
              value={localFilters?.availableTo || ''}
              onChange={(e) => handleFilterChange('availableTo', e?.target?.value)}
            />
          </div>
        </FilterSection>
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-3">
        <Button variant="default" fullWidth onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" fullWidth onClick={clearFilters}>
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;