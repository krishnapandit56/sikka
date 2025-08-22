import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ currentLanguage }) => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: {
        en: 'SEBI Registered',
        hi: 'सेबी पंजीकृत'
      },
      description: {
        en: 'Regulated by Securities Board',
        hi: 'प्रतिभूति बोर्ड द्वारा नियंत्रित'
      },
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: 'Lock',
      title: {
        en: 'Bank Grade Security',
        hi: 'बैंक ग्रेड सुरक्षा'
      },
      description: {
        en: '256-bit SSL encryption',
        hi: '256-बिट SSL एन्क्रिप्शन'
      },
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: 'Award',
      title: {
        en: 'AMC Certified',
        hi: 'AMC प्रमाणित'
      },
      description: {
        en: 'Asset Management Company',
        hi: 'परिसंपत्ति प्रबंधन कंपनी'
      },
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const safetyFeatures = [
    {
      icon: 'CheckCircle',
      text: {
        en: 'No hidden charges',
        hi: 'कोई छुपी हुई फीस नहीं'
      }
    },
    {
      icon: 'CheckCircle',
      text: {
        en: 'Instant withdrawals',
        hi: 'तत्काल निकासी'
      }
    },
    {
      icon: 'CheckCircle',
      text: {
        en: 'Regular fund updates',
        hi: 'नियमित फंड अपडेट'
      }
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Icon name="ShieldCheck" size={20} className="text-green-600 mr-2" />
        {currentLanguage === 'en' ? 'Trust & Safety' : 'भरोसा और सुरक्षा'}
      </h3>
      {/* Trust Badges */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
            <div className={`p-2 rounded-lg ${badge?.color}`}>
              <Icon name={badge?.icon} size={16} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">
                {badge?.title?.[currentLanguage]}
              </p>
              <p className="text-xs text-gray-500">
                {badge?.description?.[currentLanguage]}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Safety Features */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="font-medium text-sm text-gray-900 mb-2">
          {currentLanguage === 'en' ? 'Safety Features:' : 'सुरक्षा सुविधाएं:'}
        </p>
        <div className="space-y-2">
          {safetyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={feature?.icon} size={14} className="text-green-600" />
              <span className="text-xs text-gray-700">
                {feature?.text?.[currentLanguage]}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={14} className="text-yellow-600 mt-0.5" />
          <p className="text-xs text-yellow-800">
            {currentLanguage === 'en' ?'Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.' :'म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं। कृपया सभी योजना संबंधी दस्तावेजों को ध्यान से पढ़ें।'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;