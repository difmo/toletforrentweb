import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AuthHeader = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' }
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <header className="flex items-center justify-between p-6 bg-card border-b border-border">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 hover:opacity-80 transition-hover"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Home" size={20} color="white" />
        </div>
        <span className="text-xl font-semibold text-foreground">RentSpace</span>
      </button>

      <div className="flex items-center space-x-4">
        <div className="w-32">
          <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            placeholder="Language"
          />
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;