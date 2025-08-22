import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ className = "" }) => {
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

  const content = {
    en: {
      quickActions: 'Quick Actions',
      investNow: 'Invest ₹10',
      startSIP: 'Start SIP',
      emergency: 'Emergency Fund',
      investDesc: 'Quick investment',
      sipDesc: 'Auto investing',
      emergencyDesc: 'Instant access'
    },
    hi: {
      quickActions: 'त्वरित कार्य',
      investNow: '₹10 निवेश करें',
      startSIP: 'SIP शुरू करें',
      emergency: 'आपातकालीन फंड',
      investDesc: 'त्वरित निवेश',
      sipDesc: 'ऑटो निवेश',
      emergencyDesc: 'तत्काल पहुंच'
    }
  };

  const quickActions = [
    {
      id: 'invest',
      title: content?.[currentLanguage]?.investNow,
      description: content?.[currentLanguage]?.investDesc,
      icon: 'Plus',
      route: '/investment-selection-purchase',
      variant: 'default',
      color: 'bg-primary text-primary-foreground'
    },
    {
      id: 'sip',
      title: content?.[currentLanguage]?.startSIP,
      description: content?.[currentLanguage]?.sipDesc,
      icon: 'Repeat',
      route: '/investment-selection-purchase',
      variant: 'outline',
      color: 'bg-secondary/10 text-secondary border-secondary/20'
    },
    {
      id: 'emergency',
      title: content?.[currentLanguage]?.emergency,
      description: content?.[currentLanguage]?.emergencyDesc,
      icon: 'Shield',
      route: '/emergency-fund-wallet',
      variant: 'outline',
      color: 'bg-accent/10 text-accent border-accent/20'
    }
  ];

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.quickActions}
        </h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <Link 
            key={action?.id}
            to={action?.route}
            className="block"
          >
            <div className={`${action?.color} rounded-lg p-4 hover:opacity-90 transition-all duration-200 cursor-pointer group min-h-[100px] flex flex-col justify-center`}>
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon 
                    name={action?.icon} 
                    size={24} 
                    className="text-current" 
                  />
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold mb-1">
                  {action?.title}
                </h4>
                <p className="text-xs opacity-80">
                  {action?.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Additional Quick Investment */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              {currentLanguage === 'en' ? 'Quick Invest' : 'त्वरित निवेश'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Invest spare change instantly' : 'तुरंत बचत का निवेश करें'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log('Invest ₹10')}
            >
              ₹10
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log('Invest ₹50')}
            >
              ₹50
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log('Invest ₹100')}
            >
              ₹100
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;