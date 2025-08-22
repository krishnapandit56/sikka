import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationPreferencesSection = ({ userProfile, onUpdateNotifications, currentLanguage }) => {
  const [preferences, setPreferences] = useState(userProfile?.notificationPreferences);
  const [isSaving, setIsSaving] = useState(false);

  const content = {
    en: {
      notifications: 'Notification Preferences',
      save: 'Save Changes',
      saving: 'Saving...',
      portfolioUpdates: 'Portfolio Updates',
      portfolioDesc: 'Daily portfolio performance and market updates',
      goalAchievements: 'Goal Achievements',
      goalDesc: 'Notifications when you reach investment milestones',
      educationalContent: 'Educational Content',
      educationalDesc: 'Weekly tips and learning materials',
      marketAlerts: 'Market Alerts',
      marketDesc: 'Important market news and opportunities',
      transactionAlerts: 'Transaction Alerts',
      transactionDesc: 'Confirmations for deposits and withdrawals',
      sms: 'SMS',
      email: 'Email',
      push: 'Push Notifications',
      channels: 'Notification Channels'
    },
    hi: {
      notifications: 'सूचना प्राथमिकताएं',
      save: 'परिवर्तन सहेजें',
      saving: 'सहेज रहे हैं...',
      portfolioUpdates: 'पोर्टफोलियो अपडेट',
      portfolioDesc: 'दैनिक पोर्टफोलियो प्रदर्शन और बाजार अपडेट',
      goalAchievements: 'लक्ष्य उपलब्धियां',
      goalDesc: 'जब आप निवेश मील के पत्थर तक पहुंचते हैं तो सूचनाएं',
      educationalContent: 'शैक्षिक सामग्री',
      educationalDesc: 'साप्ताहिक सुझाव और सीखने की सामग्री',
      marketAlerts: 'बाजार अलर्ट',
      marketDesc: 'महत्वपूर्ण बाजार समाचार और अवसर',
      transactionAlerts: 'लेनदेन अलर्ट',
      transactionDesc: 'जमा और निकासी की पुष्टि',
      sms: 'एसएमएस',
      email: 'ईमेल',
      push: 'पुश नोटिफिकेशन',
      channels: 'सूचना चैनल'
    }
  };

  const notificationTypes = [
    {
      key: 'portfolioUpdates',
      title: content?.[currentLanguage]?.portfolioUpdates,
      description: content?.[currentLanguage]?.portfolioDesc,
      icon: 'TrendingUp'
    },
    {
      key: 'goalAchievements',
      title: content?.[currentLanguage]?.goalAchievements,
      description: content?.[currentLanguage]?.goalDesc,
      icon: 'Target'
    },
    {
      key: 'educationalContent',
      title: content?.[currentLanguage]?.educationalContent,
      description: content?.[currentLanguage]?.educationalDesc,
      icon: 'BookOpen'
    },
    {
      key: 'marketAlerts',
      title: content?.[currentLanguage]?.marketAlerts,
      description: content?.[currentLanguage]?.marketDesc,
      icon: 'AlertTriangle'
    },
    {
      key: 'transactionAlerts',
      title: content?.[currentLanguage]?.transactionAlerts,
      description: content?.[currentLanguage]?.transactionDesc,
      icon: 'CreditCard'
    }
  ];

  const handlePreferenceChange = (type, channel, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [channel]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpdateNotifications(preferences);
    setIsSaving(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.notifications}</span>
        </h2>
      </div>
      <div className="space-y-6">
        {notificationTypes?.map((type) => (
          <div key={type?.key} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3 mb-4">
              <Icon name={type?.icon} size={20} className="text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{type?.title}</h3>
                <p className="text-sm text-muted-foreground">{type?.description}</p>
              </div>
            </div>

            <div className="ml-8">
              <p className="text-sm font-medium text-foreground mb-3">{content?.[currentLanguage]?.channels}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Checkbox
                  label={content?.[currentLanguage]?.sms}
                  checked={preferences?.[type?.key]?.sms || false}
                  onChange={(e) => handlePreferenceChange(type?.key, 'sms', e?.target?.checked)}
                />
                <Checkbox
                  label={content?.[currentLanguage]?.email}
                  checked={preferences?.[type?.key]?.email || false}
                  onChange={(e) => handlePreferenceChange(type?.key, 'email', e?.target?.checked)}
                />
                <Checkbox
                  label={content?.[currentLanguage]?.push}
                  checked={preferences?.[type?.key]?.push || false}
                  onChange={(e) => handlePreferenceChange(type?.key, 'push', e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-6 pt-6 border-t border-border">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          {isSaving ? content?.[currentLanguage]?.saving : content?.[currentLanguage]?.save}
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferencesSection;