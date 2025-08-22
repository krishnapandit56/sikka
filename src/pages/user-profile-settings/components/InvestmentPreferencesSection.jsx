import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const InvestmentPreferencesSection = ({ userProfile, onUpdatePreferences, currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    riskTolerance: userProfile?.investmentPreferences?.riskTolerance,
    knowledgeLevel: userProfile?.investmentPreferences?.knowledgeLevel,
    investmentGoal: userProfile?.investmentPreferences?.investmentGoal,
    monthlyInvestment: userProfile?.investmentPreferences?.monthlyInvestment
  });
  const [isSaving, setIsSaving] = useState(false);

  const content = {
    en: {
      investmentPreferences: 'Investment Preferences',
      edit: 'Edit',
      save: 'Save Changes',
      cancel: 'Cancel',
      riskTolerance: 'Risk Tolerance',
      knowledgeLevel: 'Knowledge Level',
      investmentGoal: 'Investment Goal',
      monthlyInvestment: 'Monthly Investment Target',
      saving: 'Saving...',
      riskLow: 'Low Risk - Safe investments',
      riskModerate: 'Moderate Risk - Balanced approach',
      riskHigh: 'High Risk - Growth focused',
      knowledgeBeginner: 'Beginner - New to investing',
      knowledgeIntermediate: 'Intermediate - Some experience',
      knowledgeExpert: 'Expert - Advanced knowledge',
      goalWealth: 'Wealth Creation',
      goalRetirement: 'Retirement Planning',
      goalEmergency: 'Emergency Fund',
      goalEducation: 'Education Fund'
    },
    hi: {
      investmentPreferences: 'निवेश प्राथमिकताएं',
      edit: 'संपादित करें',
      save: 'परिवर्तन सहेजें',
      cancel: 'रद्द करें',
      riskTolerance: 'जोखिम सहनशीलता',
      knowledgeLevel: 'ज्ञान स्तर',
      investmentGoal: 'निवेश लक्ष्य',
      monthlyInvestment: 'मासिक निवेश लक्ष्य',
      saving: 'सहेज रहे हैं...',
      riskLow: 'कम जोखिम - सुरक्षित निवेश',
      riskModerate: 'मध्यम जोखिम - संतुलित दृष्टिकोण',
      riskHigh: 'उच्च जोखिम - विकास केंद्रित',
      knowledgeBeginner: 'शुरुआती - निवेश में नया',
      knowledgeIntermediate: 'मध्यम - कुछ अनुभव',
      knowledgeExpert: 'विशेषज्ञ - उन्नत ज्ञान',
      goalWealth: 'धन सृजन',
      goalRetirement: 'सेवानिवृत्ति योजना',
      goalEmergency: 'आपातकालीन फंड',
      goalEducation: 'शिक्षा फंड'
    }
  };

  const riskToleranceOptions = [
    { value: 'low', label: content?.[currentLanguage]?.riskLow },
    { value: 'moderate', label: content?.[currentLanguage]?.riskModerate },
    { value: 'high', label: content?.[currentLanguage]?.riskHigh }
  ];

  const knowledgeLevelOptions = [
    { value: 'beginner', label: content?.[currentLanguage]?.knowledgeBeginner },
    { value: 'intermediate', label: content?.[currentLanguage]?.knowledgeIntermediate },
    { value: 'expert', label: content?.[currentLanguage]?.knowledgeExpert }
  ];

  const investmentGoalOptions = [
    { value: 'wealth', label: content?.[currentLanguage]?.goalWealth },
    { value: 'retirement', label: content?.[currentLanguage]?.goalRetirement },
    { value: 'emergency', label: content?.[currentLanguage]?.goalEmergency },
    { value: 'education', label: content?.[currentLanguage]?.goalEducation }
  ];

  const monthlyInvestmentOptions = [
    { value: '100-500', label: '₹100 - ₹500' },
    { value: '500-1000', label: '₹500 - ₹1,000' },
    { value: '1000-2500', label: '₹1,000 - ₹2,500' },
    { value: '2500-5000', label: '₹2,500 - ₹5,000' },
    { value: '5000+', label: '₹5,000+' }
  ];

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpdatePreferences(preferences);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreferences({
      riskTolerance: userProfile?.investmentPreferences?.riskTolerance,
      knowledgeLevel: userProfile?.investmentPreferences?.knowledgeLevel,
      investmentGoal: userProfile?.investmentPreferences?.investmentGoal,
      monthlyInvestment: userProfile?.investmentPreferences?.monthlyInvestment
    });
    setIsEditing(false);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.investmentPreferences}</span>
        </h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            {content?.[currentLanguage]?.edit}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={content?.[currentLanguage]?.riskTolerance}
          options={riskToleranceOptions}
          value={preferences?.riskTolerance}
          onChange={(value) => handlePreferenceChange('riskTolerance', value)}
          disabled={!isEditing}
        />

        <Select
          label={content?.[currentLanguage]?.knowledgeLevel}
          options={knowledgeLevelOptions}
          value={preferences?.knowledgeLevel}
          onChange={(value) => handlePreferenceChange('knowledgeLevel', value)}
          disabled={!isEditing}
        />

        <Select
          label={content?.[currentLanguage]?.investmentGoal}
          options={investmentGoalOptions}
          value={preferences?.investmentGoal}
          onChange={(value) => handlePreferenceChange('investmentGoal', value)}
          disabled={!isEditing}
        />

        <Select
          label={content?.[currentLanguage]?.monthlyInvestment}
          options={monthlyInvestmentOptions}
          value={preferences?.monthlyInvestment}
          onChange={(value) => handlePreferenceChange('monthlyInvestment', value)}
          disabled={!isEditing}
        />
      </div>
      {!isEditing && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className={getRiskColor(preferences?.riskTolerance)} />
            <span className="text-sm font-medium text-foreground">
              Current Risk Profile: <span className={getRiskColor(preferences?.riskTolerance)}>{preferences?.riskTolerance?.charAt(0)?.toUpperCase() + preferences?.riskTolerance?.slice(1)}</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentLanguage === 'en' ?'Your investment recommendations are tailored based on these preferences.' :'आपकी निवेश सिफारिशें इन प्राथमिकताओं के आधार पर तैयार की गई हैं।'
            }
          </p>
        </div>
      )}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            {content?.[currentLanguage]?.cancel}
          </Button>
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
      )}
    </div>
  );
};

export default InvestmentPreferencesSection;