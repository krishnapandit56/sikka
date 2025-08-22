import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = ({ className = "" }) => {
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

  const trustData = {
    totalUsers: 250000,
    totalInvested: 15000000000,
    avgReturns: 12.5,
    securityFeatures: [
      {
        icon: 'Shield',
        title: { en: 'SEBI Regulated', hi: 'सेबी नियंत्रित' },
        description: { en: 'All funds are SEBI approved', hi: 'सभी फंड सेबी अनुमोदित हैं' }
      },
      {
        icon: 'Lock',
        title: { en: 'Bank Grade Security', hi: 'बैंक ग्रेड सुरक्षा' },
        description: { en: '256-bit SSL encryption', hi: '256-बिट SSL एन्क्रिप्शन' }
      },
      {
        icon: 'Award',
        title: { en: 'Trusted Platform', hi: 'विश्वसनीय प्लेटफॉर्म' },
        description: { en: '2.5L+ happy investors', hi: '2.5L+ खुश निवेशक' }
      }
    ]
  };

  const content = {
    en: {
      whySikka: 'Why Sikka is Safe',
      totalUsers: 'Total Users',
      totalInvested: 'Total Invested',
      avgReturns: 'Avg. Returns',
      learnMore: 'Learn More',
      safetyFirst: 'Your Safety First'
    },
    hi: {
      whySikka: 'सिक्का क्यों सुरक्षित है',
      totalUsers: 'कुल उपयोगकर्ता',
      totalInvested: 'कुल निवेश',
      avgReturns: 'औसत रिटर्न',
      learnMore: 'और जानें',
      safetyFirst: 'आपकी सुरक्षा पहले'
    }
  };

  const formatNumber = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000)?.toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000)?.toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}K`;
    }
    return num?.toString();
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.whySikka}
        </h3>
        <Icon name="ShieldCheck" size={20} className="text-success" />
      </div>
      {/* Trust Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-primary mb-1">
            {formatNumber(trustData?.totalUsers)}
          </div>
          <div className="text-xs text-muted-foreground">
            {content?.[currentLanguage]?.totalUsers}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary mb-1">
            {formatNumber(trustData?.totalInvested)}
          </div>
          <div className="text-xs text-muted-foreground">
            {content?.[currentLanguage]?.totalInvested}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-success mb-1">
            {trustData?.avgReturns}%
          </div>
          <div className="text-xs text-muted-foreground">
            {content?.[currentLanguage]?.avgReturns}
          </div>
        </div>
      </div>
      {/* Security Features */}
      <div className="space-y-4 mb-6">
        {trustData?.securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title?.[currentLanguage]}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature?.description?.[currentLanguage]}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Safety Message */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Heart" size={16} className="text-success" />
          <h4 className="text-sm font-semibold text-success">
            {content?.[currentLanguage]?.safetyFirst}
          </h4>
        </div>
        <p className="text-xs text-muted-foreground">
          {currentLanguage === 'en' ?'Your money is invested in government-approved mutual funds and ETFs. We never touch your money directly.' :'आपका पैसा सरकार द्वारा अनुमोदित म्यूचुअल फंड और ईटीएफ में निवेश किया जाता है। हम आपके पैसे को सीधे कभी नहीं छूते।'
          }
        </p>
      </div>
    </div>
  );
};

export default TrustSection;