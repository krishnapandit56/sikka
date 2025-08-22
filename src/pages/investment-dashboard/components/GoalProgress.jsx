import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GoalProgress = ({ className = "" }) => {
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

  const goalData = {
    targetAmount: 50000,
    currentAmount: 13750,
    goalName: {
      en: 'Emergency Fund',
      hi: 'आपातकालीन फंड'
    },
    timeRemaining: {
      en: '8 months left',
      hi: '8 महीने बचे'
    }
  };

  const progressPercentage = (goalData?.currentAmount / goalData?.targetAmount) * 100;

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
      goalProgress: 'Goal Progress',
      target: 'Target',
      achieved: 'Achieved'
    },
    hi: {
      goalProgress: 'लक्ष्य प्रगति',
      target: 'लक्ष्य',
      achieved: 'प्राप्त'
    }
  };

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.goalProgress}
        </h3>
        <Icon name="Target" size={20} className="text-primary" />
      </div>
      {/* Goal Name */}
      <div className="mb-4">
        <h4 className="text-base font-medium text-foreground mb-1">
          {goalData?.goalName?.[currentLanguage]}
        </h4>
        <p className="text-sm text-muted-foreground">
          {goalData?.timeRemaining?.[currentLanguage]}
        </p>
      </div>
      {/* Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
              className="text-primary transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {content?.[currentLanguage]?.achieved}
            </div>
          </div>
        </div>
      </div>
      {/* Amount Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {content?.[currentLanguage]?.achieved}
          </span>
          <span className="text-sm font-medium text-foreground">
            {formatCurrency(goalData?.currentAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {content?.[currentLanguage]?.target}
          </span>
          <span className="text-sm font-medium text-foreground">
            {formatCurrency(goalData?.targetAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Remaining
          </span>
          <span className="text-sm font-medium text-primary">
            {formatCurrency(goalData?.targetAmount - goalData?.currentAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalProgress;