import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, activeConversationId, onConversationSelect, searchQuery, onSearchChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Messages', icon: 'MessageCircle' },
    { value: 'unread', label: 'Unread', icon: 'MessageCircleMore' },
    { value: 'urgent', label: 'Urgent', icon: 'AlertCircle' },
    { value: 'booking', label: 'Bookings', icon: 'Calendar' }
  ];

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.contact?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.property?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.lastMessage?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case 'unread':
        return conversation?.unreadCount > 0;
      case 'urgent':
        return conversation?.priority === 'urgent';
      case 'booking':
        return conversation?.type === 'booking';
      default:
        return true;
    }
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageDate?.toLocaleDateString();
    }
  };

  const truncateMessage = (message, maxLength = 60) => {
    if (message?.length <= maxLength) return message;
    return message?.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Messages</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSelectedFilter(option?.value)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                selectedFilter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={option?.icon} size={14} />
              <span className="hidden sm:inline">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation by inquiring about a property'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation?.id)}
                className={`w-full p-4 text-left hover:bg-muted transition-smooth ${
                  activeConversationId === conversation?.id ? 'bg-muted border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation?.contact?.avatar}
                      alt={conversation?.contact?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation?.contact?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {conversation?.contact?.name}
                      </h4>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        {conversation?.priority === 'urgent' && (
                          <Icon name="AlertCircle" size={14} className="text-error" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(conversation?.lastMessage?.timestamp)}
                        </span>
                      </div>
                    </div>

                    {/* Property Info */}
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="MapPin" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">
                        {conversation?.property?.title}
                      </span>
                    </div>

                    {/* Last Message */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {conversation?.lastMessage?.sender === 'You' && (
                          <span className="text-primary">You: </span>
                        )}
                        {truncateMessage(conversation?.lastMessage?.content)}
                      </p>
                      
                      {/* Unread Badge */}
                      {conversation?.unreadCount > 0 && (
                        <div className="flex-shrink-0 ml-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                            {conversation?.unreadCount > 9 ? '9+' : conversation?.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center space-x-2 mt-2">
                      {conversation?.type === 'booking' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                          <Icon name="Calendar" size={10} className="mr-1" />
                          Booking
                        </span>
                      )}
                      {conversation?.hasAttachment && (
                        <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                      )}
                      {conversation?.lastMessage?.status === 'read' && conversation?.lastMessage?.sender === 'You' && (
                        <Icon name="CheckCheck" size={12} className="text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;