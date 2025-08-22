import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddFundsModal = ({ currentLanguage, onClose, onConfirm }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const content = {
    en: {
      title: "Add Emergency Funds",
      subtitle: "Strengthen your financial safety net",
      amount: "Amount to Add",
      amountPlaceholder: "Enter amount",
      paymentMethod: "Payment Method",
      quickAmounts: "Quick Amounts",
      addFunds: "Add Funds",
      cancel: "Cancel",
      processing: "Processing...",
      minAmount: "Minimum ₹100",
      maxAmount: "Maximum ₹1,00,000 per transaction",
      securePayment: "Secure Payment",
      instantCredit: "Instant Credit",
      methods: {
        upi: "UPI",
        card: "Debit Card",
        netbanking: "Net Banking",
        wallet: "Wallet"
      }
    },
    hi: {
      title: "आपातकालीन फंड जोड़ें",
      subtitle: "अपना वित्तीय सुरक्षा जाल मजबूत करें",
      amount: "जोड़ने की राशि",
      amountPlaceholder: "राशि दर्ज करें",
      paymentMethod: "भुगतान विधि",
      quickAmounts: "त्वरित राशि",
      addFunds: "फंड जोड़ें",
      cancel: "रद्द करें",
      processing: "प्रसंस्करण...",
      minAmount: "न्यूनतम ₹100",
      maxAmount: "अधिकतम ₹1,00,000 प्रति लेनदेन",
      securePayment: "सुरक्षित भुगतान",
      instantCredit: "तुरंत क्रेडिट",
      methods: {
        upi: "UPI",
        card: "डेबिट कार्ड",
        netbanking: "नेट बैंकिंग",
        wallet: "वॉलेट"
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const paymentMethods = [
    { id: 'upi', icon: 'Smartphone', label: content?.[currentLanguage]?.methods?.upi },
    { id: 'card', icon: 'CreditCard', label: content?.[currentLanguage]?.methods?.card },
    { id: 'netbanking', icon: 'Building2', label: content?.[currentLanguage]?.methods?.netbanking },
    { id: 'wallet', icon: 'Wallet', label: content?.[currentLanguage]?.methods?.wallet }
  ];

  const handleConfirm = async () => {
    if (!amount || Number(amount) < 100) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm({
        amount: Number(amount),
        paymentMethod,
        timestamp: new Date()
      });
      onClose();
    }, 2000);
  };

  const isValidAmount = amount && Number(amount) >= 100 && Number(amount) <= 100000;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {content?.[currentLanguage]?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {content?.[currentLanguage]?.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <Input
            label={content?.[currentLanguage]?.amount}
            type="number"
            placeholder={content?.[currentLanguage]?.amountPlaceholder}
            value={amount}
            onChange={(e) => setAmount(e?.target?.value)}
            error={amount && Number(amount) < 100 ? content?.[currentLanguage]?.minAmount : ''}
            className="mb-4"
          />

          {/* Amount Limits */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span>{content?.[currentLanguage]?.minAmount}</span>
            <span>{content?.[currentLanguage]?.maxAmount}</span>
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {content?.[currentLanguage]?.quickAmounts}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts?.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount?.toString())}
                  className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 text-sm font-medium transition-all duration-200"
                >
                  {formatCurrency(quickAmount)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            {content?.[currentLanguage]?.paymentMethod}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods?.map((method) => (
              <button
                key={method?.id}
                onClick={() => setPaymentMethod(method?.id)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  paymentMethod === method?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={method?.icon} size={20} />
                  <span className="text-sm font-medium">{method?.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">
                {content?.[currentLanguage]?.securePayment}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                {content?.[currentLanguage]?.instantCredit}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1"
          >
            {content?.[currentLanguage]?.cancel}
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={!isValidAmount || isProcessing}
            loading={isProcessing}
            className="flex-1"
          >
            {isProcessing ? content?.[currentLanguage]?.processing : content?.[currentLanguage]?.addFunds}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;