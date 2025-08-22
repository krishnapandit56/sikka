import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const InvestmentConfirmation = ({ 
  investmentDetails, 
  onConfirm, 
  onCancel, 
  currentLanguage 
}) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    if (!termsAccepted) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      upi: { en: 'UPI', hi: 'UPI' },
      wallet: { en: 'Wallet', hi: 'वॉलेट' },
      debit: { en: 'Debit Card', hi: 'डेबिट कार्ड' },
      netbanking: { en: 'Net Banking', hi: 'नेट बैंकिंग' }
    };
    return methods?.[method]?.[currentLanguage] || method;
  };

  const getSIPFrequencyName = (frequency) => {
    const frequencies = {
      daily: { en: 'Daily', hi: 'दैनिक' },
      weekly: { en: 'Weekly', hi: 'साप्ताहिक' },
      monthly: { en: 'Monthly', hi: 'मासिक' }
    };
    return frequencies?.[frequency]?.[currentLanguage] || frequency;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentLanguage === 'en' ? 'Confirm Investment' : 'निवेश की पुष्टि करें'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="X" size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Investment Summary */}
        <div className="p-4 space-y-4">
          {/* Fund Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              {investmentDetails?.fund?.name}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">
                  {currentLanguage === 'en' ? 'Category' : 'श्रेणी'}
                </p>
                <p className="font-medium">{investmentDetails?.fund?.category}</p>
              </div>
              <div>
                <p className="text-gray-500">
                  {currentLanguage === 'en' ? 'Expected Returns' : 'अपेक्षित रिटर्न'}
                </p>
                <p className="font-medium text-green-600">
                  {investmentDetails?.fund?.expectedReturns}%
                </p>
              </div>
            </div>
          </div>

          {/* Investment Amount */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">
              {currentLanguage === 'en' ? 'Investment Amount' : 'निवेश राशि'}
            </span>
            <span className="font-semibold text-lg">
              {formatCurrency(investmentDetails?.amount)}
            </span>
          </div>

          {/* SIP Details */}
          {investmentDetails?.sip?.enabled && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">
                {currentLanguage === 'en' ? 'SIP Frequency' : 'SIP आवृत्ति'}
              </span>
              <span className="font-medium">
                {getSIPFrequencyName(investmentDetails?.sip?.frequency)}
              </span>
            </div>
          )}

          {/* Payment Method */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">
              {currentLanguage === 'en' ? 'Payment Method' : 'भुगतान विधि'}
            </span>
            <span className="font-medium">
              {getPaymentMethodName(investmentDetails?.paymentMethod?.method)}
            </span>
          </div>

          {/* Round-up */}
          {investmentDetails?.paymentMethod?.roundUp && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">
                {currentLanguage === 'en' ? 'Round-up' : 'राउंड-अप'}
              </span>
              <span className="font-medium text-green-600">
                {currentLanguage === 'en' ? 'Enabled' : 'सक्षम'}
              </span>
            </div>
          )}

          {/* Total Amount */}
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                {currentLanguage === 'en' ? 'Total Amount' : 'कुल राशि'}
              </span>
              <span className="font-bold text-xl text-primary">
                {formatCurrency(investmentDetails?.amount)}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e?.target?.checked)}
              label={
                currentLanguage === 'en' ?'I agree to the Terms & Conditions and Privacy Policy' :'मैं नियम और शर्तों और गोपनीयता नीति से सहमत हूं'
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={onCancel}
              disabled={isProcessing}
            >
              {currentLanguage === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={handleConfirm}
              disabled={!termsAccepted || isProcessing}
              loading={isProcessing}
              iconName={isProcessing ? undefined : 'CreditCard'}
              iconPosition="left"
            >
              {isProcessing 
                ? (currentLanguage === 'en' ? 'Processing...' : 'प्रसंस्करण...')
                : (currentLanguage === 'en' ? 'Pay Now' : 'अभी भुगतान करें')
              }
            </Button>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-800">
                {currentLanguage === 'en' ?'Your payment is secured with bank-grade encryption. We never store your payment details.' :'आपका भुगतान बैंक-ग्रेड एन्क्रिप्शन के साथ सुरक्षित है। हम कभी भी आपके भुगतान विवरण संग्रहीत नहीं करते।'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentConfirmation;