import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ currentLanguage, onWithdraw, onAddFunds, onSetGoal }) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const content = {
    en: {
      quickActions: "Quick Actions",
      instantWithdraw: "Instant Withdraw",
      addFunds: "Add Funds",
      setGoal: "Set Goal",
      getMoneyFast: "Get Money in 2 Minutes",
      withdrawDesc: "Emergency access to your funds",
      addDesc: "Increase your safety net",
      goalDesc: "Adjust your target amount"
    },
    hi: {
      quickActions: "त्वरित कार्य",
      instantWithdraw: "तुरंत निकासी",
      addFunds: "फंड जोड़ें",
      setGoal: "लक्ष्य सेट करें",
      getMoneyFast: "2 मिनट में पैसा पाएं",
      withdrawDesc: "आपके फंड तक आपातकालीन पहुंच",
      addDesc: "अपना सुरक्षा जाल बढ़ाएं",
      goalDesc: "अपनी लक्ष्य राशि समायोजित करें"
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    // Simulate withdrawal process
    setTimeout(() => {
      setIsWithdrawing(false);
      onWithdraw();
    }, 2000);
  };

  const actions = [
    {
      id: 'withdraw',
      icon: 'ArrowDown',
      title: content?.[currentLanguage]?.instantWithdraw,
      description: content?.[currentLanguage]?.withdrawDesc,
      color: 'bg-error/10 hover:bg-error/20 text-error',
      iconColor: 'text-error',
      action: handleWithdraw,
      loading: isWithdrawing,
      highlight: true
    },
    {
      id: 'add',
      icon: 'Plus',
      title: content?.[currentLanguage]?.addFunds,
      description: content?.[currentLanguage]?.addDesc,
      color: 'bg-success/10 hover:bg-success/20 text-success',
      iconColor: 'text-success',
      action: onAddFunds
    },
    {
      id: 'goal',
      icon: 'Target',
      title: content?.[currentLanguage]?.setGoal,
      description: content?.[currentLanguage]?.goalDesc,
      color: 'bg-primary/10 hover:bg-primary/20 text-primary',
      iconColor: 'text-primary',
      action: onSetGoal
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {content?.[currentLanguage]?.quickActions}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="relative">
            <button
              onClick={action?.action}
              disabled={action?.loading}
              className={`w-full p-4 rounded-lg border border-border transition-all duration-200 hover:scale-105 hover:shadow-md ${action?.color} ${
                action?.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/50 ${action?.iconColor}`}>
                  {action?.loading ? (
                    <Icon name="Loader2" size={24} className="animate-spin" />
                  ) : (
                    <Icon name={action?.icon} size={24} />
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    {action?.title}
                  </h4>
                  <p className="text-xs opacity-80">
                    {action?.description}
                  </p>
                </div>
              </div>

              {/* Highlight badge for instant withdraw */}
              {action?.highlight && (
                <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                  {content?.[currentLanguage]?.getMoneyFast}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
      {/* Trust Signal */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' 
              ? "Your emergency funds are secured and instantly accessible 24/7" :"आपके आपातकालीन फंड सुरक्षित हैं और 24/7 तुरंत उपलब्ध हैं"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;