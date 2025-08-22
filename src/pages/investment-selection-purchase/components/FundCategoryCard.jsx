import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FundCategoryCard = ({ category, onSelect, currentLanguage }) => {
  const categoryData = {
    etf: {
      icon: 'TrendingUp',
      name: {
        en: 'ETFs',
        hi: 'ईटीएफ'
      },
      description: {
        en: 'Exchange Traded Funds - Track market indices',
        hi: 'एक्सचेंज ट्रेडेड फंड - बाजार सूचकांक को ट्रैक करते हैं'
      },
      explanation: {
        en: 'Like buying a basket of many companies at once',
        hi: 'एक साथ कई कंपनियों की टोकरी खरीदने जैसा'
      },
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    mutual: {
      icon: 'PieChart',
      name: {
        en: 'Mutual Funds',
        hi: 'म्यूचुअल फंड'
      },
      description: {
        en: 'Professionally managed investment pools',
        hi: 'पेशेवर रूप से प्रबंधित निवेश पूल'
      },
      explanation: {
        en: 'Expert manages your money with others',
        hi: 'विशेषज्ञ आपके पैसे को दूसरों के साथ प्रबंधित करता है'
      },
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600'
    },
    index: {
      icon: 'BarChart3',
      name: {
        en: 'Index Funds',
        hi: 'इंडेक्स फंड'
      },
      description: {
        en: 'Low-cost funds tracking market performance',
        hi: 'बाजार प्रदर्शन को ट्रैक करने वाले कम लागत वाले फंड'
      },
      explanation: {
        en: 'Follows the market automatically',
        hi: 'बाजार का अपने आप अनुसरण करता है'
      },
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600'
    }
  };

  const data = categoryData?.[category];

  return (
    <div
      onClick={() => onSelect(category)}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${data?.color} hover:shadow-md active:scale-95`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-white shadow-sm ${data?.iconColor}`}>
          <Icon name={data?.icon} size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {data?.name?.[currentLanguage]}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {data?.description?.[currentLanguage]}
          </p>
          <p className="text-xs text-gray-500 italic">
            {data?.explanation?.[currentLanguage]}
          </p>
        </div>
        
        <Icon name="ChevronRight" size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default FundCategoryCard;