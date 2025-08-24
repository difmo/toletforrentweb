import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageNotificationCard = ({ message, onReply, onMarkAsRead }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMessageTypeIcon = (type) => {
    const icons = {
      inquiry: 'MessageCircle',
      booking: 'Calendar',
      maintenance: 'Wrench',
      payment: 'DollarSign',
      general: 'Mail'
    };
    return icons?.[type] || icons?.general;
  };

  const getMessageTypeColor = (type) => {
    const colors = {
      inquiry: 'text-primary',
      booking: 'text-success',
      maintenance: 'text-warning',
      payment: 'text-accent',
      general: 'text-muted-foreground'
    };
    return colors?.[type] || colors?.general;
  };

  return (
    <div className={`bg-card border rounded-lg p-4 shadow-elevation-1 transition-smooth hover:shadow-elevation-2 ${
      !message?.isRead ? 'border-primary bg-primary/5' : 'border-border'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image 
              src={message?.sender?.avatar} 
              alt={message?.sender?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {!message?.isRead && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-foreground truncate">{message?.sender?.name}</h4>
              <Icon 
                name={getMessageTypeIcon(message?.type)} 
                size={14} 
                className={getMessageTypeColor(message?.type)}
              />
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-1">{message?.property}</p>
          
          <p className="text-sm text-foreground line-clamp-2 mb-3">
            {message?.content}
          </p>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Reply"
              onClick={() => onReply(message?.id)}
            >
              Reply
            </Button>
            {!message?.isRead && (
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Check"
                onClick={() => onMarkAsRead(message?.id)}
              >
                Mark as Read
              </Button>
            )}
          </div>
        </div>
      </div>
      {message?.attachments && message?.attachments?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Paperclip" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {message?.attachments?.length} attachment{message?.attachments?.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageNotificationCard;