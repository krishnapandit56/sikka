import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BankAccountSection = ({ userProfile, onUpdateBankAccounts, currentLanguage }) => {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const content = {
    en: {
      bankAccounts: 'Bank Accounts',
      addAccount: 'Add Account',
      bankName: 'Bank Name',
      accountNumber: 'Account Number',
      ifscCode: 'IFSC Code',
      accountHolderName: 'Account Holder Name',
      primary: 'Primary',
      verified: 'Verified',
      pending: 'Pending Verification',
      save: 'Save Account',
      cancel: 'Cancel',
      saving: 'Saving...',
      remove: 'Remove',
      setPrimary: 'Set as Primary',
      linkedAccounts: 'Linked Accounts',
      addNew: 'Add New Account'
    },
    hi: {
      bankAccounts: 'बैंक खाते',
      addAccount: 'खाता जोड़ें',
      bankName: 'बैंक का नाम',
      accountNumber: 'खाता संख्या',
      ifscCode: 'आईएफएससी कोड',
      accountHolderName: 'खाता धारक का नाम',
      primary: 'प्राथमिक',
      verified: 'सत्यापित',
      pending: 'सत्यापन लंबित',
      save: 'खाता सहेजें',
      cancel: 'रद्द करें',
      saving: 'सहेज रहे हैं...',
      remove: 'हटाएं',
      setPrimary: 'प्राथमिक के रूप में सेट करें',
      linkedAccounts: 'लिंक किए गए खाते',
      addNew: 'नया खाता जोड़ें'
    }
  };

  const bankAccounts = [
    {
      id: 1,
      bankName: "State Bank of India",
      accountNumber: "****1234",
      ifscCode: "SBIN0001234",
      accountHolderName: "Rajesh Kumar",
      isPrimary: true,
      isVerified: true
    },
    {
      id: 2,
      bankName: "HDFC Bank",
      accountNumber: "****5678",
      ifscCode: "HDFC0001234",
      accountHolderName: "Rajesh Kumar",
      isPrimary: false,
      isVerified: false
    }
  ];

  const handleInputChange = (field, value) => {
    setNewAccount(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAccount = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const accountToAdd = {
      ...newAccount,
      id: Date.now(),
      accountNumber: `****${newAccount?.accountNumber?.slice(-4)}`,
      isPrimary: false,
      isVerified: false
    };
    
    onUpdateBankAccounts([...bankAccounts, accountToAdd]);
    
    setIsSaving(false);
    setIsAddingAccount(false);
    setNewAccount({
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    });
  };

  const handleCancel = () => {
    setIsAddingAccount(false);
    setNewAccount({
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    });
  };

  const getBankIcon = (bankName) => {
    if (bankName?.toLowerCase()?.includes('sbi') || bankName?.toLowerCase()?.includes('state bank')) {
      return 'Building2';
    } else if (bankName?.toLowerCase()?.includes('hdfc')) {
      return 'CreditCard';
    }
    return 'Building';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Building" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.bankAccounts}</span>
        </h2>
        {!isAddingAccount && (
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingAccount(true)}
          >
            {content?.[currentLanguage]?.addAccount}
          </Button>
        )}
      </div>
      {/* Existing Accounts */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-medium text-foreground">{content?.[currentLanguage]?.linkedAccounts}</h3>
        {bankAccounts?.map((account) => (
          <div key={account?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={getBankIcon(account?.bankName)} size={24} className="text-primary" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{account?.bankName}</h4>
                    {account?.isPrimary && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {content?.[currentLanguage]?.primary}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{account?.accountNumber}</p>
                  <p className="text-sm text-muted-foreground">{account?.ifscCode}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon 
                      name={account?.isVerified ? "CheckCircle" : "Clock"} 
                      size={16} 
                      className={account?.isVerified ? "text-success" : "text-warning"} 
                    />
                    <span className={`text-sm ${account?.isVerified ? "text-success" : "text-warning"}`}>
                      {account?.isVerified ? content?.[currentLanguage]?.verified : content?.[currentLanguage]?.pending}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{account?.accountHolderName}</p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  {!account?.isPrimary && (
                    <Button variant="ghost" size="sm">
                      {content?.[currentLanguage]?.setPrimary}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-error hover:text-error">
                    {content?.[currentLanguage]?.remove}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add New Account Form */}
      {isAddingAccount && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-4">{content?.[currentLanguage]?.addNew}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label={content?.[currentLanguage]?.bankName}
              type="text"
              value={newAccount?.bankName}
              onChange={(e) => handleInputChange('bankName', e?.target?.value)}
              placeholder="e.g., State Bank of India"
              required
            />

            <Input
              label={content?.[currentLanguage]?.accountHolderName}
              type="text"
              value={newAccount?.accountHolderName}
              onChange={(e) => handleInputChange('accountHolderName', e?.target?.value)}
              placeholder="As per bank records"
              required
            />

            <Input
              label={content?.[currentLanguage]?.accountNumber}
              type="text"
              value={newAccount?.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e?.target?.value)}
              placeholder="Enter account number"
              required
            />

            <Input
              label={content?.[currentLanguage]?.ifscCode}
              type="text"
              value={newAccount?.ifscCode}
              onChange={(e) => handleInputChange('ifscCode', e?.target?.value?.toUpperCase())}
              placeholder="e.g., SBIN0001234"
              required
            />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              {content?.[currentLanguage]?.cancel}
            </Button>
            <Button
              variant="default"
              onClick={handleSaveAccount}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              {isSaving ? content?.[currentLanguage]?.saving : content?.[currentLanguage]?.save}
            </Button>
          </div>
        </div>
      )}
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {currentLanguage === 'en' ? 'Secure & Encrypted' : 'सुरक्षित और एन्क्रिप्टेड'}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ?'All bank account information is encrypted and stored securely. We never store your complete account number.' :'सभी बैंक खाता जानकारी एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है। हम कभी भी आपका पूरा खाता नंबर संग्रहीत नहीं करते।'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountSection;