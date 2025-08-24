import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ conversation, onBack, onToggleInfo }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!conversation) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
          <div>
            <div className="w-24 h-4 bg-muted rounded animate-pulse mb-1"></div>
            <div className="w-16 h-3 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'rented':
        return 'text-error';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'rented':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Left Section */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Back Button (Mobile) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="md:hidden flex-shrink-0"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>

        {/* Contact Avatar */}
        <div className="relative flex-shrink-0">
          <Image
            src={conversation?.contact?.avatar}
            alt={conversation?.contact?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation?.contact?.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-foreground truncate">
              {conversation?.contact?.name}
            </h3>
            {conversation?.contact?.isVerified && (
              <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
            )}
            {conversation?.priority === 'urgent' && (
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            )}
          </div>
          
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="text-xs text-muted-foreground">
              {conversation?.contact?.isOnline ? 'Online' : `Last seen ${conversation?.contact?.lastSeen}`}
            </span>
            {conversation?.contact?.isTyping && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-primary">typing...</span>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Property Info (Desktop) */}
      <div className="hidden lg:flex items-center space-x-3 px-4 border-l border-border">
        <Image
          src={conversation?.property?.image}
          alt={conversation?.property?.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate max-w-32">
            {conversation?.property?.title}
          </h4>
          <div className="flex items-center space-x-2 mt-0.5">
            <Icon 
              name={getStatusIcon(conversation?.property?.status)} 
              size={12} 
              className={getStatusColor(conversation?.property?.status)} 
            />
            <span className={`text-xs capitalize ${getStatusColor(conversation?.property?.status)}`}>
              {conversation?.property?.status}
            </span>
            <span className="text-xs text-muted-foreground">
              ${conversation?.property?.price}/month
            </span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
        {/* Video Call */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex"
          onClick={() => console.log('Start video call')}
        >
          <Icon name="Video" size={18} />
        </Button>

        {/* Phone Call */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex"
          onClick={() => console.log('Start phone call')}
        >
          <Icon name="Phone" size={18} />
        </Button>

        {/* Info Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleInfo}
          className="hidden md:flex"
        >
          <Icon name="Info" size={18} />
        </Button>

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Icon name="MoreVertical" size={18} />
          </Button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-50">
              <button
                onClick={() => {
                  console.log('View property details');
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="Home" size={16} />
                <span>View Property</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('Start video call');
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth sm:hidden"
              >
                <Icon name="Video" size={16} />
                <span>Video Call</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('Start phone call');
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth sm:hidden"
              >
                <Icon name="Phone" size={16} />
                <span>Phone Call</span>
              </button>

              <div className="border-t border-border my-2"></div>
              
              <button
                onClick={() => {
                  console.log('Block user');
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
              >
                <Icon name="UserX" size={16} />
                <span>Block User</span>
              </button>
              
              <button
                onClick={() => {
                  console.log('Report conversation');
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
              >
                <Icon name="Flag" size={16} />
                <span>Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;