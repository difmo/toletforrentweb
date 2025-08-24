import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('guest'); // 'guest', 'tenant', 'owner'
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from localStorage or context
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserType = localStorage.getItem('userType') || 'guest';
    setIsAuthenticated(authStatus);
    setUserType(storedUserType);
  }, []);

  const navigationItems = [
    {
      label: 'Search Properties',
      path: '/property-search-browse',
      icon: 'Search',
      roles: ['guest', 'tenant', 'owner'],
      primary: true
    },
    {
      label: 'Messages',
      path: '/messages-communication',
      icon: 'MessageCircle',
      roles: ['tenant', 'owner'],
      primary: true,
      badge: 3
    },
    {
      label: 'Dashboard',
      path: '/owner-dashboard',
      icon: 'LayoutDashboard',
      roles: ['owner'],
      primary: true
    },
    {
      label: 'Add Property',
      path: '/property-listing-creation',
      icon: 'Plus',
      roles: ['owner'],
      primary: true
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      roles: ['tenant', 'owner']
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle',
      roles: ['guest', 'tenant', 'owner']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userType) || item?.roles?.includes('guest')
  );

  const filteredSecondaryItems = secondaryItems?.filter(item => 
    item?.roles?.includes(userType) || item?.roles?.includes('guest')
  );

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/property-search-browse?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogin = () => {
    navigate('/user-registration-login');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserType('guest');
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100 shadow-elevation-1">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-hover"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">RentSpace</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems?.slice(0, 4)?.map((item) => (
              <button
                key={item?.path}
                onClick={() => navigate(item?.path)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item?.badge}
                  </span>
                )}
              </button>
            ))}
            
            {filteredSecondaryItems?.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </button>
                
                {isMobileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-200">
                    {filteredSecondaryItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => {
                          navigate(item?.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth md:hidden"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 pl-10"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </form>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground hidden md:block" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-200">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-popover-foreground">Account</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="default" onClick={handleLogin}>
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth md:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="border-t border-border p-4 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10"
                  autoFocus
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <nav className="py-4">
              {filteredNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => {
                    navigate(item?.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`relative flex items-center space-x-3 w-full px-6 py-3 text-left transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                  {item?.badge && (
                    <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item?.badge}
                    </span>
                  )}
                </button>
              ))}
              
              {filteredSecondaryItems?.length > 0 && (
                <div className="border-t border-border mt-4 pt-4">
                  {filteredSecondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => {
                        navigate(item?.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-6 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      {/* Bottom Tab Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100 md:hidden">
        <div className="flex items-center justify-around py-2">
          {filteredNavItems?.slice(0, 4)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => navigate(item?.path)}
              className={`relative flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label?.split(' ')?.[0]}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item?.badge}
                </span>
              )}
            </button>
          ))}
          
          <button
            onClick={() => isAuthenticated ? navigate('/profile') : handleLogin()}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-muted-foreground transition-smooth"
          >
            <Icon name="User" size={20} />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;