import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedInvestments = ({ className = "" }) => {
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

  const recommendedFunds = [
    {
      id: 1,
      name: {
        en: 'HDFC Top 100 Fund',
        hi: 'एचडीएफसी टॉप 100 फंड'
      },
      type: 'Large Cap',
      returns: '12.5%',
      risk: 'Low',
      minInvestment: 10,
      reason: {
        en: 'Perfect for beginners - invests in top 100 stable companies',
        hi: 'शुरुआती लोगों के लिए बिल्कुल सही - टॉप 100 स्थिर कंपनियों में निवेश'
      },
      whyRecommended: {
        en: 'Low risk, consistent returns, ideal for first-time investors',
        hi: 'कम जोखिम, निरंतर रिटर्न, पहली बार निवेशकों के लिए आदर्श'
      }
    },
    {
      id: 2,
      name: {
        en: 'SBI Nifty Index Fund',
        hi: 'एसबीआई निफ्टी इंडेक्स फंड'
      },
      type: 'Index Fund',
      returns: '11.8%',
      risk: 'Low',
      minInvestment: 10,
      reason: {
        en: 'Follows Nifty 50 - grows with Indian economy',
        hi: 'निफ्टी 50 का अनुसरण करता है - भारतीय अर्थव्यवस्था के साथ बढ़ता है'
      },
      whyRecommended: {
        en: 'Diversified across 50 top companies, very low fees',
        hi: '50 शीर्ष कंपनियों में विविधीकृत, बहुत कम फीस'
      }
    }
  ];

  const content = {
    en: {
      recommended: 'Recommended for You',
      basedOnProfile: 'Based on your beginner profile',
      whyThis: 'Why this fund?',
      startInvesting: 'Start with ₹10',
      viewDetails: 'View Details',
      returns: 'Returns',
      risk: 'Risk',
      minAmount: 'Min Amount'
    },
    hi: {
      recommended: 'आपके लिए सुझाया गया',
      basedOnProfile: 'आपकी शुरुआती प्रोफ़ाइल के आधार पर',
      whyThis: 'यह फंड क्यों?',
      startInvesting: '₹10 से शुरू करें',
      viewDetails: 'विवरण देखें',
      returns: 'रिटर्न',
      risk: 'जोखिम',
      minAmount: 'न्यूनतम राशि'
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            {content?.[currentLanguage]?.recommended}
          </h3>
          <Icon name="Lightbulb" size={20} className="text-warning" />
        </div>
        <p className="text-sm text-muted-foreground">
          {content?.[currentLanguage]?.basedOnProfile}
        </p>
      </div>
      {/* Recommended Funds */}
      <div className="space-y-6">
        {recommendedFunds?.map((fund) => (
          <div key={fund?.id} className="bg-muted/30 rounded-lg p-4">
            {/* Fund Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-base font-semibold text-foreground mb-1">
                  {fund?.name?.[currentLanguage]}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {fund?.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(fund?.risk)}`}>
                    {fund?.risk} Risk
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success mb-1">
                  {fund?.returns}
                </div>
                <div className="text-xs text-muted-foreground">
                  {content?.[currentLanguage]?.returns}
                </div>
              </div>
            </div>

            {/* Fund Details */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {fund?.reason?.[currentLanguage]}
              </p>
            </div>

            {/* Why Recommended */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-medium text-primary mb-1">
                    {content?.[currentLanguage]?.whyThis}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {fund?.whyRecommended?.[currentLanguage]}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {content?.[currentLanguage]?.minAmount}: ₹{fund?.minInvestment}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => console.log('View details:', fund?.name?.en)}
                >
                  {content?.[currentLanguage]?.viewDetails}
                </Button>
                <Link to="/investment-selection-purchase">
                  <Button 
                    variant="default" 
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {content?.[currentLanguage]?.startInvesting}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link 
          to="/investment-selection-purchase"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {currentLanguage === 'en' ? 'View All Investment Options →' : 'सभी निवेश विकल्प देखें →'}
        </Link>
      </div>
    </div>
  );
};

export default RecommendedInvestments;