import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EducationalContent = ({ currentLanguage }) => {
  const [activeScenario, setActiveScenario] = useState(0);

  const content = {
    en: {
      title: "Why Emergency Fund Matters",
      subtitle: "Real-life scenarios where emergency funds help",
      scenarios: [
        {
          title: "Medical Emergency",
          description: "Sudden hospitalization or medical treatment costs",
          example: "Hospital bill of ₹50,000 for unexpected surgery",
          icon: "Heart",
          color: "text-error"
        },
        {
          title: "Job Loss",
          description: "Temporary unemployment or reduced income",
          example: "3-6 months of expenses while finding new job",
          icon: "Briefcase",
          color: "text-warning"
        },
        {
          title: "Home Repairs",
          description: "Urgent repairs for house or vehicle",
          example: "AC repair ₹15,000 during summer months",
          icon: "Home",
          color: "text-primary"
        },
        {
          title: "Family Emergency",
          description: "Unexpected family expenses or travel",
          example: "Emergency travel to hometown ₹10,000",
          icon: "Users",
          color: "text-success"
        }
      ],
      benefits: [
        "Peace of mind during tough times",
        "No need to borrow money",
        "Avoid high-interest loans",
        "Financial independence"
      ],
      tips: [
        "Start small - even ₹100 helps",
        "Automate your savings",
        "Keep funds easily accessible",
        "Review and adjust regularly"
      ],
      benefitsTitle: "Benefits of Emergency Fund",
      tipsTitle: "Getting Started Tips"
    },
    hi: {
      title: "आपातकालीन फंड क्यों जरूरी है",
      subtitle: "वास्तविक जीवन की स्थितियां जहां आपातकालीन फंड मदद करता है",
      scenarios: [
        {
          title: "मेडिकल इमरजेंसी",
          description: "अचानक अस्पताल में भर्ती या इलाज की लागत",
          example: "अप्रत्याशित सर्जरी के लिए ₹50,000 का अस्पताल बिल",
          icon: "Heart",
          color: "text-error"
        },
        {
          title: "नौकरी छूटना",
          description: "अस्थायी बेरोजगारी या आय में कमी",
          example: "नई नौकरी खोजते समय 3-6 महीने का खर्च",
          icon: "Briefcase",
          color: "text-warning"
        },
        {
          title: "घर की मरम्मत",
          description: "घर या वाहन की तत्काल मरम्मत",
          example: "गर्मियों में AC की मरम्मत ₹15,000",
          icon: "Home",
          color: "text-primary"
        },
        {
          title: "पारिवारिक आपातकाल",
          description: "अप्रत्याशित पारिवारिक खर्च या यात्रा",
          example: "गृहनगर की आपातकालीन यात्रा ₹10,000",
          icon: "Users",
          color: "text-success"
        }
      ],
      benefits: [
        "कठिन समय में मानसिक शांति",
        "पैसे उधार लेने की जरूरत नहीं",
        "उच्च ब्याज वाले लोन से बचें",
        "वित्तीय स्वतंत्रता"
      ],
      tips: [
        "छोटी शुरुआत करें - ₹100 भी मदद करता है",
        "अपनी बचत को स्वचालित करें",
        "फंड को आसानी से उपलब्ध रखें",
        "नियमित रूप से समीक्षा और समायोजन करें"
      ],
      benefitsTitle: "आपातकालीन फंड के फायदे",
      tipsTitle: "शुरुआत करने के सुझाव"
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {content?.[currentLanguage]?.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {content?.[currentLanguage]?.subtitle}
        </p>
      </div>
      {/* Scenario Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-4">
          {content?.[currentLanguage]?.scenarios?.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setActiveScenario(index)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                activeScenario === index
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {scenario?.title}
            </button>
          ))}
        </div>

        {/* Active Scenario Content */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-card ${content?.[currentLanguage]?.scenarios?.[activeScenario]?.color}`}>
              <Icon 
                name={content?.[currentLanguage]?.scenarios?.[activeScenario]?.icon} 
                size={24} 
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">
                {content?.[currentLanguage]?.scenarios?.[activeScenario]?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {content?.[currentLanguage]?.scenarios?.[activeScenario]?.description}
              </p>
              <div className="bg-card rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">
                    {currentLanguage === 'en' ? 'Example:' : 'उदाहरण:'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {content?.[currentLanguage]?.scenarios?.[activeScenario]?.example}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Benefits Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span>{content?.[currentLanguage]?.benefitsTitle}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {content?.[currentLanguage]?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Tips Section */}
      <div>
        <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning" />
          <span>{content?.[currentLanguage]?.tipsTitle}</span>
        </h4>
        <div className="space-y-2">
          {content?.[currentLanguage]?.tips?.map((tip, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="flex items-center justify-center w-5 h-5 bg-primary/10 rounded-full mt-0.5">
                <span className="text-xs font-medium text-primary">{index + 1}</span>
              </div>
              <span className="text-sm text-muted-foreground">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;