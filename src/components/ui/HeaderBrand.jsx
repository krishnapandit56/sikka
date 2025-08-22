import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBrand = ({ className = "" }) => {
  return (
    <Link 
      to="/investment-dashboard" 
      className={`flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-foreground"
        >
          <path 
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
            fill="currentColor"
          />
          <circle cx="12" cy="19" r="3" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
      <span className="text-xl font-heading font-bold text-foreground">
        Sikka
      </span>
    </Link>
  );
};

export default HeaderBrand;