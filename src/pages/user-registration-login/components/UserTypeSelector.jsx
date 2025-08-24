import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTypeSelector = ({ selectedType, onTypeChange }) => {
  const userTypes = [
    {
      id: 'tenant',
      label: 'I\'m looking to rent',
      description: 'Find your perfect home',
      icon: 'Search',
      color: 'border-primary bg-primary/5'
    },
    {
      id: 'owner',
      label: 'I want to rent out my property',
      description: 'List your property for rent',
      icon: 'Home',
      color: 'border-accent bg-accent/5'
    }
  ];

  return (
    <div className="space-y-3 mb-6">
      <label className="block text-sm font-medium text-foreground">
        I am a <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 gap-3">
        {userTypes?.map((type) => (
          <button
            key={type?.id}
            type="button"
            onClick={() => onTypeChange(type?.id)}
            className={`relative flex items-start p-4 border-2 rounded-lg text-left transition-smooth hover:border-primary/50 ${
              selectedType === type?.id
                ? type?.color
                : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  selectedType === type?.id ? 'text-foreground' : 'text-foreground'
                }`}>
                  {type?.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {type?.description}
                </p>
              </div>
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === type?.id
                  ? 'border-primary bg-primary' :'border-muted-foreground'
              }`}>
                {selectedType === type?.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;