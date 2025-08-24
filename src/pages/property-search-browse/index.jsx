import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PropertyCard from './components/PropertyCard';
import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import PropertySkeleton from './components/PropertySkeleton';

const PropertySearchBrowse = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    availableFrom: '',
    availableTo: ''
  });

  // Mock property data
  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment with City Views",
      location: "Manhattan, New York, NY",
      price: 3500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "Apartment",
      status: "available",
      rating: 4.8,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Air Conditioning", "Furnished", "Gym", "Parking"],
      coordinates: { lat: 40.7589, lng: -73.9851 },
      availableFrom: "2025-01-01"
    },
    {
      id: 2,
      title: "Cozy Studio in Brooklyn Heights",
      location: "Brooklyn Heights, Brooklyn, NY",
      price: 2200,
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      type: "Studio",
      status: "available",
      rating: 4.5,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Kitchen", "Laundry", "Pet Friendly"],
      coordinates: { lat: 40.6962, lng: -73.9936 },
      availableFrom: "2025-01-15"
    },
    {
      id: 3,
      title: "Luxury Penthouse with Rooftop Terrace",
      location: "Upper East Side, New York, NY",
      price: 8500,
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      type: "Apartment",
      status: "available",
      rating: 4.9,
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Air Conditioning", "Furnished", "Gym", "Pool", "Balcony"],
      coordinates: { lat: 40.7736, lng: -73.9566 },
      availableFrom: "2025-02-01"
    },
    {
      id: 4,
      title: "Charming Brownstone Room",
      location: "Park Slope, Brooklyn, NY",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      area: 400,
      type: "Room",
      status: "available",
      rating: 4.3,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Kitchen", "Garden", "Pet Friendly"],
      coordinates: { lat: 40.6782, lng: -73.9776 },
      availableFrom: "2025-01-10"
    },
    {
      id: 5,
      title: "Modern Loft in SoHo",
      location: "SoHo, New York, NY",
      price: 4200,
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      type: "Apartment",
      status: "available",
      rating: 4.7,
      images: [
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Air Conditioning", "Heating", "Laundry", "Furnished"],
      coordinates: { lat: 40.7230, lng: -74.0030 },
      availableFrom: "2025-01-20"
    },
    {
      id: 6,
      title: "Spacious Family House",
      location: "Queens, New York, NY",
      price: 3200,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      type: "House",
      status: "available",
      rating: 4.6,
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
      ],
      features: ["WiFi", "Parking", "Garden", "Pet Friendly", "Laundry"],
      coordinates: { lat: 40.7282, lng: -73.7949 },
      availableFrom: "2025-02-15"
    }
  ];

  // Load properties on component mount
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Handle search from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location?.search]);

  // Filter and sort properties
  useEffect(() => {
    let filtered = [...properties];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(property =>
        property?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        property?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.location) {
      filtered = filtered?.filter(property =>
        property?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    if (filters?.minPrice) {
      filtered = filtered?.filter(property => property?.price >= parseInt(filters?.minPrice));
    }

    if (filters?.maxPrice) {
      filtered = filtered?.filter(property => property?.price <= parseInt(filters?.maxPrice));
    }

    if (filters?.propertyType) {
      filtered = filtered?.filter(property => 
        property?.type?.toLowerCase() === filters?.propertyType?.toLowerCase()
      );
    }

    if (filters?.bedrooms) {
      filtered = filtered?.filter(property => property?.bedrooms >= parseInt(filters?.bedrooms));
    }

    if (filters?.bathrooms) {
      filtered = filtered?.filter(property => property?.bathrooms >= parseInt(filters?.bathrooms));
    }

    if (filters?.amenities && filters?.amenities?.length > 0) {
      filtered = filtered?.filter(property =>
        filters?.amenities?.every(amenity => property?.features?.includes(amenity))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => new Date(b.availableFrom) - new Date(a.availableFrom));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, searchQuery, filters, sortBy]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleRemoveFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      availableFrom: '',
      availableTo: ''
    });
  }, []);

  const handleToggleFavorite = useCallback((propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites?.has(propertyId)) {
        newFavorites?.delete(propertyId);
      } else {
        newFavorites?.add(propertyId);
      }
      return newFavorites;
    });
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const handleMapPropertySelect = useCallback((property) => {
    setSelectedMapProperty(property);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb />
          
          {/* Search Header */}
          <div className="mb-6">
            <SearchHeader
              onSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Filter Chips */}
          <FilterChips
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* Filter Button */}
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setShowFilters(true)}
                className="md:hidden"
              >
                Filters
              </Button>

              {/* View Toggle */}
              <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    viewMode === 'map' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Map" size={16} />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown
              sortBy={sortBy}
              onSortChange={handleSortChange}
              resultsCount={filteredProperties?.length}
            />
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClose={() => setShowFilters(false)}
                  isMobile={false}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {viewMode === 'list' ? (
                <div className="space-y-6">
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 6 })?.map((_, index) => (
                        <PropertySkeleton key={index} />
                      ))}
                    </div>
                  ) : filteredProperties?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProperties?.map((property) => (
                        <PropertyCard
                          key={property?.id}
                          property={property}
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favorites?.has(property?.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No properties found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button variant="outline" onClick={handleClearAllFilters}>
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <MapView
                    properties={filteredProperties}
                    selectedProperty={selectedMapProperty}
                    onPropertySelect={handleMapPropertySelect}
                    onClose={() => setViewMode('list')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-0 bg-background">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowFilters(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}
      {/* Mobile Map Toggle */}
      {viewMode === 'list' && (
        <div className="fixed bottom-20 right-4 z-40 md:hidden">
          <Button
            variant="default"
            iconName="Map"
            iconPosition="left"
            onClick={() => setViewMode('map')}
            className="shadow-elevation-2"
          >
            Map View
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertySearchBrowse;