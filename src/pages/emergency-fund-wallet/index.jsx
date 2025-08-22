import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import EmergencyFundBalance from './components/EmergencyFundBalance';
import QuickActions from './components/QuickActions';
import TransactionHistory from './components/TransactionHistory';
import GoalSetting from './components/GoalSetting';
import WithdrawalModal from './components/WithdrawalModal';
import AddFundsModal from './components/AddFundsModal';
import EducationalContent from './components/EducationalContent';

const EmergencyFundWallet = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [availableBalance] = useState(45750);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const content = {
    en: {
      pageTitle: "Emergency Fund Wallet",
      pageDescription: "Your financial safety net for unexpected expenses",
      safetyMessage: "Your emergency funds are FDIC insured and instantly accessible"
    },
    hi: {
      pageTitle: "आपातकालीन फंड वॉलेट",
      pageDescription: "अप्रत्याशित खर्चों के लिए आपका वित्तीय सुरक्षा जाल",
      safetyMessage: "आपके आपातकालीन फंड FDIC बीमित हैं और तुरंत उपलब्ध हैं"
    }
  };

  const handleWithdraw = () => {
    setShowWithdrawal(true);
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleSetGoal = () => {
    setShowGoalSetting(true);
  };

  const handleWithdrawalConfirm = (withdrawalData) => {
    console.log('Withdrawal confirmed:', withdrawalData);
    // Handle withdrawal logic here
  };

  const handleAddFundsConfirm = (fundData) => {
    console.log('Funds added:', fundData);
    // Handle add funds logic here
  };

  const handleGoalSave = (goalData) => {
    console.log('Goal saved:', goalData);
    // Handle goal setting logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 lg:pb-8">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {content?.[currentLanguage]?.pageTitle}
              </h1>
              <p className="text-muted-foreground">
                {content?.[currentLanguage]?.pageDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Emergency Fund Balance */}
              <EmergencyFundBalance currentLanguage={currentLanguage} />

              {/* Quick Actions */}
              <QuickActions
                currentLanguage={currentLanguage}
                onWithdraw={handleWithdraw}
                onAddFunds={handleAddFunds}
                onSetGoal={handleSetGoal}
              />

              {/* Transaction History */}
              <TransactionHistory currentLanguage={currentLanguage} />
            </div>

            {/* Right Column - Educational Content */}
            <div className="space-y-6">
              <EducationalContent currentLanguage={currentLanguage} />

              {/* Trust Signal */}
              <div className="bg-success/10 rounded-xl p-6 border border-success/20">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-full mx-auto mb-4">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-success"
                    >
                      <path 
                        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                        fill="currentColor"
                      />
                      <circle cx="12" cy="19" r="3" fill="currentColor" opacity="0.7"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-success mb-2">
                    {currentLanguage === 'en' ? 'Sikka Guarantee' : 'सिक्का गारंटी'}
                  </h3>
                  <p className="text-sm text-success/80">
                    {content?.[currentLanguage]?.safetyMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
      {/* Modals */}
      {showGoalSetting && (
        <GoalSetting
          currentLanguage={currentLanguage}
          onClose={() => setShowGoalSetting(false)}
          onSave={handleGoalSave}
        />
      )}
      {showWithdrawal && (
        <WithdrawalModal
          currentLanguage={currentLanguage}
          onClose={() => setShowWithdrawal(false)}
          onConfirm={handleWithdrawalConfirm}
          availableBalance={availableBalance}
        />
      )}
      {showAddFunds && (
        <AddFundsModal
          currentLanguage={currentLanguage}
          onClose={() => setShowAddFunds(false)}
          onConfirm={handleAddFundsConfirm}
        />
      )}
    </div>
  );
};

export default EmergencyFundWallet;