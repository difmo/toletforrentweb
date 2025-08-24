import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.location) {
      active?.push({ key: 'location', label: filters?.location, value: filters?.location });
    }
    
    if (filters?.minPrice || filters?.maxPrice) {
      const priceLabel = filters?.minPrice && filters?.maxPrice 
        ? `$${filters?.minPrice} - $${filters?.maxPrice}`
        : filters?.minPrice 
        ? `$${filters?.minPrice}+`
        : `Up to $${filters?.maxPrice}`;
      active?.push({ key: 'price', label: priceLabel, value: 'price' });
    }
    
    if (filters?.propertyType) {
      const typeLabel = filters?.propertyType?.charAt(0)?.toUpperCase() + filters?.propertyType?.slice(1);
      active?.push({ key: 'propertyType', label: typeLabel, value: filters?.propertyType });
    }
    
    if (filters?.bedrooms) {
      active?.push({ key: 'bedrooms', label: `${filters?.bedrooms}+ beds`, value: filters?.bedrooms });
    }
    
    if (filters?.bathrooms) {
      active?.push({ key: 'bathrooms', label: `${filters?.bathrooms}+ baths`, value: filters?.bathrooms });
    }
    
    if (filters?.amenities && filters?.amenities?.length > 0) {
      filters?.amenities?.forEach(amenity => {
        active?.push({ key: 'amenities', label: amenity, value: amenity });
      });
    }
    
    if (filters?.availableFrom) {
      const date = new Date(filters.availableFrom)?.toLocaleDateString();
      active?.push({ key: 'availableFrom', label: `From ${date}`, value: filters?.availableFrom });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filterKey, filterValue) => {
    if (filterKey === 'price') {
      onRemoveFilter('minPrice', '');
      onRemoveFilter('maxPrice', '');
    } else if (filterKey === 'amenities') {
      const currentAmenities = filters?.amenities || [];
      const updatedAmenities = currentAmenities?.filter(a => a !== filterValue);
      onRemoveFilter('amenities', updatedAmenities);
    } else {
      onRemoveFilter(filterKey, '');
    }
  };

  return (
    <div className="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex items-center space-x-2 min-w-max">
        {activeFilters?.map((filter, index) => (
          <div
            key={`${filter?.key}-${index}`}
            className="flex items-center space-x-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm whitespace-nowrap"
          >
            <span>{filter?.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter?.key, filter?.value)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        {activeFilters?.length > 1 && (
          <button
            onClick={onClearAll}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground text-sm whitespace-nowrap transition-smooth"
          >
            <Icon name="X" size={14} />
            <span>Clear all</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;