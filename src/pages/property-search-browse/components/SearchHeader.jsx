import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock location suggestions
  const mockSuggestions = [
    "New York, NY",
    "Los Angeles, CA", 
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
    "Philadelphia, PA",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA",
    "Austin, TX",
    "Jacksonville, FL",
    "Fort Worth, TX",
    "Columbus, OH",
    "Charlotte, NC",
    "San Francisco, CA",
    "Indianapolis, IN",
    "Seattle, WA",
    "Denver, CO",
    "Boston, MA"
  ];

  useEffect(() => {
    // Get search query from URL params
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location?.search, setSearchQuery]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      )?.slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
      // Update URL with search query
      const newUrl = `/property-search-browse?q=${encodeURIComponent(searchQuery)}`;
      navigate(newUrl, { replace: true });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    const newUrl = `/property-search-browse?q=${encodeURIComponent(suggestion)}`;
    navigate(newUrl, { replace: true });
  };

  const handleInputFocus = () => {
    if (searchQuery?.length > 0 && suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by city, neighborhood, or property name..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full pl-12 pr-20 h-12 text-base"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Button type="submit" size="sm" className="h-8">
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-2 z-50 max-h-60 overflow-y-auto">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
            >
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-popover-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
      {/* Popular Searches */}
      {!searchQuery && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']?.map((city) => (
              <button
                key={city}
                onClick={() => handleSuggestionClick(city)}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-secondary hover:text-secondary-foreground transition-smooth"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;