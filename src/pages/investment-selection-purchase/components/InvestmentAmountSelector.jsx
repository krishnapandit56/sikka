import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvestmentAmountSelector = ({ onAmountChange, currentLanguage }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [10, 50, 100, 500];

  const handlePresetSelect = (amount) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
    onAmountChange(amount);
  };

  const handleCustomAmountChange = (e) => {
    const value = e?.target?.value;
    setCustomAmount(value);
    setIsCustom(true);
    
    const numValue = parseInt(value) || 0;
    if (numValue >= 10) {
      setSelectedAmount(numValue);
      onAmountChange(numValue);
    }
  };

  const calculateReturns = (amount, years, rate = 12) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const futureValue = amount * Math.pow(1 + monthlyRate, months);
    return Math.round(futureValue);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">
        {currentLanguage === 'en' ? 'Investment Amount' : 'निवेश राशि'}
      </h3>
      {/* Preset Amount Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetAmounts?.map((amount) => (
          <Button
            key={amount}
            variant={selectedAmount === amount && !isCustom ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetSelect(amount)}
            className="text-xs"
          >
            ₹{amount}
          </Button>
        ))}
      </div>
      {/* Custom Amount Input */}
      <div className="mb-4">
        <Input
          type="number"
          placeholder={currentLanguage === 'en' ? 'Enter custom amount (min ₹10)' : 'कस्टम राशि दर्ज करें (न्यूनतम ₹10)'}
          value={customAmount}
          onChange={handleCustomAmountChange}
          min="10"
          className="text-sm"
        />
      </div>
      {/* Projected Returns */}
      {selectedAmount >= 10 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">
            {currentLanguage === 'en' ? 'Projected Growth' : 'अनुमानित वृद्धि'}
          </h4>
          
          <div className="grid grid-cols-3 gap-3">
            {[1, 5, 10]?.map((years) => (
              <div key={years} className="text-center">
                <p className="text-xs text-gray-500 mb-1">
                  {years} {currentLanguage === 'en' ? 'Year' : 'साल'}{years > 1 ? 's' : ''}
                </p>
                <p className="font-semibold text-green-600 text-sm">
                  ₹{calculateReturns(selectedAmount, years)?.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-400">
                  +₹{(calculateReturns(selectedAmount, years) - selectedAmount)?.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Growth Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{currentLanguage === 'en' ? 'Investment' : 'निवेश'}</span>
              <span>{currentLanguage === 'en' ? '10 Year Growth' : '10 साल की वृद्धि'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentAmountSelector;