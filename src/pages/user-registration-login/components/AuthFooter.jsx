import React from 'react';

const AuthFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' }
  ];

  return (
    <footer className="mt-8 pt-6 border-t border-border">
      <div className="text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {footerLinks?.map((link, index) => (
            <React.Fragment key={link?.label}>
              <a
                href={link?.href}
                className="text-muted-foreground hover:text-foreground transition-hover"
              >
                {link?.label}
              </a>
              {index < footerLinks?.length - 1 && (
                <span className="text-muted-foreground">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>&copy; {currentYear} RentSpace. All rights reserved.</p>
          <p className="mt-1">Connecting property owners with tenants worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;