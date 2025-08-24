import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingWidget = ({ property }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = nights * property?.pricePerNight;
  const serviceFee = subtotal * 0.12;
  const cleaningFee = 25;
  const total = subtotal + serviceFee + cleaningFee;

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      alert('Booking request sent successfully! The host will respond within 24 hours.');
      navigate('/messages-communication');
    }, 2000);
  };

  const handleContactHost = () => {
    navigate('/messages-communication');
  };

  const adjustGuests = (increment) => {
    const newCount = guests + increment;
    if (newCount >= 1 && newCount <= property?.maxGuests) {
      setGuests(newCount);
    }
  };

  const today = new Date()?.toISOString()?.split('T')?.[0];

  return (
    <div className="sticky top-24">
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
        {/* Price Header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-foreground">
              ${property?.pricePerNight}
            </span>
            <span className="text-muted-foreground ml-1">/ night</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="font-medium">{property?.rating}</span>
            <span className="text-muted-foreground">({property?.reviewCount})</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4 mb-6">
          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              label="Check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e?.target?.value)}
              min={today}
              required
            />
            <Input
              type="date"
              label="Check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e?.target?.value)}
              min={checkIn || today}
              required
            />
          </div>

          {/* Guest Selector */}
          <div className="relative">
            <Input
              label="Guests"
              value={`${guests} guest${guests !== 1 ? 's' : ''}`}
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              readOnly
              className="cursor-pointer"
            />
            
            {showGuestSelector && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-2 p-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Guests</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => adjustGuests(-1)}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-smooth"
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{guests}</span>
                    <button
                      onClick={() => adjustGuests(1)}
                      disabled={guests >= property?.maxGuests}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-smooth"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Maximum {property?.maxGuests} guests
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGuestSelector(false)}
                  className="w-full mt-3"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-muted-foreground">
              <span>${property?.pricePerNight} × {nights} nights</span>
              <span>${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service fee</span>
              <span>${serviceFee?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Cleaning fee</span>
              <span>${cleaningFee?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground font-semibold text-lg pt-3 border-t border-border">
              <span>Total</span>
              <span>${total?.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            loading={isLoading}
            onClick={handleBooking}
            disabled={!checkIn || !checkOut}
          >
            {property?.instantBook ? 'Book Now' : 'Request to Book'}
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={handleContactHost}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contact Host
          </Button>
        </div>

        {/* Booking Notice */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              {property?.instantBook ? (
                <span>You can book this property instantly. You'll be charged when your reservation is confirmed.</span>
              ) : (
                <span>You won't be charged yet. The host will respond to your request within 24 hours.</span>
              )}
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:underline">
            View cancellation policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;