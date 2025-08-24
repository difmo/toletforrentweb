import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

import ConversationList from './components/ConversationList';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ConversationInfo from './components/ConversationInfo';
import Icon from '../../components/AppIcon';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [currentUserId] = useState('user-1');

  // Mock conversations data
  const mockConversations = [
    {
      id: 'conv-1',
      contact: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        isVerified: true,
        isTyping: false,
        lastSeen: '2 hours ago',
        role: 'Property Owner',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        joinDate: 'March 2023',
        properties: 12,
        rating: 4.8
      },
      property: {
        id: 'prop-1',
        title: 'Modern Downtown Apartment',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=300&fit=crop'
        ],
        status: 'available',
        price: 2500,
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        amenities: ['WiFi', 'Parking', 'Gym', 'Pool', 'Laundry', 'Pet Friendly']
      },
      lastMessage: {
        content: 'The apartment is still available. Would you like to schedule a viewing?',
        timestamp: new Date(Date.now() - 900000),
        sender: 'Sarah Johnson',
        status: 'delivered'
      },
      unreadCount: 2,
      type: 'inquiry',
      priority: 'normal',
      hasAttachment: false
    },
    {
      id: 'conv-2',
      contact: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        isVerified: true,
        isTyping: false,
        lastSeen: '1 hour ago',
        role: 'Tenant',
        email: 'michael.chen@email.com',
        phone: '+1 (555) 987-6543',
        location: 'San Francisco, CA',
        joinDate: 'January 2024',
        properties: 0,
        rating: 4.9
      },
      property: {
        id: 'prop-2',
        title: 'Cozy Studio in Brooklyn',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
        ],
        status: 'pending',
        price: 1800,
        type: 'studio',
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        amenities: ['WiFi', 'Heating', 'Kitchen']
      },
      lastMessage: {
        content: 'I can move in next month. What documents do you need?',
        timestamp: new Date(Date.now() - 3600000),
        sender: 'You',
        status: 'read'
      },
      unreadCount: 0,
      type: 'booking',
      priority: 'urgent',
      hasAttachment: true
    },
    {
      id: 'conv-3',
      contact: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        isVerified: false,
        isTyping: true,
        lastSeen: 'now',
        role: 'Property Owner',
        email: 'emma.rodriguez@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Los Angeles, CA',
        joinDate: 'June 2023',
        properties: 5,
        rating: 4.6
      },
      property: {
        id: 'prop-3',
        title: 'Luxury Penthouse Suite',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
        ],
        status: 'rented',
        price: 4500,
        type: 'penthouse',
        bedrooms: 3,
        bathrooms: 3,
        area: 2000,
        amenities: ['WiFi', 'Parking', 'Gym', 'Pool', 'Concierge', 'Balcony']
      },
      lastMessage: {
        content: 'Thank you for your interest. Let me send you some additional photos.',
        timestamp: new Date(Date.now() - 7200000),
        sender: 'Emma Rodriguez',
        status: 'delivered'
      },
      unreadCount: 1,
      type: 'inquiry',
      priority: 'normal',
      hasAttachment: true
    }
  ];

  // Mock messages for active conversation
  const mockMessages = [
    {
      id: 'msg-1',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'Hi! I saw your inquiry about the downtown apartment. It\'s a beautiful 2-bedroom unit with great city views.',
      timestamp: new Date(Date.now() - 86400000),
      status: 'read'
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'That sounds perfect! Could you tell me more about the amenities and the neighborhood?',
      timestamp: new Date(Date.now() - 82800000),
      status: 'read'
    },
    {
      id: 'msg-3',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'image',
      content: 'Here are some photos of the apartment and the building amenities:',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
          alt: 'Living room'
        },
        {
          url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
          alt: 'Kitchen'
        }
      ],
      timestamp: new Date(Date.now() - 79200000),
      status: 'read'
    },
    {
      id: 'msg-4',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: `The building includes:\n• 24/7 concierge service\n• Fitness center and rooftop pool\n• In-unit laundry\n• Pet-friendly policy\n• Parking garage\n\nThe neighborhood is very walkable with great restaurants, cafes, and public transportation nearby.`,
      timestamp: new Date(Date.now() - 79000000),
      status: 'read'
    },
    {
      id: 'msg-5',
      senderId: 'user-1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'This looks amazing! I\'m very interested. When would be a good time for a viewing?',
      timestamp: new Date(Date.now() - 75600000),
      status: 'read'
    },
    {
      id: 'msg-6',
      senderId: 'user-1',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'booking',
      content: 'I\'d like to submit a booking request for this property.',
      bookingDetails: {
        checkIn: 'March 1, 2024',
        checkOut: 'March 1, 2025',
        guests: 2,
        total: 30000,
        status: 'pending'
      },
      timestamp: new Date(Date.now() - 72000000),
      status: 'read'
    },
    {
      id: 'msg-7',
      senderId: 'user-2',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content: 'The apartment is still available. Would you like to schedule a viewing?',
      timestamp: new Date(Date.now() - 900000),
      status: 'delivered'
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    if (mockConversations?.length > 0) {
      setActiveConversationId(mockConversations?.[0]?.id);
      setMessages(mockMessages);
    }

    // Check if mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    setMessages(mockMessages);
    
    // Mark conversation as read
    setConversations(prev => 
      prev?.map(conv => 
        conv?.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setShowInfo(false);
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'text',
      content,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Update last message in conversation
    setConversations(prev =>
      prev?.map(conv =>
        conv?.id === activeConversationId
          ? {
              ...conv,
              lastMessage: {
                content,
                timestamp: new Date(),
                sender: 'You',
                status: 'sent'
              }
            }
          : conv
      )
    );

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 3000);
  };

  const handleSendImage = (files, caption = '') => {
    const imageUrls = files?.map((file, index) => ({
      url: URL.createObjectURL(file),
      alt: `Uploaded image ${index + 1}`
    }));

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'image',
      content: caption,
      images: imageUrls,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleBookingAction = (messageId, action) => {
    setMessages(prev =>
      prev?.map(msg =>
        msg?.id === messageId && msg?.type === 'booking'
          ? {
              ...msg,
              bookingDetails: {
                ...msg?.bookingDetails,
                status: action === 'accept' ? 'accepted' : 'declined'
              }
            }
          : msg
      )
    );

    // Send system message
    const systemMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'system',
      senderName: 'System',
      type: 'system',
      content: `Booking request ${action === 'accept' ? 'accepted' : 'declined'}.`,
      timestamp: new Date(),
      status: 'sent'
    };

    setTimeout(() => {
      setMessages(prev => [...prev, systemMessage]);
    }, 500);
  };

  const handleImageClick = (image) => {
    // Open image in modal or new tab
    window.open(image?.url, '_blank');
  };

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 pb-16 md:pb-0">
        <div className="h-screen flex">
          {/* Conversation List */}
          <div className={`${
            isMobileView 
              ? (showConversationList ? 'w-full' : 'hidden') 
              : 'w-80 flex-shrink-0'
          }`}>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onConversationSelect={handleConversationSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${
            isMobileView && showConversationList ? 'hidden' : ''
          }`}>
            {activeConversation ? (
              <>
                <ChatHeader
                  conversation={activeConversation}
                  onBack={handleBackToList}
                  onToggleInfo={() => setShowInfo(!showInfo)}
                />
                
                <div className="flex flex-1 overflow-hidden">
                  <div className="flex-1 flex flex-col">
                    <MessageList
                      messages={messages}
                      currentUserId={currentUserId}
                      onImageClick={handleImageClick}
                      onBookingAction={handleBookingAction}
                    />
                    
                    <MessageInput
                      onSendMessage={handleSendMessage}
                      onSendImage={handleSendImage}
                    />
                  </div>

                  {/* Conversation Info Panel */}
                  {showInfo && !isMobileView && (
                    <ConversationInfo
                      conversation={activeConversation}
                      onClose={() => setShowInfo(false)}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-muted/30">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;