import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, currentLanguage }) => {
  const tabs = [
    {
      id: 'learn',
      icon: 'BookOpen',
      label: {
        en: 'Learn',
        hi: 'सीखें'
      }
    },
    {
      id: 'chatbot',
      icon: 'MessageCircle',
      label: {
        en: 'Ask Sikka',
        hi: 'सिक्का से पूछें'
      }
    },
    {
      id: 'voice',
      icon: 'Mic',
      label: {
        en: 'Voice Assistant',
        hi: 'आवाज सहायक'
      }
    }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 min-h-[44px] ${
            activeTab === tab?.id
              ? 'bg-card text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={18} />
          <span className="text-sm font-medium">{tab?.label?.[currentLanguage]}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;