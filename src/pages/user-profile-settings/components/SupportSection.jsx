import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupportSection = ({ currentLanguage }) => {
  const [isRequestingCallback, setIsRequestingCallback] = useState(false);
  const [callbackData, setCallbackData] = useState({
    phone: '',
    preferredTime: '',
    issue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      support: 'Customer Support',
      helpCenter: 'Help Center',
      callbackRequest: 'Request Callback',
      liveChat: 'Live Chat',
      email: 'Email Support',
      phone: 'Phone Support',
      faq: 'Frequently Asked Questions',
      phoneNumber: 'Phone Number',
      preferredTime: 'Preferred Time',
      issueDescription: 'Issue Description',
      submit: 'Submit Request',
      cancel: 'Cancel',
      submitting: 'Submitting...',
      availableHours: 'Available 9 AM - 6 PM',
      responseTime: 'Response within 24 hours',
      instantSupport: 'Instant support available',
      callSupport: 'Call Support',
      emailSupport: 'Email Support',
      chatSupport: 'Chat Support',
      morning: 'Morning (9 AM - 12 PM)',
      afternoon: 'Afternoon (12 PM - 4 PM)',
      evening: 'Evening (4 PM - 6 PM)'
    },
    hi: {
      support: 'ग्राहक सहायता',
      helpCenter: 'सहायता केंद्र',
      callbackRequest: 'कॉलबैक का अनुरोध करें',
      liveChat: 'लाइव चैट',
      email: 'ईमेल सहायता',
      phone: 'फोन सहायता',
      faq: 'अक्सर पूछे जाने वाले प्रश्न',
      phoneNumber: 'फोन नंबर',
      preferredTime: 'पसंदीदा समय',
      issueDescription: 'समस्या का विवरण',
      submit: 'अनुरोध भेजें',
      cancel: 'रद्द करें',
      submitting: 'भेज रहे हैं...',
      availableHours: 'सुबह 9 बजे - शाम 6 बजे उपलब्ध',
      responseTime: '24 घंटे के भीतर जवाब',
      instantSupport: 'तत्काल सहायता उपलब्ध',
      callSupport: 'कॉल सहायता',
      emailSupport: 'ईमेल सहायता',
      chatSupport: 'चैट सहायता',
      morning: 'सुबह (9 बजे - 12 बजे)',
      afternoon: 'दोपहर (12 बजे - 4 बजे)',
      evening: 'शाम (4 बजे - 6 बजे)'
    }
  };

  const supportOptions = [
    {
      key: 'phone',
      title: content?.[currentLanguage]?.callSupport,
      description: content?.[currentLanguage]?.availableHours,
      icon: 'Phone',
      action: () => window.open('tel:+911800123456'),
      color: 'text-success'
    },
    {
      key: 'email',
      title: content?.[currentLanguage]?.emailSupport,
      description: content?.[currentLanguage]?.responseTime,
      icon: 'Mail',
      action: () => window.open('mailto:support@sikka.app'),
      color: 'text-primary'
    },
    {
      key: 'chat',
      title: content?.[currentLanguage]?.chatSupport,
      description: content?.[currentLanguage]?.instantSupport,
      icon: 'MessageCircle',
      action: () => console.log('Open chat'),
      color: 'text-accent'
    }
  ];

  const timeOptions = [
    { value: 'morning', label: content?.[currentLanguage]?.morning },
    { value: 'afternoon', label: content?.[currentLanguage]?.afternoon },
    { value: 'evening', label: content?.[currentLanguage]?.evening }
  ];

  const faqItems = [
    {
      question: currentLanguage === 'en' ? 'How do I start investing?' : 'मैं निवेश कैसे शुरू करूं?',
      answer: currentLanguage === 'en' ?'You can start investing with just ₹10. Complete your KYC, add money to your wallet, and choose from our recommended investment options.' :'आप केवल ₹10 से निवेश शुरू कर सकते हैं। अपना केवाईसी पूरा करें, अपने वॉलेट में पैसे जोड़ें, और हमारे सुझाए गए निवेश विकल्पों में से चुनें।'
    },
    {
      question: currentLanguage === 'en' ? 'Is my money safe?' : 'क्या मेरा पैसा सुरक्षित है?',
      answer: currentLanguage === 'en' ?'Yes, your investments are regulated by SEBI and held with trusted fund houses. Your personal data is encrypted and secure.' :'हां, आपके निवेश सेबी द्वारा नियंत्रित हैं और विश्वसनीय फंड हाउसों के साथ रखे गए हैं। आपका व्यक्तिगत डेटा एन्क्रिप्टेड और सुरक्षित है।'
    },
    {
      question: currentLanguage === 'en' ? 'How can I withdraw money?' : 'मैं पैसे कैसे निकाल सकता हूं?',
      answer: currentLanguage === 'en' ?'You can withdraw your investments anytime. Emergency fund withdrawals are instant, while investment withdrawals take 1-3 business days.' :'आप अपने निवेश कभी भी निकाल सकते हैं। आपातकालीन फंड निकासी तत्काल है, जबकि निवेश निकासी में 1-3 व्यावसायिक दिन लगते हैं।'
    }
  ];

  const handleInputChange = (field, value) => {
    setCallbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitCallback = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsRequestingCallback(false);
    setCallbackData({
      phone: '',
      preferredTime: '',
      issue: ''
    });
  };

  const handleCancel = () => {
    setIsRequestingCallback(false);
    setCallbackData({
      phone: '',
      preferredTime: '',
      issue: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="HelpCircle" size={20} className="text-primary" />
          <span>{content?.[currentLanguage]?.support}</span>
        </h2>
      </div>
      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {supportOptions?.map((option) => (
          <div key={option?.key} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
            <div className="text-center">
              <Icon name={option?.icon} size={32} className={`${option?.color} mx-auto mb-3`} />
              <h3 className="font-semibold text-foreground mb-2">{option?.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{option?.description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={option?.action}
                fullWidth
              >
                {option?.title}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Callback Request */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">{content?.[currentLanguage]?.callbackRequest}</h3>
          {!isRequestingCallback && (
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => setIsRequestingCallback(true)}
            >
              {content?.[currentLanguage]?.callbackRequest}
            </Button>
          )}
        </div>

        {isRequestingCallback && (
          <div className="border border-border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label={content?.[currentLanguage]?.phoneNumber}
                type="tel"
                value={callbackData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="+91 9876543210"
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {content?.[currentLanguage]?.preferredTime}
                </label>
                <select
                  value={callbackData?.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Select time</option>
                  {timeOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {content?.[currentLanguage]?.issueDescription}
              </label>
              <textarea
                value={callbackData?.issue}
                onChange={(e) => handleInputChange('issue', e?.target?.value)}
                placeholder="Describe your issue..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {content?.[currentLanguage]?.cancel}
              </Button>
              <Button
                variant="default"
                onClick={handleSubmitCallback}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
              >
                {isSubmitting ? content?.[currentLanguage]?.submitting : content?.[currentLanguage]?.submit}
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* FAQ Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{content?.[currentLanguage]?.faq}</h3>
        <div className="space-y-4">
          {faqItems?.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">{faq?.question}</h4>
              <p className="text-sm text-muted-foreground">{faq?.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm">
            {currentLanguage === 'en' ? 'View All FAQs' : 'सभी FAQ देखें'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;