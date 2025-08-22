import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FundCategoryCard from './components/FundCategoryCard';
import FundCard from './components/FundCard';
import InvestmentAmountSelector from './components/InvestmentAmountSelector';
import SIPOptionsToggle from './components/SIPOptionsToggle';
import TrustIndicators from './components/TrustIndicators';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import InvestmentConfirmation from './components/InvestmentConfirmation';
import SuccessAnimation from './components/SuccessAnimation';

const InvestmentSelectionPurchase = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFund, setSelectedFund] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(10);
  const [sipOptions, setSipOptions] = useState({ enabled: false, frequency: null });
  const [paymentMethod, setPaymentMethod] = useState({ method: 'upi', roundUp: false });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Mock fund data
  const mockFunds = {
    etf: [
      {
        id: 'etf1',
        name: 'Nifty 50 ETF',
        manager: 'ICICI Prudential',
        category: 'ETF',
        minInvestment: 10,
        expectedReturns: 12,
        riskLevel: 3,
        whyChoose: {
          en: `This ETF tracks India's top 50 companies, giving you exposure to the best performers in the market. Like owning a piece of every major Indian company - from Reliance to TCS. Historical data shows it has outperformed bank FDs consistently over 5+ years.`,
          hi: `यह ईटीएफ भारत की शीर्ष 50 कंपनियों को ट्रैक करता है, जो आपको बाजार के सर्वोत्तम प्रदर्शनकर्ताओं में निवेश का अवसर देता है। रिलायंस से लेकर TCS तक हर प्रमुख भारतीय कंपनी का हिस्सा रखने जैसा। ऐतिहासिक डेटा दिखाता है कि इसने 5+ वर्षों में बैंक एफडी से लगातार बेहतर प्रदर्शन किया है।`
        }
      },
      {
        id: 'etf2',name: 'Bank Nifty ETF',manager: 'SBI Mutual Fund',category: 'ETF',
        minInvestment: 10,
        expectedReturns: 14,
        riskLevel: 4,
        whyChoose: {
          en: `Focuses on banking sector which is the backbone of Indian economy. When banks grow, the entire economy benefits. Perfect for those who believe in India's banking future.`,
          hi: `बैंकिंग क्षेत्र पर केंद्रित है जो भारतीय अर्थव्यवस्था की रीढ़ है। जब बैंक बढ़ते हैं, तो पूरी अर्थव्यवस्था को फायदा होता है। उन लोगों के लिए बिल्कुल सही जो भारत के बैंकिंग भविष्य में विश्वास करते हैं।`
        }
      }
    ],
    mutual: [
      {
        id: 'mf1',
        name: 'HDFC Top 100 Fund',
        manager: 'HDFC Asset Management',
        category: 'Large Cap',
        minInvestment: 10,
        expectedReturns: 13,
        riskLevel: 3,
        whyChoose: {
          en: `Invests in India's largest and most stable companies. Like having an expert pick the best companies for you. The fund manager has 15+ years of experience and has consistently beaten market returns.`,
          hi: `भारत की सबसे बड़ी और सबसे स्थिर कंपनियों में निवेश करता है। जैसे कि कोई विशेषज्ञ आपके लिए सर्वोत्तम कंपनियों का चयन कर रहा हो। फंड मैनेजर के पास 15+ वर्षों का अनुभव है और उसने लगातार बाजार रिटर्न को मात दी है।`
        }
      },
      {
        id: 'mf2',name: 'Axis Small Cap Fund',manager: 'Axis Asset Management',category: 'Small Cap',
        minInvestment: 10,
        expectedReturns: 16,
        riskLevel: 5,
        whyChoose: {
          en: `Invests in small companies with high growth potential. Like finding tomorrow's big companies today. Higher risk but potential for much higher returns over long term.`,
          hi: `उच्च विकास क्षमता वाली छोटी कंपनियों में निवेश करता है। आज कल की बड़ी कंपनियों को खोजने जैसा। अधिक जोखिम लेकिन लंबी अवधि में बहुत अधिक रिटर्न की संभावना।`
        }
      }
    ],
    index: [
      {
        id: 'idx1',
        name: 'UTI Nifty Index Fund',
        manager: 'UTI Asset Management',
        category: 'Index Fund',
        minInvestment: 10,
        expectedReturns: 11,
        riskLevel: 2,
        whyChoose: {
          en: `Automatically follows the market without any human bias. Very low fees and transparent. Perfect for beginners who want market returns without complexity.`,
          hi: `बिना किसी मानवीय पूर्वाग्रह के स्वचालित रूप से बाजार का अनुसरण करता है। बहुत कम फीस और पारदर्शी। शुरुआती लोगों के लिए बिल्कुल सही जो जटिलता के बिना बाजार रिटर्न चाहते हैं।`
        }
      },
      {
        id: 'idx2',
        name: 'ICICI Sensex Index Fund',
        manager: 'ICICI Prudential',
        category: 'Index Fund',
        minInvestment: 10,
        expectedReturns: 12,
        riskLevel: 2,
        whyChoose: {
          en: `Tracks BSE Sensex - India's most famous stock market index. Like buying a piece of India's economic growth story. Low cost and diversified exposure.`,
          hi: `BSE सेंसेक्स को ट्रैक करता है - भारत का सबसे प्रसिद्ध स्टॉक मार्केट इंडेक्स। भारत की आर्थिक विकास कहानी का एक हिस्सा खरीदने जैसा। कम लागत और विविधीकृत एक्सपोजर।`
        }
      }
    ]
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedFund(null);
  };

  const handleFundSelect = (fund) => {
    setSelectedFund(fund);
  };

  const handleInvestNow = () => {
    if (!selectedFund || investmentAmount < 10) return;
    setShowConfirmation(true);
  };

  const handleConfirmInvestment = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleViewPortfolio = () => {
    navigate('/investment-dashboard');
  };

  const handleInvestMore = () => {
    setShowSuccess(false);
    setSelectedCategory(null);
    setSelectedFund(null);
    setInvestmentAmount(10);
    setSipOptions({ enabled: false, frequency: null });
    setPaymentMethod({ method: 'upi', roundUp: false });
  };

  const getInvestmentDetails = () => ({
    fund: selectedFund,
    amount: investmentAmount,
    sip: sipOptions,
    paymentMethod: paymentMethod
  });

  const breadcrumbItems = [
    {
      label: { en: 'Dashboard', hi: 'डैशबोर्ड' },
      path: '/investment-dashboard'
    },
    {
      label: { en: 'Invest', hi: 'निवेश' },
      path: '/investment-selection-purchase'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={14} className="text-gray-400" />
                )}
                {index === breadcrumbItems?.length - 1 ? (
                  <span className="text-primary font-medium">
                    {item?.label?.[currentLanguage]}
                  </span>
                ) : (
                  <Link
                    to={item?.path}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item?.label?.[currentLanguage]}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="p-4 space-y-6">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentLanguage === 'en' ? 'Start Your Investment Journey' : 'अपनी निवेश यात्रा शुरू करें'}
            </h1>
            <p className="text-gray-600">
              {currentLanguage === 'en' ?'Choose from our carefully selected funds and start with just ₹10' :'हमारे सावधानीपूर्वक चुने गए फंडों में से चुनें और केवल ₹10 से शुरुआत करें'
              }
            </p>
          </div>

          {!selectedCategory ? (
            /* Fund Categories */
            (<div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentLanguage === 'en' ? 'Choose Investment Type' : 'निवेश प्रकार चुनें'}
              </h2>
              <div className="space-y-3">
                {['etf', 'mutual', 'index']?.map((category) => (
                  <FundCategoryCard
                    key={category}
                    category={category}
                    onSelect={handleCategorySelect}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>
            </div>)
          ) : !selectedFund ? (
            /* Fund List */
            (<div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentLanguage === 'en' ? 'Select Fund' : 'फंड चुनें'}
                </h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
              </div>
              <div className="grid gap-4">
                {mockFunds?.[selectedCategory]?.map((fund) => (
                  <FundCard
                    key={fund?.id}
                    fund={fund}
                    onInvest={handleFundSelect}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>
            </div>)
          ) : (
            /* Investment Configuration */
            (<div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentLanguage === 'en' ? 'Configure Investment' : 'निवेश कॉन्फ़िगर करें'}
                </h2>
                <button
                  onClick={() => setSelectedFund(null)}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
              </div>
              {/* Selected Fund Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedFund?.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {currentLanguage === 'en' ? 'Expected Returns' : 'अपेक्षित रिटर्न'}
                  </span>
                  <span className="font-medium text-green-600">
                    {selectedFund?.expectedReturns}% {currentLanguage === 'en' ? 'p.a.' : 'प्रति वर्ष'}
                  </span>
                </div>
              </div>
              <InvestmentAmountSelector
                onAmountChange={setInvestmentAmount}
                currentLanguage={currentLanguage}
              />
              <SIPOptionsToggle
                onSIPChange={setSipOptions}
                currentLanguage={currentLanguage}
              />
              <TrustIndicators currentLanguage={currentLanguage} />
              <PaymentMethodSelector
                onPaymentMethodChange={setPaymentMethod}
                currentLanguage={currentLanguage}
              />
              {/* Invest Button */}
              <div className="sticky bottom-20 bg-white p-4 border-t border-gray-200 -mx-4">
                <button
                  onClick={handleInvestNow}
                  disabled={investmentAmount < 10}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentLanguage === 'en' 
                    ? `Invest ₹${investmentAmount?.toLocaleString('en-IN')}` 
                    : `₹${investmentAmount?.toLocaleString('en-IN')} निवेश करें`
                  }
                </button>
              </div>
            </div>)
          )}
        </div>
      </main>
      <BottomTabNavigation />
      {/* Confirmation Modal */}
      {showConfirmation && (
        <InvestmentConfirmation
          investmentDetails={getInvestmentDetails()}
          onConfirm={handleConfirmInvestment}
          onCancel={() => setShowConfirmation(false)}
          currentLanguage={currentLanguage}
        />
      )}
      {/* Success Animation */}
      {showSuccess && (
        <SuccessAnimation
          investmentDetails={getInvestmentDetails()}
          onViewPortfolio={handleViewPortfolio}
          onInvestMore={handleInvestMore}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default InvestmentSelectionPurchase;