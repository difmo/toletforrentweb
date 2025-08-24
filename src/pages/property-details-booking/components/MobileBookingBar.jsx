import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileBookingBar = ({ property }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleContactHost = () => {
    navigate('/messages-communication');
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  return (
    <>
      {/* Fixed Bottom Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-100 md:hidden">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-foreground">
                ${property?.pricePerNight}
              </span>
              <span className="text-sm text-muted-foreground">/ night</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="font-medium">{property?.rating}</span>
              <span className="text-muted-foreground">({property?.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleContactHost}
              iconName="MessageCircle"
            >
              Contact
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleBookNow}
            >
              {property?.instantBook ? 'Book Now' : 'Request'}
            </Button>
          </div>
        </div>
      </div>
      {/* Booking Modal - Mobile */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-200 flex items-end md:hidden">
          <div className="bg-card w-full rounded-t-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Book your stay</h3>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-6">
              {/* Price Display */}
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  ${property?.pricePerNight} <span className="text-base font-normal text-muted-foreground">/ night</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-sm mt-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="font-medium">{property?.rating}</span>
                  <span className="text-muted-foreground">({property?.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{property?.maxGuests}</div>
                  <div className="text-sm text-muted-foreground">Max guests</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{property?.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">What's included</h4>
                <div className="grid grid-cols-2 gap-3">
                  {property?.amenities?.slice(0, 6)?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  variant="default"
                  fullWidth
                  size="lg"
                  onClick={() => {
                    handleCloseModal();
                    // Scroll to booking widget on desktop or navigate to booking flow
                    const bookingWidget = document.querySelector('[data-booking-widget]');
                    if (bookingWidget) {
                      bookingWidget?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {property?.instantBook ? 'Book Instantly' : 'Request to Book'}
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    handleCloseModal();
                    handleContactHost();
                  }}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Message Host
                </Button>
              </div>

              {/* Booking Notice */}
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    {property?.instantBook ? (
                      <span>You can book this property instantly. Payment will be processed after confirmation.</span>
                    ) : (
                      <span>Send a booking request to the host. You won't be charged until they accept.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBookingBar;