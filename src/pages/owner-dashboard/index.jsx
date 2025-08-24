import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import PropertyListingCard from './components/PropertyListingCard';
import BookingRequestCard from './components/BookingRequestCard';
import MessageNotificationCard from './components/MessageNotificationCard';
import CalendarWidget from './components/CalendarWidget';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userType = localStorage.getItem('userType');
    
    if (!isAuthenticated || userType !== 'owner') {
      navigate('/user-registration-login');
      return;
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  // Mock data
  const metricsData = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: "Home",
      color: "primary"
    },
    {
      title: "Active Bookings",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: "Calendar",
      color: "success"
    },
    {
      title: "Monthly Earnings",
      value: "$8,450",
      change: "+12%",
      changeType: "positive",
      icon: "DollarSign",
      color: "accent"
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "warning"
    }
  ];

  const propertiesData = [
    {
      id: 1,
      title: "Sunny Downtown Apartment",
      location: "Manhattan, NY",
      price: "$2,500",
      status: "active",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      currentBooking: {
        tenant: "Sarah Johnson",
        endDate: "Jan 15, 2025"
      }
    },
    {
      id: 2,
      title: "Cozy Studio Near Central Park",
      location: "Upper West Side, NY",
      price: "$1,800",
      status: "occupied",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400&h=300&fit=crop",
      currentBooking: {
        tenant: "Mike Chen",
        endDate: "Mar 20, 2025"
      }
    },
    {
      id: 3,
      title: "Modern Loft in Brooklyn",
      location: "Williamsburg, NY",
      price: "$2,200",
      status: "maintenance",
      image: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Spacious Family Home",
      location: "Queens, NY",
      price: "$3,200",
      status: "paused",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    }
  ];

  const bookingRequestsData = [
    {
      id: 1,
      tenant: {
        name: "Emily Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.8,
        location: "Boston, MA"
      },
      property: {
        title: "Sunny Downtown Apartment"
      },
      checkIn: "2025-01-20",
      checkOut: "2025-04-20",
      totalAmount: 7500,
      message: "Hi! I'm relocating to NYC for work and would love to rent your beautiful apartment. I'm a clean, quiet tenant with excellent references.",
      requestedAt: "2024-12-18T10:30:00Z"
    },
    {
      id: 2,
      tenant: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4.9,
        location: "San Francisco, CA"
      },
      property: {
        title: "Modern Loft in Brooklyn"
      },
      checkIn: "2025-02-01",
      checkOut: "2025-08-01",
      totalAmount: 13200,
      message: "Looking for a long-term rental while I complete my graduate studies at NYU. Non-smoker, no pets.",
      requestedAt: "2024-12-19T14:15:00Z"
    }
  ];

  const messagesData = [
    {
      id: 1,
      sender: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      property: "Sunny Downtown Apartment",
      content: "Hi! The heating system seems to be making some noise. Could you please check it when you have a chance?",
      timestamp: "2024-12-20T09:15:00Z",
      type: "maintenance",
      isRead: false,
      attachments: ["heating_issue.jpg"]
    },
    {
      id: 2,
      sender: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg"
      },
      property: "Cozy Studio Near Central Park",
      content: "Thank you for the quick response about the lease renewal. I\'d like to extend for another year.",
      timestamp: "2024-12-20T08:30:00Z",
      type: "general",
      isRead: false
    },
    {
      id: 3,
      sender: {
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      property: "Modern Loft in Brooklyn",
      content: "I\'m interested in viewing this property. Are you available this weekend for a showing?",
      timestamp: "2024-12-19T16:45:00Z",
      type: "inquiry",
      isRead: true
    }
  ];

  const calendarBookings = [
    {
      checkIn: "2024-12-15",
      checkOut: "2025-01-15",
      status: "confirmed"
    },
    {
      checkIn: "2025-01-20",
      checkOut: "2025-02-20",
      status: "pending"
    },
    {
      checkIn: "2025-02-25",
      checkOut: "2025-03-10",
      status: "maintenance"
    }
  ];

  const handleEditProperty = (propertyId) => {
    navigate(`/property-listing-creation?edit=${propertyId}`);
  };

  const handleTogglePropertyStatus = (propertyId) => {
    // Mock toggle status
    console.log('Toggle status for property:', propertyId);
  };

  const handleViewAnalytics = (propertyId) => {
    // Mock analytics view
    console.log('View analytics for property:', propertyId);
  };

  const handleApproveBooking = (requestId) => {
    // Mock approve booking
    console.log('Approve booking request:', requestId);
  };

  const handleDeclineBooking = (requestId) => {
    // Mock decline booking
    console.log('Decline booking request:', requestId);
  };

  const handleViewBookingDetails = (requestId) => {
    // Mock view booking details
    console.log('View booking details:', requestId);
  };

  const handleReplyMessage = (messageId) => {
    navigate(`/messages-communication?reply=${messageId}`);
  };

  const handleMarkMessageAsRead = (messageId) => {
    // Mock mark as read
    console.log('Mark message as read:', messageId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 md:pb-0">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Owner Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your properties, bookings, and tenant communications
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="default" 
                iconName="Plus" 
                iconPosition="left"
                onClick={() => navigate('/property-listing-creation')}
              >
                Add New Property
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
              { id: 'properties', label: 'Properties', icon: 'Home' },
              { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
              { id: 'messages', label: 'Messages', icon: 'MessageCircle' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-background text-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Properties */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Recent Properties</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="ArrowRight"
                      onClick={() => setActiveTab('properties')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {propertiesData?.slice(0, 3)?.map((property) => (
                      <PropertyListingCard
                        key={property?.id}
                        property={property}
                        onEdit={handleEditProperty}
                        onToggleStatus={handleTogglePropertyStatus}
                        onViewAnalytics={handleViewAnalytics}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Recent Booking Requests</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="ArrowRight"
                      onClick={() => setActiveTab('bookings')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {bookingRequestsData?.slice(0, 2)?.map((request) => (
                      <BookingRequestCard
                        key={request?.id}
                        request={request}
                        onApprove={handleApproveBooking}
                        onDecline={handleDeclineBooking}
                        onViewDetails={handleViewBookingDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Messages & Calendar */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Recent Messages</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="ArrowRight"
                      onClick={() => setActiveTab('messages')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {messagesData?.slice(0, 3)?.map((message) => (
                      <MessageNotificationCard
                        key={message?.id}
                        message={message}
                        onReply={handleReplyMessage}
                        onMarkAsRead={handleMarkMessageAsRead}
                      />
                    ))}
                  </div>
                </div>

                <CalendarWidget bookings={calendarBookings} />
                <QuickActions />
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">All Properties</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" iconName="Filter" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" iconName="Download" size="sm">
                    Export
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {propertiesData?.map((property) => (
                  <PropertyListingCard
                    key={property?.id}
                    property={property}
                    onEdit={handleEditProperty}
                    onToggleStatus={handleTogglePropertyStatus}
                    onViewAnalytics={handleViewAnalytics}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Booking Requests</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" iconName="Filter" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" iconName="Calendar" size="sm">
                    Calendar View
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bookingRequestsData?.map((request) => (
                  <BookingRequestCard
                    key={request?.id}
                    request={request}
                    onApprove={handleApproveBooking}
                    onDecline={handleDeclineBooking}
                    onViewDetails={handleViewBookingDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Messages</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" iconName="Filter" size="sm">
                    Filter
                  </Button>
                  <Button variant="default" iconName="MessageCircle" size="sm">
                    Compose
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {messagesData?.map((message) => (
                  <MessageNotificationCard
                    key={message?.id}
                    message={message}
                    onReply={handleReplyMessage}
                    onMarkAsRead={handleMarkMessageAsRead}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;