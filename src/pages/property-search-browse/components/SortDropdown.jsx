import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'distance', label: 'Distance', icon: 'MapPin' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultsCount > 0 ? (
          <span>{resultsCount?.toLocaleString()} properties found</span>
        ) : (
          <span>No properties found</span>
        )}
      </div>
      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-smooth text-sm"
        >
          <Icon name={currentSort?.icon} size={16} className="text-muted-foreground" />
          <span className="text-foreground">Sort: {currentSort?.label}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-20 py-2">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleSortSelect(option?.value)}
                  className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-muted transition-smooth ${
                    sortBy === option?.value ? 'bg-muted text-foreground' : 'text-popover-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                  <span>{option?.label}</span>
                  {sortBy === option?.value && (
                    <Icon name="Check" size={16} className="text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;