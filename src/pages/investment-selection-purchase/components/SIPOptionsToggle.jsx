import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const SIPOptionsToggle = ({ onSIPChange, currentLanguage }) => {
  const [sipEnabled, setSipEnabled] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  const frequencies = [
    {
      id: 'daily',
      name: {
        en: 'Daily',
        hi: 'दैनिक'
      },
      description: {
        en: 'Invest every day',
        hi: 'हर दिन निवेश करें'
      },
      icon: 'Calendar'
    },
    {
      id: 'weekly',
      name: {
        en: 'Weekly',
        hi: 'साप्ताहिक'
      },
      description: {
        en: 'Invest every week',
        hi: 'हर सप्ताह निवेश करें'
      },
      icon: 'CalendarDays'
    },
    {
      id: 'monthly',
      name: {
        en: 'Monthly',
        hi: 'मासिक'
      },
      description: {
        en: 'Invest every month',
        hi: 'हर महीने निवेश करें'
      },
      icon: 'CalendarRange'
    }
  ];

  const handleSIPToggle = (checked) => {
    setSipEnabled(checked);
    onSIPChange({
      enabled: checked,
      frequency: checked ? selectedFrequency : null
    });
  };

  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
    onSIPChange({
      enabled: sipEnabled,
      frequency: frequency
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">
            {currentLanguage === 'en' ? 'SIP Investment' : 'SIP निवेश'}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {currentLanguage === 'en' ?'Invest regularly for better returns' :'बेहतर रिटर्न के लिए नियमित निवेश करें'
            }
          </p>
        </div>
        <Checkbox
          checked={sipEnabled}
          onChange={(e) => handleSIPToggle(e?.target?.checked)}
        />
      </div>
      {sipEnabled && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-3">
            {currentLanguage === 'en' ? 'Choose Frequency:' : 'आवृत्ति चुनें:'}
          </p>
          
          {frequencies?.map((freq) => (
            <div
              key={freq?.id}
              onClick={() => handleFrequencyChange(freq?.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedFrequency === freq?.id
                  ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                selectedFrequency === freq?.id
                  ? 'bg-primary text-white' :'bg-gray-100 text-gray-600'
              }`}>
                <Icon name={freq?.icon} size={16} />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">
                  {freq?.name?.[currentLanguage]}
                </p>
                <p className="text-xs text-gray-500">
                  {freq?.description?.[currentLanguage]}
                </p>
              </div>
              
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedFrequency === freq?.id
                  ? 'border-primary bg-primary' :'border-gray-300'
              }`}>
                {selectedFrequency === freq?.id && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          ))}

          {/* SIP Benefits */}
          <div className="bg-blue-50 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-900 mb-1">
                  {currentLanguage === 'en' ? 'SIP Benefits:' : 'SIP के फायदे:'}
                </p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• {currentLanguage === 'en' ? 'Rupee cost averaging' : 'रुपया लागत औसत'}</li>
                  <li>• {currentLanguage === 'en' ? 'Disciplined investing' : 'अनुशासित निवेश'}</li>
                  <li>• {currentLanguage === 'en' ? 'Compound growth' : 'चक्रवृद्धि वृद्धि'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIPOptionsToggle;