import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyTypeSelector = ({ selectedType, onTypeSelect }) => {
  const propertyTypes = [
    {
      id: 'room',
      name: 'Room',
      description: 'Single room in shared accommodation',
      icon: 'Bed',
      features: ['Shared kitchen', 'Shared bathroom', 'Common areas']
    },
    {
      id: 'apartment',
      name: 'Apartment',
      description: 'Complete apartment unit',
      icon: 'Building',
      features: ['Private kitchen', 'Private bathroom', 'Living area']
    },
    {
      id: 'house',
      name: 'House',
      description: 'Entire house property',
      icon: 'Home',
      features: ['Multiple rooms', 'Garden/yard', 'Private entrance']
    }
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Property Type</h3>
        <p className="text-sm text-muted-foreground">Select the type of property you want to list</p>
      </div>
      <div className="grid gap-4">
        {propertyTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeSelect(type?.id)}
            className={`p-4 rounded-lg border-2 text-left transition-smooth ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{type?.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{type?.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeSelector;