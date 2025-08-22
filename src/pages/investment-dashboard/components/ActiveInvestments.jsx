import React, { useState, useEffect } from 'react';


const ActiveInvestments = ({ className = "" }) => {
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

  const investmentData = [
    {
      id: 1,
      name: {
        en: 'Nifty 50 ETF',
        hi: 'निफ्टी 50 ईटीएफ'
      },
      type: 'ETF',
      invested: 5000,
      currentValue: 5450,
      returns: 9.0,
      chart: [45, 52, 48, 61, 55, 67, 54],
      risk: 'Low'
    },
    {
      id: 2,
      name: {
        en: 'SBI Bluechip Fund',
        hi: 'एसबीआई ब्लूचिप फंड'
      },
      type: 'Mutual Fund',
      invested: 4500,
      currentValue: 4950,
      returns: 10.0,
      chart: [40, 45, 42, 48, 52, 49, 55],
      risk: 'Medium'
    },
    {
      id: 3,
      name: {
        en: 'HDFC Index Fund',
        hi: 'एचडीएफसी इंडेक्स फंड'
      },
      type: 'Index Fund',
      invested: 3000,
      currentValue: 3350,
      returns: 11.7,
      chart: [30, 35, 32, 38, 42, 39, 45],
      risk: 'Low'
    }
  ];

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
      activeInvestments: 'Active Investments',
      viewAll: 'View All',
      invested: 'Invested',
      current: 'Current',
      returns: 'Returns'
    },
    hi: {
      activeInvestments: 'सक्रिय निवेश',
      viewAll: 'सभी देखें',
      invested: 'निवेशित',
      current: 'वर्तमान',
      returns: 'रिटर्न'
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

  const MiniChart = ({ data, isPositive }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 60;
      const y = 20 - ((value - minValue) / range) * 15;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg width="60" height="20" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={isPositive ? 'text-success' : 'text-error'}
        />
      </svg>
    );
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.activeInvestments}
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          {content?.[currentLanguage]?.viewAll}
        </button>
      </div>
      {/* Investment Cards */}
      <div className="space-y-4">
        {investmentData?.map((investment) => {
          const isPositive = investment?.returns >= 0;
          const profit = investment?.currentValue - investment?.invested;
          
          return (
            <div 
              key={investment?.id}
              className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {investment?.name?.[currentLanguage]}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(investment?.risk)}`}>
                      {investment?.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>
                      {content?.[currentLanguage]?.invested}: {formatCurrency(investment?.invested)}
                    </span>
                    <span>
                      {content?.[currentLanguage]?.current}: {formatCurrency(investment?.currentValue)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MiniChart data={investment?.chart} isPositive={isPositive} />
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-error'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(profit)}
                    </div>
                    <div className={`text-xs ${isPositive ? 'text-success' : 'text-error'}`}>
                      {isPositive ? '+' : ''}{investment?.returns?.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveInvestments;