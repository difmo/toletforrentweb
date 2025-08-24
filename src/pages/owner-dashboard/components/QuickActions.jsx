import React from 'react';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add New Property',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/property-listing-creation'),
      primary: true
    },
    {
      label: 'View Messages',
      icon: 'MessageCircle',
      variant: 'outline',
      onClick: () => navigate('/messages-communication'),
      badge: 5
    },
    {
      label: 'Export Earnings',
      icon: 'Download',
      variant: 'outline',
      onClick: () => {
        // Mock export functionality
        const csvContent = `Property,Month,Earnings\nSunny Apartment,December 2024,$1200\nCozy Studio,December 2024,$800`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL?.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'earnings-report.csv';
        a?.click();
        window.URL?.revokeObjectURL(url);
      }
    },
    {
      label: 'Bulk Management',
      icon: 'Settings',
      variant: 'ghost',
      onClick: () => {
        // Mock bulk management
        alert('Bulk management tools coming soon!');
      }
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <div key={index} className="relative">
            <Button
              variant={action?.variant}
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              fullWidth
              className={action?.primary ? 'text-base py-3' : ''}
            >
              {action?.label}
            </Button>
            {action?.badge && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {action?.badge}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;