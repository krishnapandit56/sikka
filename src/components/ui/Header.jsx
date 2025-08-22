import React from 'react';
import HeaderBrand from './HeaderBrand';
import LanguageToggle from './LanguageToggle';
import NotificationIndicator from './NotificationIndicator';

const Header = ({ className = "" }) => {
  return (
    <header 
      className={`sticky top-0 z-40 w-full bg-card border-b border-border ${className}`}
      role="banner"
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - Brand */}
        <div className="flex items-center">
          <HeaderBrand />
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-2">
          <NotificationIndicator />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;