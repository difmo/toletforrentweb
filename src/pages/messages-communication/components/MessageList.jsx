import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageList = ({ messages, currentUserId, onImageClick, onBookingAction }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday = messageDate?.toDateString() === now?.toDateString();
    
    if (isToday) {
      return messageDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate?.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
             ' ' + messageDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return 'Check';
      case 'delivered':
        return 'CheckCheck';
      case 'read':
        return 'CheckCheck';
      default:
        return null;
    }
  };

  const getMessageStatusColor = (status) => {
    switch (status) {
      case 'read':
        return 'text-primary';
      case 'delivered':
        return 'text-muted-foreground';
      case 'sent':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderMessage = (message) => {
    const isOwnMessage = message?.senderId === currentUserId;
    
    return (
      <div
        key={message?.id}
        className={`flex items-end space-x-2 mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      >
        {/* Avatar for received messages */}
        {!isOwnMessage && (
          <Image
            src={message?.senderAvatar}
            alt={message?.senderName}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}
        {/* Message Bubble */}
        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
          {/* Sender Name (for received messages in group chats) */}
          {!isOwnMessage && (
            <p className="text-xs text-muted-foreground mb-1 px-1">{message?.senderName}</p>
          )}

          {/* Message Content */}
          <div
            className={`rounded-2xl px-4 py-2 ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            }`}
          >
            {/* Text Message */}
            {message?.type === 'text' && (
              <p className="text-sm whitespace-pre-wrap break-words">{message?.content}</p>
            )}

            {/* Image Message */}
            {message?.type === 'image' && (
              <div className="space-y-2">
                {message?.content && (
                  <p className="text-sm whitespace-pre-wrap break-words">{message?.content}</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {message?.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => onImageClick(image)}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <Image
                        src={image?.url}
                        alt={image?.alt || `Image ${index + 1}`}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                        <Icon name="ZoomIn" size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Request */}
            {message?.type === 'booking' && (
              <div className="space-y-3">
                <p className="text-sm whitespace-pre-wrap break-words">{message?.content}</p>
                <div className="bg-card bg-opacity-20 rounded-lg p-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span className="text-sm font-medium">Booking Request</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Check-in:</strong> {message?.bookingDetails?.checkIn}</p>
                    <p><strong>Check-out:</strong> {message?.bookingDetails?.checkOut}</p>
                    <p><strong>Guests:</strong> {message?.bookingDetails?.guests}</p>
                    <p><strong>Total:</strong> ${message?.bookingDetails?.total}</p>
                  </div>
                  
                  {message?.bookingDetails?.status === 'pending' && !isOwnMessage && (
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onBookingAction(message?.id, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onBookingAction(message?.id, 'decline')}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  
                  {message?.bookingDetails?.status !== 'pending' && (
                    <div className="pt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        message?.bookingDetails?.status === 'accepted' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
                      }`}>
                        {message?.bookingDetails?.status === 'accepted' ? 'Accepted' : 'Declined'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* System Message */}
            {message?.type === 'system' && (
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={14} />
                <p className="text-sm">{message?.content}</p>
              </div>
            )}
          </div>

          {/* Message Info */}
          <div className={`flex items-center space-x-1 mt-1 px-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(message?.timestamp)}
            </span>
            {isOwnMessage && message?.status && (
              <Icon
                name={getMessageStatusIcon(message?.status)}
                size={12}
                className={getMessageStatusColor(message?.status)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDateSeparator = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday?.setDate(yesterday?.getDate() - 1);

    let dateLabel;
    if (messageDate?.toDateString() === now?.toDateString()) {
      dateLabel = 'Today';
    } else if (messageDate?.toDateString() === yesterday?.toDateString()) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = messageDate?.toLocaleDateString([], { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }

    return (
      <div className="flex items-center justify-center my-6">
        <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
          {dateLabel}
        </div>
      </div>
    );
  };

  // Group messages by date
  const groupedMessages = messages?.reduce((groups, message) => {
    const date = new Date(message.timestamp)?.toDateString();
    if (!groups?.[date]) {
      groups[date] = [];
    }
    groups?.[date]?.push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {Object.entries(groupedMessages)?.map(([date, dateMessages]) => (
        <div key={date}>
          {renderDateSeparator(date)}
          {dateMessages?.map(renderMessage)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;