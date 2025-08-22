import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyFundBalance = ({ currentLanguage }) => {
  const [balance, setBalance] = useState(45750);
  const [goalAmount, setGoalAmount] = useState(180000);
  const [monthlyExpenses] = useState(30000);

  const progressPercentage = Math.min((balance / goalAmount) * 100, 100);
  const monthsCovered = Math.floor(balance / monthlyExpenses);

  const content = {
    en: {
      title: "Emergency Fund Balance",
      currentBalance: "Current Balance",
      goalProgress: "Goal Progress",
      monthsCovered: "Months Covered",
      targetGoal: "Target Goal",
      safetyNet: "Safety Net Status",
      months: "months",
      of: "of",
      recommended: "6 months recommended"
    },
    hi: {
      title: "आपातकालीन फंड बैलेंस",
      currentBalance: "वर्तमान बैलेंस",
      goalProgress: "लक्ष्य प्रगति",
      monthsCovered: "महीने कवर",
      targetGoal: "लक्ष्य राशि",
      safetyNet: "सुरक्षा जाल स्थिति",
      months: "महीने",
      of: "का",
      recommended: "6 महीने अनुशंसित"
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {content?.[currentLanguage]?.title}
        </h2>
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
          <Icon name="Shield" size={20} className="text-success" />
        </div>
      </div>
      {/* Balance Display */}
      <div className="text-center mb-8">
        <div className="text-3xl font-bold text-foreground mb-2">
          {formatCurrency(balance)}
        </div>
        <p className="text-sm text-muted-foreground">
          {content?.[currentLanguage]?.currentBalance}
        </p>
      </div>
      {/* Progress Visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {content?.[currentLanguage]?.goalProgress}
          </span>
          <span className="text-sm text-muted-foreground">
            {progressPercentage?.toFixed(1)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div 
            className="bg-success h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
          </div>
        </div>

        {/* Goal Details */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(balance)} {content?.[currentLanguage]?.of} {formatCurrency(goalAmount)}
          </span>
          <span className="text-success font-medium">
            {content?.[currentLanguage]?.targetGoal}
          </span>
        </div>
      </div>
      {/* Safety Net Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {content?.[currentLanguage]?.safetyNet}
          </span>
          <div className={`flex items-center space-x-1 ${monthsCovered >= 6 ? 'text-success' : monthsCovered >= 3 ? 'text-warning' : 'text-error'}`}>
            <Icon 
              name={monthsCovered >= 6 ? "CheckCircle" : monthsCovered >= 3 ? "AlertCircle" : "XCircle"} 
              size={16} 
            />
            <span className="text-sm font-medium">
              {monthsCovered} {content?.[currentLanguage]?.months}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {content?.[currentLanguage]?.recommended}
        </p>
      </div>
    </div>
  );
};

export default EmergencyFundBalance;