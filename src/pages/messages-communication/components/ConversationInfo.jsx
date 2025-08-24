import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationInfo = ({ conversation, onClose }) => {
  const [activeTab, setActiveTab] = useState('property');

  if (!conversation) return null;

  const tabs = [
    { id: 'property', label: 'Property', icon: 'Home' },
    { id: 'contact', label: 'Contact', icon: 'User' },
    { id: 'media', label: 'Media', icon: 'Image' }
  ];

  const sharedMedia = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop',
      timestamp: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
      timestamp: new Date(Date.now() - 259200000)
    }
  ];

  const renderPropertyTab = () => (
    <div className="space-y-6">
      {/* Property Images */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Property Photos</h4>
        <div className="grid grid-cols-2 gap-2">
          {conversation?.property?.images?.slice(0, 4)?.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 3 && conversation?.property?.images?.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    +{conversation?.property?.images?.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Property Details</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-sm text-foreground capitalize">{conversation?.property?.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Bedrooms</span>
            <span className="text-sm text-foreground">{conversation?.property?.bedrooms}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Bathrooms</span>
            <span className="text-sm text-foreground">{conversation?.property?.bathrooms}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Area</span>
            <span className="text-sm text-foreground">{conversation?.property?.area} sq ft</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rent</span>
            <span className="text-sm font-medium text-foreground">${conversation?.property?.price}/month</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {conversation?.property?.amenities?.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-foreground">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="default" fullWidth>
          View Full Property
        </Button>
        <Button variant="outline" fullWidth>
          Schedule Viewing
        </Button>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      {/* Contact Info */}
      <div className="text-center">
        <Image
          src={conversation?.contact?.avatar}
          alt={conversation?.contact?.name}
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
        />
        <h3 className="text-lg font-medium text-foreground mb-1">
          {conversation?.contact?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {conversation?.contact?.role}
        </p>
        {conversation?.contact?.isVerified && (
          <div className="flex items-center justify-center space-x-1">
            <Icon name="BadgeCheck" size={16} className="text-primary" />
            <span className="text-sm text-primary">Verified</span>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Icon name="Mail" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{conversation?.contact?.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{conversation?.contact?.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{conversation?.contact?.location}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Joined {conversation?.contact?.joinDate}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{conversation?.contact?.properties}</div>
          <div className="text-xs text-muted-foreground">Properties</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{conversation?.contact?.rating}</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="default" fullWidth iconName="Phone" iconPosition="left">
          Call
        </Button>
        <Button variant="outline" fullWidth iconName="Video" iconPosition="left">
          Video Call
        </Button>
        <Button variant="outline" fullWidth iconName="Mail" iconPosition="left">
          Email
        </Button>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Shared Media</h4>
        <span className="text-xs text-muted-foreground">{sharedMedia?.length} items</span>
      </div>

      {sharedMedia?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No shared media yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {sharedMedia?.map((media) => (
            <div key={media?.id} className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={media?.url}
                alt="Shared media"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-medium text-foreground">Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-1 px-4 py-3 text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'property' && renderPropertyTab()}
        {activeTab === 'contact' && renderContactTab()}
        {activeTab === 'media' && renderMediaTab()}
      </div>
    </div>
  );
};

export default ConversationInfo;