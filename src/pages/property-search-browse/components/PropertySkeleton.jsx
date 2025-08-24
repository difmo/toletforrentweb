import React from 'react';

const PropertySkeleton = () => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <div className="h-6 bg-muted rounded mb-1"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
          <div className="h-4 w-12 bg-muted rounded"></div>
        </div>
        
        {/* Location */}
        <div className="h-4 bg-muted rounded w-2/3 mb-3"></div>
        
        {/* Amenities */}
        <div className="flex space-x-4 mb-3">
          <div className="h-3 bg-muted rounded w-12"></div>
          <div className="h-3 bg-muted rounded w-14"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
        
        {/* Features */}
        <div className="flex space-x-2 mb-3">
          <div className="h-6 bg-muted rounded-full w-16"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
          <div className="h-6 bg-muted rounded-full w-14"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;