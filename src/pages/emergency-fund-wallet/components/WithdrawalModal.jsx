import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WithdrawalModal = ({ currentLanguage, onClose, onConfirm, availableBalance }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const content = {
    en: {
      title: "Emergency Withdrawal",
      step1Title: "Withdrawal Details",
      step2Title: "Confirm Withdrawal",
      step3Title: "Processing...",
      amount: "Withdrawal Amount",
      amountPlaceholder: "Enter amount to withdraw",
      reason: "Reason (Optional)",
      reasonPlaceholder: "Medical emergency, job loss, etc.",
      availableBalance: "Available Balance",
      processingTime: "Processing Time: 2 minutes",
      bankAccount: "Bank Account",
      confirmDetails: "Confirm withdrawal details",
      processing: "Processing your withdrawal...",
      success: "Withdrawal Successful!",
      next: "Next",
      confirm: "Confirm Withdrawal",
      cancel: "Cancel",
      quickAmounts: "Quick Amounts",
      maxAmount: "Max Amount",
      instantTransfer: "Instant Transfer",
      secureTransaction: "Secure Transaction"
    },
    hi: {
      title: "आपातकालीन निकासी",
      step1Title: "निकासी विवरण",
      step2Title: "निकासी की पुष्टि करें",
      step3Title: "प्रसंस्करण...",
      amount: "निकासी राशि",
      amountPlaceholder: "निकासी राशि दर्ज करें",
      reason: "कारण (वैकल्पिक)",
      reasonPlaceholder: "मेडिकल इमरजेंसी, नौकरी छूटना, आदि।",
      availableBalance: "उपलब्ध बैलेंस",
      processingTime: "प्रसंस्करण समय: 2 मिनट",
      bankAccount: "बैंक खाता",
      confirmDetails: "निकासी विवरण की पुष्टि करें",
      processing: "आपकी निकासी प्रसंस्करण हो रही है...",
      success: "निकासी सफल!",
      next: "आगे",
      confirm: "निकासी की पुष्टि करें",
      cancel: "रद्द करें",
      quickAmounts: "त्वरित राशि",
      maxAmount: "अधिकतम राशि",
      instantTransfer: "तुरंत स्थानांतरण",
      secureTransaction: "सुरक्षित लेनदेन"
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const quickAmounts = [1000, 5000, 10000, 25000];
  const maxWithdrawal = Math.min(availableBalance, 50000);

  const handleNext = () => {
    if (amount && Number(amount) > 0 && Number(amount) <= availableBalance) {
      setStep(2);
    }
  };

  const handleConfirm = async () => {
    setStep(3);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm({
        amount: Number(amount),
        reason: reason || 'Emergency withdrawal'
      });
      onClose();
    }, 3000);
  };

  const isValidAmount = amount && Number(amount) > 0 && Number(amount) <= availableBalance;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {content?.[currentLanguage]?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === 1 && content?.[currentLanguage]?.step1Title}
              {step === 2 && content?.[currentLanguage]?.step2Title}
              {step === 3 && content?.[currentLanguage]?.step3Title}
            </p>
          </div>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Step 1: Amount Input */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Available Balance */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {content?.[currentLanguage]?.availableBalance}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrency(availableBalance)}
                </span>
              </div>
            </div>

            {/* Amount Input */}
            <Input
              label={content?.[currentLanguage]?.amount}
              type="number"
              placeholder={content?.[currentLanguage]?.amountPlaceholder}
              value={amount}
              onChange={(e) => setAmount(e?.target?.value)}
              error={amount && Number(amount) > availableBalance ? 'Amount exceeds available balance' : ''}
            />

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {content?.[currentLanguage]?.quickAmounts}
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {quickAmounts?.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount?.toString())}
                    disabled={quickAmount > availableBalance}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      quickAmount > availableBalance
                        ? 'border-border text-muted-foreground opacity-50 cursor-not-allowed'
                        : 'border-border hover:border-primary hover:bg-primary/10'
                    }`}
                  >
                    {formatCurrency(quickAmount)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAmount(maxWithdrawal?.toString())}
                className="w-full p-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                {content?.[currentLanguage]?.maxAmount}: {formatCurrency(maxWithdrawal)}
              </button>
            </div>

            {/* Reason Input */}
            <Input
              label={content?.[currentLanguage]?.reason}
              type="text"
              placeholder={content?.[currentLanguage]?.reasonPlaceholder}
              value={reason}
              onChange={(e) => setReason(e?.target?.value)}
            />

            {/* Processing Time Info */}
            <div className="bg-success/10 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">
                  {content?.[currentLanguage]?.processingTime}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                {content?.[currentLanguage]?.cancel}
              </Button>
              <Button 
                variant="default" 
                onClick={handleNext} 
                disabled={!isValidAmount}
                className="flex-1"
              >
                {content?.[currentLanguage]?.next}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Withdrawal Summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {content?.[currentLanguage]?.amount}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrency(Number(amount))}
                </span>
              </div>
              
              {reason && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {content?.[currentLanguage]?.reason}
                  </span>
                  <span className="text-sm text-foreground">
                    {reason}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {content?.[currentLanguage]?.bankAccount}
                </span>
                <span className="text-sm text-foreground">
                  HDFC Bank ****1234
                </span>
              </div>
            </div>

            {/* Security Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">
                  {content?.[currentLanguage]?.secureTransaction}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {content?.[currentLanguage]?.instantTransfer}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                {content?.[currentLanguage]?.cancel}
              </Button>
              <Button variant="default" onClick={handleConfirm} className="flex-1">
                {content?.[currentLanguage]?.confirm}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
              <Icon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {content?.[currentLanguage]?.processing}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(Number(amount))} {currentLanguage === 'en' ? 'will be transferred to your bank account' : 'आपके बैंक खाते में स्थानांतरित किया जाएगा'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalModal;