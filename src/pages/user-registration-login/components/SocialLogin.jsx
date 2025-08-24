import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ isLoading, onSocialLogin }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => onSocialLogin(provider?.id)}
            disabled={isLoading}
            className="w-full"
            iconName={provider?.icon}
            iconPosition="left"
            iconSize={18}
          >
            {provider?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;