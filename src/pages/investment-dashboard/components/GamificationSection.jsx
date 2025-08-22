import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GamificationSection = ({ className = "" }) => {
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

  const gamificationData = {
    streak: 7,
    weeklyChallenge: {
      target: 5,
      completed: 3,
      reward: 50
    },
    badges: [
      {
        id: 1,
        name: { en: 'First Investment', hi: 'पहला निवेश' },
        icon: 'Star',
        earned: true,
        color: 'text-warning'
      },
      {
        id: 2,
        name: { en: 'Week Warrior', hi: 'सप्ताह योद्धा' },
        icon: 'Zap',
        earned: true,
        color: 'text-primary'
      },
      {
        id: 3,
        name: { en: 'Goal Achiever', hi: 'लक्ष्य प्राप्तकर्ता' },
        icon: 'Target',
        earned: false,
        color: 'text-muted-foreground'
      }
    ]
  };

  const content = {
    en: {
      achievements: 'Achievements',
      investmentStreak: 'Investment Streak',
      days: 'days',
      weeklyChallenge: 'Weekly Challenge',
      investTimes: 'Invest 5 times this week',
      reward: 'Reward',
      points: 'points',
      badges: 'Badges',
      keepGoing: 'Keep going!'
    },
    hi: {
      achievements: 'उपलब्धियां',
      investmentStreak: 'निवेश स्ट्रीक',
      days: 'दिन',
      weeklyChallenge: 'साप्ताहिक चुनौती',
      investTimes: 'इस सप्ताह 5 बार निवेश करें',
      reward: 'पुरस्कार',
      points: 'अंक',
      badges: 'बैज',
      keepGoing: 'जारी रखें!'
    }
  };

  const challengeProgress = (gamificationData?.weeklyChallenge?.completed / gamificationData?.weeklyChallenge?.target) * 100;

  return (
    <div className={`bg-card rounded-xl p-6 border border-border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.achievements}
        </h3>
        <Icon name="Trophy" size={20} className="text-warning" />
      </div>
      {/* Investment Streak */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Flame" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {content?.[currentLanguage]?.investmentStreak}
              </h4>
              <p className="text-xs text-muted-foreground">
                {content?.[currentLanguage]?.keepGoing}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {gamificationData?.streak}
            </div>
            <div className="text-xs text-muted-foreground">
              {content?.[currentLanguage]?.days}
            </div>
          </div>
        </div>
      </div>
      {/* Weekly Challenge */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">
            {content?.[currentLanguage]?.weeklyChallenge}
          </h4>
          <div className="flex items-center space-x-1 text-xs text-warning">
            <Icon name="Gift" size={14} />
            <span>{gamificationData?.weeklyChallenge?.reward} {content?.[currentLanguage]?.points}</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3">
          {content?.[currentLanguage]?.investTimes}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>
              {gamificationData?.weeklyChallenge?.completed}/{gamificationData?.weeklyChallenge?.target}
            </span>
            <span>{Math.round(challengeProgress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${challengeProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Badges */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          {content?.[currentLanguage]?.badges}
        </h4>
        <div className="flex space-x-3">
          {gamificationData?.badges?.map((badge) => (
            <div 
              key={badge?.id}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                badge?.earned 
                  ? 'bg-primary/10 hover:bg-primary/20' :'bg-muted/30 opacity-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                badge?.earned ? 'bg-primary/20' : 'bg-muted/50'
              }`}>
                <Icon 
                  name={badge?.icon} 
                  size={16} 
                  className={badge?.earned ? badge?.color : 'text-muted-foreground'} 
                />
              </div>
              <span className="text-xs text-center font-medium text-foreground">
                {badge?.name?.[currentLanguage]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationSection;