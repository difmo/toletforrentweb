import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationStep = ({ formData, onFormChange }) => {
  const [showMap, setShowMap] = useState(false);

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'jp', label: 'Japan' }
  ];

  const neighborhoods = [
    { value: 'downtown', label: 'Downtown' },
    { value: 'suburbs', label: 'Suburbs' },
    { value: 'university', label: 'University Area' },
    { value: 'business', label: 'Business District' },
    { value: 'residential', label: 'Residential Area' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('location', { ...formData?.location, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Property Location</h3>
        <p className="text-sm text-muted-foreground">Provide the complete address of your property</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Street Address"
          type="text"
          placeholder="123 Main Street"
          value={formData?.location?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          required
        />

        <Input
          label="Apartment/Unit"
          type="text"
          placeholder="Apt 4B (optional)"
          value={formData?.location?.unit || ''}
          onChange={(e) => handleInputChange('unit', e?.target?.value)}
        />

        <Input
          label="City"
          type="text"
          placeholder="New York"
          value={formData?.location?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          required
        />

        <Input
          label="State/Province"
          type="text"
          placeholder="NY"
          value={formData?.location?.state || ''}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
          required
        />

        <Input
          label="ZIP/Postal Code"
          type="text"
          placeholder="10001"
          value={formData?.location?.zipCode || ''}
          onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
          required
        />

        <Select
          label="Country"
          options={countries}
          value={formData?.location?.country || ''}
          onChange={(value) => handleInputChange('country', value)}
          placeholder="Select country"
          required
        />
      </div>
      <Select
        label="Neighborhood Type"
        options={neighborhoods}
        value={formData?.location?.neighborhood || ''}
        onChange={(value) => handleInputChange('neighborhood', value)}
        placeholder="Select neighborhood type"
        description="This helps tenants understand the area"
      />
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-foreground">Map Preview</h4>
            <p className="text-sm text-muted-foreground">Verify your property location</p>
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
          >
            <Icon name={showMap ? "EyeOff" : "Eye"} size={16} />
            <span>{showMap ? 'Hide' : 'Show'} Map</span>
          </button>
        </div>

        {showMap && (
          <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Property Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
              className="border-0"
            />
          </div>
        )}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Location Privacy</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your exact address will only be shared with confirmed tenants. Public listings show approximate location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;