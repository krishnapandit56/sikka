import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = "" }) => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const navigationItems = [
    {
      id: 'home',
      route: '/investment-dashboard',
      icon: 'Home',
      label: {
        en: 'Home',
        hi: 'होम'
      },
      tooltip: {
        en: 'Investment Dashboard',
        hi: 'निवेश डैशबोर्ड'
      }
    },
    {
      id: 'invest',
      route: '/investment-selection-purchase',
      icon: 'TrendingUp',
      label: {
        en: 'Invest',
        hi: 'निवेश'
      },
      tooltip: {
        en: 'Select & Purchase Investments',
        hi: 'निवेश चुनें और खरीदें'
      }
    },
    {
      id: 'emergency',
      route: '/emergency-fund-wallet',
      icon: 'Shield',
      label: {
        en: 'Emergency',
        hi: 'आपातकाल'
      },
      tooltip: {
        en: 'Emergency Fund Wallet',
        hi: 'आपातकालीन फंड वॉलेट'
      }
    },
    {
      id: 'learn',
      route: '/investment-learning-chatbot',
      icon: 'BookOpen',
      label: {
        en: 'Learn',
        hi: 'सीखें'
      },
      tooltip: {
        en: 'Learning & Chatbot',
        hi: 'सीखना और चैटबॉट'
      }
    },
    {
      id: 'profile',
      route: '/user-profile-settings',
      icon: 'User',
      label: {
        en: 'Profile',
        hi: 'प्रोफ़ाइल'
      },
      tooltip: {
        en: 'Profile & Settings',
        hi: 'प्रोफ़ाइल और सेटिंग्स'
      }
    }
  ];

  const isActiveRoute = (route) => {
    return location?.pathname === route;
  };

  // Don't show bottom navigation on onboarding screen
  if (location?.pathname === '/user-registration-onboarding') {
    return null;
  }

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems?.map((item) => {
          const isActive = isActiveRoute(item?.route);
          
          return (
            <Link
              key={item?.id}
              to={item?.route}
              className={`flex flex-col items-center justify-center flex-1 h-full px-1 py-2 rounded-lg transition-all duration-200 min-w-[44px] group ${
                isActive 
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              aria-label={item?.tooltip?.[currentLanguage]}
              title={item?.tooltip?.[currentLanguage]}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              <span className={`text-xs font-medium leading-none ${
                isActive ? 'font-semibold' : ''
              }`}>
                {item?.label?.[currentLanguage]}
              </span>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;