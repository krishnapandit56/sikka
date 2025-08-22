import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageToggle = ({ className = "" }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('sikka-language', newLanguage);
    
    // Dispatch custom event for app-wide language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: newLanguage } 
    }));
  };

  const getLanguageLabel = () => {
    return currentLanguage === 'en' ? 'हिं' : 'EN';
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors duration-200 min-w-[44px] min-h-[44px] ${className}`}
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Hindi' : 'English'}`}
    >
      <Icon name="Globe" size={16} className="text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">
        {getLanguageLabel()}
      </span>
    </button>
  );
};

export default LanguageToggle;