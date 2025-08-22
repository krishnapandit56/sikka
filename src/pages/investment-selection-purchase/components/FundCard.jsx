import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FundCard = ({ fund, onInvest, currentLanguage }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getRiskStars = (level) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  const getRiskColor = (level) => {
    if (level <= 2) return 'text-green-600 bg-green-50';
    if (level <= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskLabel = (level) => {
    const labels = {
      en: {
        1: 'Very Low', 2: 'Low', 3: 'Moderate', 4: 'High', 5: 'Very High'
      },
      hi: {
        1: 'बहुत कम', 2: 'कम', 3: 'मध्यम', 4: 'उच्च', 5: 'बहुत उच्च'
      }
    };
    return labels?.[currentLanguage]?.[level];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Fund Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {fund?.name}
          </h3>
          <p className="text-xs text-gray-500">
            {currentLanguage === 'en' ? 'Managed by' : 'द्वारा प्रबंधित'} {fund?.manager}
          </p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(fund?.riskLevel)}`}>
          {getRiskLabel(fund?.riskLevel)}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">
            {currentLanguage === 'en' ? 'Min Investment' : 'न्यूनतम निवेश'}
          </p>
          <p className="font-semibold text-primary">₹{fund?.minInvestment}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">
            {currentLanguage === 'en' ? 'Expected Returns' : 'अपेक्षित रिटर्न'}
          </p>
          <p className="font-semibold text-green-600">{fund?.expectedReturns}%</p>
        </div>
      </div>
      {/* Risk Rating */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">
          {currentLanguage === 'en' ? 'Risk Level' : 'जोखिम स्तर'}
        </span>
        <div className="flex items-center space-x-1">
          {getRiskStars(fund?.riskLevel)}
        </div>
      </div>
      {/* Why Choose This Section */}
      <div className="mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>
            {currentLanguage === 'en' ? 'Why choose this?' : 'इसे क्यों चुनें?'}
          </span>
          <Icon 
            name={showDetails ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
          />
        </button>
        
        {showDetails && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-700 mb-2">
              {fund?.whyChoose?.[currentLanguage]}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {currentLanguage === 'en' ? 'Bank FD' : 'बैंक एफडी'}: 6.5%
              </span>
              <span className="text-green-600 font-medium">
                {currentLanguage === 'en' ? 'This Fund' : 'यह फंड'}: {fund?.expectedReturns}%
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Action Button */}
      <Button
        variant="default"
        fullWidth
        onClick={() => onInvest(fund)}
        className="text-sm"
      >
        {currentLanguage === 'en' ? 'Invest Now' : 'अभी निवेश करें'}
      </Button>
    </div>
  );
};

export default FundCard;