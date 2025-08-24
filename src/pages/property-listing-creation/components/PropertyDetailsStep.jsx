import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertyDetailsStep = ({ formData, onFormChange, propertyType }) => {
  const furnishingOptions = [
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-furnished' },
    { value: 'fully-furnished', label: 'Fully furnished' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('details', { ...formData?.details, [field]: value });
  };

  const getCharacterCount = (text) => {
    return text ? text?.length : 0;
  };

  const getPropertyTypeFields = () => {
    switch (propertyType) {
      case 'room':
        return (
          <>
            <Input
              label="Room Size (sq ft)"
              type="number"
              placeholder="150"
              value={formData?.details?.roomSize || ''}
              onChange={(e) => handleInputChange('roomSize', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Shared Bathrooms"
                type="number"
                placeholder="1"
                min="1"
                value={formData?.details?.sharedBathrooms || ''}
                onChange={(e) => handleInputChange('sharedBathrooms', e?.target?.value)}
                required
              />
              <Input
                label="Total Roommates"
                type="number"
                placeholder="3"
                min="1"
                value={formData?.details?.totalRoommates || ''}
                onChange={(e) => handleInputChange('totalRoommates', e?.target?.value)}
                required
              />
            </div>
          </>
        );
      case 'apartment':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Bedrooms"
              type="number"
              placeholder="2"
              min="1"
              value={formData?.details?.bedrooms || ''}
              onChange={(e) => handleInputChange('bedrooms', e?.target?.value)}
              required
            />
            <Input
              label="Bathrooms"
              type="number"
              placeholder="1"
              min="1"
              value={formData?.details?.bathrooms || ''}
              onChange={(e) => handleInputChange('bathrooms', e?.target?.value)}
              required
            />
            <Input
              label="Square Footage"
              type="number"
              placeholder="800"
              value={formData?.details?.squareFootage || ''}
              onChange={(e) => handleInputChange('squareFootage', e?.target?.value)}
              required
            />
          </div>
        );
      case 'house':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Bedrooms"
                type="number"
                placeholder="3"
                min="1"
                value={formData?.details?.bedrooms || ''}
                onChange={(e) => handleInputChange('bedrooms', e?.target?.value)}
                required
              />
              <Input
                label="Bathrooms"
                type="number"
                placeholder="2"
                min="1"
                value={formData?.details?.bathrooms || ''}
                onChange={(e) => handleInputChange('bathrooms', e?.target?.value)}
                required
              />
              <Input
                label="Square Footage"
                type="number"
                placeholder="1200"
                value={formData?.details?.squareFootage || ''}
                onChange={(e) => handleInputChange('squareFootage', e?.target?.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Floors"
                type="number"
                placeholder="2"
                min="1"
                value={formData?.details?.floors || ''}
                onChange={(e) => handleInputChange('floors', e?.target?.value)}
              />
              <Input
                label="Parking Spaces"
                type="number"
                placeholder="2"
                min="0"
                value={formData?.details?.parkingSpaces || ''}
                onChange={(e) => handleInputChange('parkingSpaces', e?.target?.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Property Details</h3>
        <p className="text-sm text-muted-foreground">Provide detailed information about your property</p>
      </div>
      <Input
        label="Property Title"
        type="text"
        placeholder="Beautiful 2BR apartment in downtown"
        value={formData?.details?.title || ''}
        onChange={(e) => handleInputChange('title', e?.target?.value)}
        description="Create an attractive title that highlights key features"
        required
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Property Description *
        </label>
        <textarea
          placeholder={`Describe your ${propertyType || 'property'} in detail. Include information about the space, neighborhood, and what makes it special...`}
          value={formData?.details?.description || ''}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          className="w-full h-32 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Provide detailed information to attract quality tenants
          </p>
          <span className={`text-xs ${
            getCharacterCount(formData?.details?.description) > 500 
              ? 'text-warning' :'text-muted-foreground'
          }`}>
            {getCharacterCount(formData?.details?.description)}/1000
          </span>
        </div>
      </div>
      {getPropertyTypeFields()}
      <Select
        label="Furnishing Status"
        options={furnishingOptions}
        value={formData?.details?.furnishing || ''}
        onChange={(value) => handleInputChange('furnishing', value)}
        placeholder="Select furnishing status"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Year Built"
          type="number"
          placeholder="2015"
          min="1900"
          max={new Date()?.getFullYear()}
          value={formData?.details?.yearBuilt || ''}
          onChange={(e) => handleInputChange('yearBuilt', e?.target?.value)}
        />
        <Input
          label="Floor Number"
          type="number"
          placeholder="3"
          min="0"
          value={formData?.details?.floorNumber || ''}
          onChange={(e) => handleInputChange('floorNumber', e?.target?.value)}
          description="Ground floor = 0"
        />
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              Detailed descriptions with specific features and neighborhood highlights get 3x more inquiries than basic listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;