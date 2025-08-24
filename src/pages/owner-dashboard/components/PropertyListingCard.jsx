import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyListingCard = ({ property, onEdit, onToggleStatus, onViewAnalytics }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success text-success-foreground',
      occupied: 'bg-primary text-primary-foreground',
      maintenance: 'bg-warning text-warning-foreground',
      paused: 'bg-secondary text-secondary-foreground'
    };
    return colors?.[status] || colors?.active;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={property?.image} 
            alt={property?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground truncate">{property?.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property?.status)}`}>
              {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{property?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>{property?.price}/month</span>
            </div>
          </div>
          
          {property?.currentBooking && (
            <div className="bg-muted rounded-lg p-2 mb-3">
              <p className="text-xs text-muted-foreground">Current Tenant</p>
              <p className="text-sm font-medium text-foreground">{property?.currentBooking?.tenant}</p>
              <p className="text-xs text-muted-foreground">Until {property?.currentBooking?.endDate}</p>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Edit" 
              onClick={() => onEdit(property?.id)}
            >
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName={property?.status === 'paused' ? 'Play' : 'Pause'}
              onClick={() => onToggleStatus(property?.id)}
            >
              {property?.status === 'paused' ? 'Activate' : 'Pause'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="BarChart3"
              onClick={() => onViewAnalytics(property?.id)}
            >
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;