import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LearningSection = ({ currentLanguage }) => {
  const [completedTopics, setCompletedTopics] = useState(['etf-basics']);

  const learningTopics = [
    {
      id: 'etf-basics',
      title: {
        en: 'What are ETFs?',
        hi: 'ETF क्या हैं?'
      },
      description: {
        en: 'Learn about Exchange Traded Funds with simple examples',
        hi: 'सरल उदाहरणों के साथ एक्सचेंज ट्रेडेड फंड के बारे में जानें'
      },
      duration: '5 min',
      difficulty: 'Beginner',
      analogy: {
        en: 'Like buying a basket of fruits instead of individual fruits',
        hi: 'अलग-अलग फल खरीदने के बजाय फलों की टोकरी खरीदने जैसा'
      },
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'sip-working',
      title: {
        en: 'How SIPs Work',
        hi: 'SIP कैसे काम करता है'
      },
      description: {
        en: 'Systematic Investment Plans explained with daily life examples',
        hi: 'दैनिक जीवन के उदाहरणों के साथ व्यवस्थित निवेश योजना'
      },
      duration: '7 min',
      difficulty: 'Beginner',
      analogy: {
        en: 'Like saving money in a piggy bank every month',
        hi: 'हर महीने गुल्लक में पैसे बचाने जैसा'
      },
      image: 'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'risk-returns',
      title: {
        en: 'Risk vs Returns',
        hi: 'जोखिम बनाम रिटर्न'
      },
      description: {
        en: 'Understanding the balance between risk and potential profits',
        hi: 'जोखिम और संभावित लाभ के बीच संतुलन को समझना'
      },
      duration: '6 min',
      difficulty: 'Intermediate',
      analogy: {
        en: 'Like choosing between a safe path or a shortcut',
        hi: 'सुरक्षित रास्ते या शॉर्टकट के बीच चुनाव जैसा'
      },
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'compound-growth',
      title: {
        en: 'Power of Compounding',
        hi: 'चक्रवृद्धि की शक्ति'
      },
      description: {
        en: 'How your money grows exponentially over time',
        hi: 'समय के साथ आपका पैसा कैसे तेजी से बढ़ता है'
      },
      duration: '8 min',
      difficulty: 'Intermediate',
      analogy: {
        en: 'Like a tree growing bigger and giving more fruits each year',
        hi: 'पेड़ के बड़े होने और हर साल अधिक फल देने जैसा'
      },
      image: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleTopicComplete = (topicId) => {
    if (!completedTopics?.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Learning Progress' : 'सीखने की प्रगति'}
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={20} className="text-warning" />
            <span className="text-sm font-medium text-foreground">
              {completedTopics?.length}/{learningTopics?.length}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedTopics?.length / learningTopics?.length) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {currentLanguage === 'en' 
            ? `${completedTopics?.length} topics completed. Keep learning to unlock more badges!`
            : `${completedTopics?.length} विषय पूरे हुए। अधिक बैज अनलॉक करने के लिए सीखते रहें!`
          }
        </p>
      </div>
      {/* Learning Topics */}
      <div className="grid gap-4">
        {learningTopics?.map((topic) => {
          const isCompleted = completedTopics?.includes(topic?.id);
          
          return (
            <div 
              key={topic?.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image 
                    src={topic?.image}
                    alt={topic?.title?.[currentLanguage]}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {topic?.title?.[currentLanguage]}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {topic?.description?.[currentLanguage]}
                      </p>
                    </div>
                    
                    {isCompleted && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-muted-foreground">
                        {topic?.duration}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(topic?.difficulty)}`}>
                        {topic?.difficulty}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleTopicComplete(topic?.id)}
                      className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
                    >
                      {isCompleted 
                        ? (currentLanguage === 'en' ? 'Review' : 'समीक्षा')
                        : (currentLanguage === 'en' ? 'Start' : 'शुरू करें')
                      }
                    </button>
                  </div>
                  
                  {/* Analogy */}
                  <div className="mt-3 p-2 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground italic">
                      💡 {topic?.analogy?.[currentLanguage]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Interactive Calculator */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Growth Calculator' : 'वृद्धि कैलकुलेटर'}
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="TrendingUp" size={24} className="text-primary" />
          </div>
          <p className="text-muted-foreground mb-4">
            {currentLanguage === 'en' ?'See how your ₹10 daily investment can grow like a tree!' :'देखें कि आपका ₹10 दैनिक निवेश पेड़ की तरह कैसे बढ़ सकता है!'
            }
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
            {currentLanguage === 'en' ? 'Try Calculator' : 'कैलकुलेटर आज़माएं'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;