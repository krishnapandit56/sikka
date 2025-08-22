import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import TabNavigation from './components/TabNavigation';
import LearningSection from './components/LearningSection';
import ChatbotSection from './components/ChatbotSection';
import VoiceAssistant from './components/VoiceAssistant';
import FAQSection from './components/FAQSection';

const InvestmentLearningChatbot = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'learn':
        return <LearningSection currentLanguage={currentLanguage} />;
      case 'chatbot':
        return <ChatbotSection currentLanguage={currentLanguage} />;
      case 'voice':
        return <VoiceAssistant currentLanguage={currentLanguage} />;
      default:
        return <LearningSection currentLanguage={currentLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {currentLanguage === 'en' ? 'Investment Learning Hub' : 'निवेश सीखने का केंद्र'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {currentLanguage === 'en' ?'Learn about investments through simple explanations, get instant answers from our AI assistant, or use voice commands in Hindi and English.' :'सरल व्याख्याओं के माध्यम से निवेश के बारे में जानें, हमारे AI सहायक से तुरंत उत्तर पाएं, या हिंदी और अंग्रेजी में आवाज कमांड का उपयोग करें।'
              }
            </p>
          </div>

          {/* Tab Navigation */}
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentLanguage={currentLanguage}
          />

          {/* Active Section Content */}
          <div className="mb-8">
            {renderActiveSection()}
          </div>

          {/* FAQ Section - Always visible */}
          <div className="mt-12">
            <FAQSection currentLanguage={currentLanguage} />
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default InvestmentLearningChatbot;