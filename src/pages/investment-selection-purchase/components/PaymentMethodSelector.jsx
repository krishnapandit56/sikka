import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentMethodSelector = ({ onPaymentMethodChange, currentLanguage }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: {
        en: 'UPI',
        hi: 'UPI'
      },
      description: {
        en: 'Pay using UPI apps',
        hi: 'UPI ऐप्स का उपयोग करके भुगतान करें'
      },
      icon: 'Smartphone',
      popular: true
    },
    {
      id: 'wallet',
      name: {
        en: 'Wallet',
        hi: 'वॉलेट'
      },
      description: {
        en: 'Paytm, PhonePe, etc.',
        hi: 'Paytm, PhonePe, आदि'
      },
      icon: 'Wallet'
    },
    {
      id: 'debit',
      name: {
        en: 'Debit Card',
        hi: 'डेबिट कार्ड'
      },
      description: {
        en: 'Bank debit card',
        hi: 'बैंक डेबिट कार्ड'
      },
      icon: 'CreditCard'
    },
    {
      id: 'netbanking',
      name: {
        en: 'Net Banking',
        hi: 'नेट बैंकिंग'
      },
      description: {
        en: 'Online banking',
        hi: 'ऑनलाइन बैंकिंग'
      },
      icon: 'Building2'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onPaymentMethodChange({
      method: methodId,
      roundUp: roundUpEnabled
    });
  };

  const handleRoundUpToggle = (checked) => {
    setRoundUpEnabled(checked);
    onPaymentMethodChange({
      method: selectedMethod,
      roundUp: checked
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">
        {currentLanguage === 'en' ? 'Payment Method' : 'भुगतान विधि'}
      </h3>
      {/* Payment Methods */}
      <div className="space-y-3 mb-4">
        {paymentMethods?.map((method) => (
          <div
            key={method?.id}
            onClick={() => handleMethodSelect(method?.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              selectedMethod === method?.id
                ? 'bg-primary text-white' :'bg-gray-100 text-gray-600'
            }`}>
              <Icon name={method?.icon} size={16} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-sm text-gray-900">
                  {method?.name?.[currentLanguage]}
                </p>
                {method?.popular && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                    {currentLanguage === 'en' ? 'Popular' : 'लोकप्रिय'}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {method?.description?.[currentLanguage]}
              </p>
            </div>
            
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary' :'border-gray-300'
            }`}>
              {selectedMethod === method?.id && (
                <div className="w-full h-full rounded-full bg-white scale-50"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-green-600" />
          <span className="text-xs text-gray-600">SSL</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-blue-600" />
          <span className="text-xs text-gray-600">Razorpay</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} className="text-purple-600" />
          <span className="text-xs text-gray-600">PCI DSS</span>
        </div>
      </div>
      {/* Round-up Feature */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={roundUpEnabled}
            onChange={(e) => handleRoundUpToggle(e?.target?.checked)}
          />
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900 mb-1">
              {currentLanguage === 'en' ? 'Enable Round-up' : 'राउंड-अप सक्षम करें'}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              {currentLanguage === 'en' ?'Automatically invest spare change from future transactions' :'भविष्य के लेनदेन से बची हुई राशि का स्वचालित निवेश करें'
              }
            </p>
            <div className="bg-blue-50 rounded-lg p-2">
              <p className="text-xs text-blue-800">
                {currentLanguage === 'en' ?'Example: ₹97 purchase → ₹3 invested automatically' :'उदाहरण: ₹97 की खरीदारी → ₹3 स्वचालित रूप से निवेश'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;