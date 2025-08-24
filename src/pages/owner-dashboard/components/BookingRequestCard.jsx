import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingRequestCard = ({ request, onApprove, onDecline, onViewDetails }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image 
            src={request?.tenant?.avatar} 
            alt={request?.tenant?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{request?.tenant?.name}</h4>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-muted-foreground">{request?.tenant?.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{request?.tenant?.location}</p>
        </div>
      </div>
      <div className="bg-muted rounded-lg p-3 mb-4">
        <h5 className="font-medium text-foreground mb-2">{request?.property?.title}</h5>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Check-in</p>
            <p className="font-medium text-foreground">{formatDate(request?.checkIn)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Check-out</p>
            <p className="font-medium text-foreground">{formatDate(request?.checkOut)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{calculateDuration(request?.checkIn, request?.checkOut)} days</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Amount</p>
            <p className="font-medium text-foreground">${request?.totalAmount}</p>
          </div>
        </div>
      </div>
      {request?.message && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">Message from tenant:</p>
          <p className="text-sm text-foreground bg-background rounded p-2 border border-border">
            "{request?.message}"
          </p>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Button 
          variant="default" 
          size="sm" 
          iconName="Check"
          onClick={() => onApprove(request?.id)}
          className="flex-1"
        >
          Approve
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="X"
          onClick={() => onDecline(request?.id)}
          className="flex-1"
        >
          Decline
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName="Eye"
          onClick={() => onViewDetails(request?.id)}
        >
          Details
        </Button>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Requested {new Date(request.requestedAt)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default BookingRequestCard;