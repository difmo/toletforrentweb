import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/': 'Home',
    '/property-search-browse': 'Search Properties',
    '/property-details-booking': 'Property Details',
    '/owner-dashboard': 'Dashboard',
    '/property-listing-creation': 'Add Property',
    '/messages-communication': 'Messages',
    '/user-registration-login': 'Sign In',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/help': 'Help'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {item?.isLast ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <button
              onClick={() => navigate(item?.path)}
              className="hover:text-foreground transition-hover"
            >
              {item?.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;