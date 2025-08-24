import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import ImageGallery from './components/ImageGallery';
import PropertyInfo from './components/PropertyInfo';
import BookingWidget from './components/BookingWidget';
import LocationMap from './components/LocationMap';
import ReviewsSection from './components/ReviewsSection';
import MobileBookingBar from './components/MobileBookingBar';

const PropertyDetailsBooking = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams?.get('id') || '1';

  useEffect(() => {
    // Simulate loading property data
    const loadProperty = async () => {
      setLoading(true);
      
      // Mock property data
      const mockProperty = {
        id: propertyId,
        title: "Luxury Downtown Apartment with City Views",
        location: "Manhattan, New York, NY",
        neighborhood: "Upper East Side",
        coordinates: { lat: 40.7589, lng: -73.9851 },
        pricePerNight: 185,
        rating: 4.8,
        reviewCount: 127,
        maxGuests: 4,
        bedrooms: 2,
        bathrooms: 2,
        propertyType: "Entire apartment",
        instantBook: true,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
          "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"
        ],
        description: `Experience luxury living in this stunning 2-bedroom apartment located in the heart of Manhattan's Upper East Side. This beautifully designed space features floor-to-ceiling windows offering breathtaking city views, modern amenities, and elegant furnishings throughout.\n\nThe apartment boasts a spacious living area with comfortable seating, a fully equipped gourmet kitchen with stainless steel appliances, and two well-appointed bedrooms with premium bedding. The master bedroom includes an en-suite bathroom with a rainfall shower and luxury toiletries.\n\nPerfect for business travelers, couples, or small families looking to explore New York City in style and comfort. The building offers 24/7 concierge service, fitness center, and rooftop terrace with panoramic city views.`,
        amenities: [
          "WiFi", "Air Conditioning", "Kitchen", "Parking", "Washing Machine", 
          "TV", "Gym", "Pool", "Balcony", "Security", "Elevator", "Pet Friendly"
        ],
        houseRules: [
          "Check-in: 3:00 PM - 11:00 PM",
          "Check-out: 11:00 AM",
          "No smoking anywhere on the property",
          "No parties or events allowed",
          "Quiet hours: 10:00 PM - 8:00 AM",
          "Maximum 4 guests allowed",
          "Pets allowed with prior approval"
        ],
        safetyFeatures: [
          "Smoke detector", "Carbon monoxide detector", "Fire extinguisher",
          "First aid kit", "Security cameras (exterior)", "Secure building entry"
        ],
        host: {
          name: "Jennifer Martinez",
          joinedYear: "2019",
          rating: 4.9,
          reviewCount: 89,
          verified: true,
          avatar: "https://randomuser.me/api/portraits/women/10.jpg"
        },
        locationDescription: `Located in one of Manhattan's most prestigious neighborhoods, the Upper East Side offers a perfect blend of residential charm and urban sophistication. You'll be steps away from Central Park, world-class museums, upscale shopping, and some of the city's finest restaurants.`
      };

      // Check if property is favorited (mock check)
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorited(favorites?.includes(propertyId));

      setTimeout(() => {
        setProperty(mockProperty);
        setLoading(false);
      }, 1000);
    };

    loadProperty();
  }, [propertyId]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorited) {
      updatedFavorites = favorites?.filter(id => id !== propertyId);
    } else {
      updatedFavorites = [...favorites, propertyId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  const shareOptions = [
    { name: 'Copy Link', icon: 'Link', action: () => copyToClipboard(window.location?.href) },
    { name: 'Email', icon: 'Mail', action: () => window.open(`mailto:?subject=Check out this property&body=${window.location?.href}`) },
    { name: 'WhatsApp', icon: 'MessageCircle', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(window.location?.href)}`) },
    { name: 'Facebook', icon: 'Facebook', action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location?.href)}`) }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-64 md:h-96 bg-muted rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-16">
              <Icon name="Home" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Property not found</h2>
              <p className="text-muted-foreground mb-6">
                The property you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/property-search-browse')}
                className="text-primary hover:underline font-medium"
              >
                Browse other properties
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Search Properties', path: '/property-search-browse' },
    { label: property?.title, path: `/property-details-booking?id=${propertyId}`, isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb customItems={breadcrumbItems} />

          {/* Property Header - Mobile */}
          <div className="md:hidden mb-4">
            <h1 className="text-xl font-bold text-foreground mb-2">{property?.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="font-medium">{property?.rating}</span>
                  <span>({property?.reviewCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{property?.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name="Share" size={18} />
                </button>
                <button
                  onClick={handleFavorite}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon 
                    name="Heart" 
                    size={18} 
                    className={isFavorited ? "text-error fill-current" : ""} 
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery images={property?.images} propertyName={property?.title} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Property Information */}
            <div className="lg:col-span-2 space-y-12">
              <PropertyInfo property={property} />
              <LocationMap property={property} />
              <ReviewsSection property={property} />
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div data-booking-widget>
                <BookingWidget property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Booking Bar */}
      <MobileBookingBar property={property} />
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Share this property</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {shareOptions?.map((option) => (
                <button
                  key={option?.name}
                  onClick={option?.action}
                  className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon name={option?.icon} size={20} className="text-primary" />
                  <span className="text-foreground">{option?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsBooking;