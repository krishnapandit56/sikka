import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import PortfolioMetrics from './components/PortfolioMetrics';
import GoalProgress from './components/GoalProgress';
import ActiveInvestments from './components/ActiveInvestments';
import QuickActions from './components/QuickActions';
import GamificationSection from './components/GamificationSection';
import TrustSection from './components/TrustSection';
import RecommendedInvestments from './components/RecommendedInvestments';
import Icon from '../../components/AppIcon';

const InvestmentDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      welcome: 'Welcome back',
      userName: 'Rahul',
      goodMorning: 'Good morning',
      refreshing: 'Refreshing...',
      pullToRefresh: 'Pull to refresh portfolio data'
    },
    hi: {
      welcome: 'वापस स्वागत है',
      userName: 'राहुल',
      goodMorning: 'सुप्रभात',
      refreshing: 'रिफ्रेश हो रहा है...',
      pullToRefresh: 'पोर्टफोलियो डेटा रिफ्रेश करने के लिए खींचें'
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (currentLanguage === 'hi') {
      if (hour < 12) return 'सुप्रभात';
      if (hour < 17) return 'नमस्कार';
      return 'शुभ संध्या';
    } else {
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pb-20">
        {/* Welcome Section */}
        <div className="px-4 py-6 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {getGreeting()}, {content?.[currentLanguage]?.userName}! 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ?'Your investments are growing steadily' :'आपके निवेश लगातार बढ़ रहे हैं'
                }
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
              aria-label={content?.[currentLanguage]?.pullToRefresh}
            >
              <Icon 
                name="RefreshCw" 
                size={18} 
                className={`text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-4 space-y-6 -mt-2">
          {/* Portfolio Metrics - Full Width */}
          <PortfolioMetrics />

          {/* Desktop Layout - Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Investments */}
              <ActiveInvestments />

              {/* Quick Actions */}
              <QuickActions />

              {/* Gamification Section */}
              <GamificationSection />

              {/* Trust Section */}
              <TrustSection />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-6">
              {/* Goal Progress */}
              <GoalProgress />

              {/* Recommended Investments */}
              <RecommendedInvestments />
            </div>
          </div>

          {/* Mobile Layout - Recommended Investments */}
          <div className="lg:hidden">
            <RecommendedInvestments />
          </div>
        </div>

        {/* Refreshing Indicator */}
        {isRefreshing && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 shadow-lg z-30">
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={16} className="text-primary animate-spin" />
              <span className="text-sm text-foreground">
                {content?.[currentLanguage]?.refreshing}
              </span>
            </div>
          </div>
        )}
      </main>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default InvestmentDashboard;