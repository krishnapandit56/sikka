import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioMetrics = ({ className = "" }) => {
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

  const portfolioData = {
    totalInvested: 12500,
    currentValue: 13750,
    growthPercentage: 10.0,
    todayChange: 125,
    todayChangePercentage: 0.91
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const content = {
    en: {
      totalInvested: 'Total Invested',
      currentValue: 'Current Value',
      totalGrowth: 'Total Growth',
      todayChange: "Today\'s Change"
    },
    hi: {
      totalInvested: 'कुल निवेश',
      currentValue: 'वर्तमान मूल्य',
      totalGrowth: 'कुल वृद्धि',
      todayChange: 'आज का बदलाव'
    }
  };

  const isPositive = portfolioData?.growthPercentage >= 0;
  const isTodayPositive = portfolioData?.todayChange >= 0;

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.currentValue}
        </h2>
        <Icon 
          name="TrendingUp" 
          size={20} 
          className={isPositive ? 'text-success' : 'text-error'} 
        />
      </div>
      {/* Current Value */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-foreground mb-2">
          {formatCurrency(portfolioData?.currentValue)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {content?.[currentLanguage]?.totalInvested}: {formatCurrency(portfolioData?.totalInvested)}
          </span>
        </div>
      </div>
      {/* Growth Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Growth */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={isPositive ? 'text-success' : 'text-error'} 
            />
            <span className="text-xs text-muted-foreground">
              {content?.[currentLanguage]?.totalGrowth}
            </span>
          </div>
          <div className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
            +{formatCurrency(portfolioData?.currentValue - portfolioData?.totalInvested)}
          </div>
          <div className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? '+' : ''}{portfolioData?.growthPercentage?.toFixed(1)}%
          </div>
        </div>

        {/* Today's Change */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isTodayPositive ? "ArrowUp" : "ArrowDown"} 
              size={16} 
              className={isTodayPositive ? 'text-success' : 'text-error'} 
            />
            <span className="text-xs text-muted-foreground">
              {content?.[currentLanguage]?.todayChange}
            </span>
          </div>
          <div className={`text-lg font-semibold ${isTodayPositive ? 'text-success' : 'text-error'}`}>
            {isTodayPositive ? '+' : ''}{formatCurrency(portfolioData?.todayChange)}
          </div>
          <div className={`text-sm font-medium ${isTodayPositive ? 'text-success' : 'text-error'}`}>
            {isTodayPositive ? '+' : ''}{portfolioData?.todayChangePercentage?.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMetrics;