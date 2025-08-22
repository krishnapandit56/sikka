import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReferralSection = ({ userProfile, currentLanguage }) => {
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      referralProgram: 'Referral Program',
      yourCode: 'Your Referral Code',
      shareCode: 'Share Code',
      copyCode: 'Copy Code',
      copied: 'Copied!',
      earnRewards: 'Earn Rewards',
      referFriends: 'Refer Friends & Family',
      howItWorks: 'How it Works',
      step1: 'Share your unique referral code',
      step2: 'Friend signs up and invests ₹100',
      step3: 'Both get ₹50 bonus in wallet',
      totalEarned: 'Total Earned',
      successfulReferrals: 'Successful Referrals',
      pendingReferrals: 'Pending Referrals',
      shareVia: 'Share via',
      whatsapp: 'WhatsApp',
      sms: 'SMS',
      email: 'Email',
      more: 'More'
    },
    hi: {
      referralProgram: 'रेफरल प्रोग्राम',
      yourCode: 'आपका रेफरल कोड',
      shareCode: 'कोड साझा करें',
      copyCode: 'कोड कॉपी करें',
      copied: 'कॉपी हो गया!',
      earnRewards: 'पुरस्कार कमाएं',
      referFriends: 'दोस्तों और परिवार को रेफर करें',
      howItWorks: 'यह कैसे काम करता है',
      step1: 'अपना अनूठा रेफरल कोड साझा करें',
      step2: 'दोस्त साइन अप करे और ₹100 निवेश करे',
      step3: 'दोनों को वॉलेट में ₹50 बोनस मिलता है',
      totalEarned: 'कुल कमाई',
      successfulReferrals: 'सफल रेफरल',
      pendingReferrals: 'लंबित रेफरल',
      shareVia: 'के माध्यम से साझा करें',
      whatsapp: 'व्हाट्सऐप',
      sms: 'एसएमएस',
      email: 'ईमेल',
      more: 'और'
    }
  };

  const referralStats = {
    totalEarned: 1250,
    successfulReferrals: 25,
    pendingReferrals: 3
  };

  const recentReferrals = [
    {
      id: 1,
      name: "Priya Sharma",
      status: "completed",
      reward: 50,
      date: "2025-08-20"
    },
    {
      id: 2,
      name: "Amit Patel",
      status: "pending",
      reward: 50,
      date: "2025-08-19"
    },
    {
      id: 3,
      name: "Sunita Devi",
      status: "completed",
      reward: 50,
      date: "2025-08-18"
    }
  ];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard?.writeText(userProfile?.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    const shareText = currentLanguage === 'en' 
      ? `Join Sikka and start investing with just ₹10! Use my referral code ${userProfile?.referralCode} and we both get ₹50 bonus. Download now: https://sikka.app`
      : `सिक्का में शामिल हों और केवल ₹10 से निवेश शुरू करें! मेरा रेफरल कोड ${userProfile?.referralCode} उपयोग करें और हम दोनों को ₹50 बोनस मिलेगा। अभी डाउनलोड करें: https://sikka.app`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareText)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Join Sikka&body=${encodeURIComponent(shareText)}`);
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'Join Sikka',
            text: shareText
          });
        }
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Gift" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.referralProgram}</span>
        </h2>
      </div>
      {/* Referral Code Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{content?.[currentLanguage]?.yourCode}</h3>
          <div className="bg-primary-foreground/20 rounded-lg p-4 mb-4">
            <span className="text-2xl font-bold tracking-wider">{userProfile?.referralCode}</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              iconName={copied ? "Check" : "Copy"}
              iconPosition="left"
              onClick={handleCopyCode}
            >
              {copied ? content?.[currentLanguage]?.copied : content?.[currentLanguage]?.copyCode}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Share"
              iconPosition="left"
              onClick={() => handleShare('more')}
            >
              {content?.[currentLanguage]?.shareCode}
            </Button>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4 text-center">
          <Icon name="Coins" size={24} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">₹{referralStats?.totalEarned}</p>
          <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.totalEarned}</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4 text-center">
          <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{referralStats?.successfulReferrals}</p>
          <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.successfulReferrals}</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4 text-center">
          <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{referralStats?.pendingReferrals}</p>
          <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.pendingReferrals}</p>
        </div>
      </div>
      {/* How it Works */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{content?.[currentLanguage]?.howItWorks}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.step1}</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.step2}</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <p className="text-sm text-muted-foreground">{content?.[currentLanguage]?.step3}</p>
          </div>
        </div>
      </div>
      {/* Share Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{content?.[currentLanguage]?.shareVia}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => handleShare('whatsapp')}
            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          >
            {content?.[currentLanguage]?.whatsapp}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => handleShare('sms')}
          >
            {content?.[currentLanguage]?.sms}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            onClick={() => handleShare('email')}
          >
            {content?.[currentLanguage]?.email}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            onClick={() => handleShare('more')}
          >
            {content?.[currentLanguage]?.more}
          </Button>
        </div>
      </div>
      {/* Recent Referrals */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Referrals</h3>
        <div className="space-y-3">
          {recentReferrals?.map((referral) => (
            <div key={referral?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{referral?.name}</p>
                  <p className="text-sm text-muted-foreground">{referral?.date}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-foreground">₹{referral?.reward}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  referral?.status === 'completed' 
                    ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {referral?.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;