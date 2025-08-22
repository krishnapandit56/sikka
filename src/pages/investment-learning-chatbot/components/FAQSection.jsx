import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = ({ currentLanguage }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: {
        en: "Is my money safe with Sikka?",
        hi: "क्या सिक्का के साथ मेरा पैसा सुरक्षित है?"
      },
      answer: {
        en: `Yes, your money is completely safe! Here's why:\n\n• SEBI Regulated: All our funds are regulated by Securities Exchange Board of India\n• Trustee Protection: Your money is held by independent trustee banks, not by Sikka\n• Professional Management: Experienced fund managers handle your investments\n• Diversification: Your money is spread across multiple companies to reduce risk\n• Transparency: You can track every rupee and see exactly where it's invested\n\nThink of it like keeping money in a government-approved bank that invests wisely for you.`,
        hi: `हाँ, आपका पैसा पूरी तरह सुरक्षित है! यहाँ क्यों:\n\n• SEBI नियंत्रित: हमारे सभी फंड भारतीय प्रतिभूति और विनिमय बोर्ड द्वारा नियंत्रित हैं\n• ट्रस्टी सुरक्षा: आपका पैसा स्वतंत्र ट्रस्टी बैंकों के पास है, सिक्का के पास नहीं\n• पेशेवर प्रबंधन: अनुभवी फंड मैनेजर आपके निवेश को संभालते हैं\n• विविधीकरण: जोखिम कम करने के लिए आपका पैसा कई कंपनियों में फैलाया गया है\n• पारदर्शिता: आप हर रुपये को ट्रैक कर सकते हैं और देख सकते हैं कि यह कहाँ निवेशित है\n\nइसे सरकार द्वारा अनुमोदित बैंक में पैसा रखने जैसा समझें जो आपके लिए बुद्धिमानी से निवेश करता है।`
      }
    },
    {
      id: 2,
      question: {
        en: "How quickly can I withdraw my money?",
        hi: "मैं कितनी जल्दी अपना पैसा निकाल सकता हूं?"
      },
      answer: {
        en: `Withdrawal speed depends on the type of investment:\n\n🚨 Emergency Fund:\n• Instant withdrawal (within 30 minutes)\n• Available 24/7, even on holidays\n• No penalties or charges\n\n💰 Regular Investments:\n• Mutual Funds: 1-3 working days\n• ETFs: Same day (if sold before 3 PM)\n• Index Funds: 1-2 working days\n\n📱 Process:\n1. Open Sikka app\n2. Go to 'My Portfolio'\n3. Select fund and amount\n4. Confirm with OTP\n5. Money transferred to your bank\n\nIt's as simple as transferring money between bank accounts!`,hi: `निकासी की गति निवेश के प्रकार पर निर्भर करती है:\n\n🚨 आपातकालीन फंड:\n• तुरंत निकासी (30 मिनट के भीतर)\n• 24/7 उपलब्ध, छुट्टियों में भी\n• कोई जुर्माना या शुल्क नहीं\n\n💰 नियमित निवेश:\n• म्यूचुअल फंड: 1-3 कार्य दिवस\n• ETF: उसी दिन (यदि दोपहर 3 बजे से पहले बेचा गया)\n• इंडेक्स फंड: 1-2 कार्य दिवस\n\n📱 प्रक्रिया:\n1. सिक्का ऐप खोलें\n2. 'मेरा पोर्टफोलियो' में जाएं\n3. फंड और राशि चुनें\n4. OTP से पुष्टि करें\n5. पैसा आपके बैंक में ट्रांसफर\n\nयह बैंक खातों के बीच पैसा ट्रांसफर करने जितना आसान है!`
      }
    },
    {
      id: 3,
      question: {
        en: "What are the tax implications of my investments?",
        hi: "मेरे निवेश के कर निहितार्थ क्या हैं?"
      },
      answer: {
        en: `Tax treatment is simple and investor-friendly:\n\n💰 Short Term (Less than 1 year):\n• Equity Funds: 15% tax on profits\n• Debt Funds: Added to your income, taxed as per your slab\n\n🌱 Long Term (More than 1 year):\n• Equity Funds: 10% tax on profits above ₹1 lakh per year\n• Debt Funds: 20% with indexation benefit\n\n🎯 Tax Saving:\n• ELSS funds qualify for 80C deduction (up to ₹1.5 lakh)\n• SIP investments spread your tax liability\n\n📊 Example:\nIf you earn ₹50,000 profit in 2 years from equity funds:\n• First ₹1 lakh profit per year = No tax\n• Your ₹50,000 = No tax!\n\nWe provide detailed tax statements to make filing easy.`,
        hi: `कर उपचार सरल और निवेशक-अनुकूल है:\n\n💰 अल्पकालिक (1 साल से कम):\n• इक्विटी फंड: लाभ पर 15% कर\n• डेट फंड: आपकी आय में जोड़ा जाता है, आपके स्लैब के अनुसार कर\n\n🌱 दीर्घकालिक (1 साल से अधिक):\n• इक्विटी फंड: प्रति वर्ष ₹1 लाख से अधिक लाभ पर 10% कर\n• डेट फंड: इंडेक्सेशन लाभ के साथ 20%\n\n🎯 कर बचत:\n• ELSS फंड 80C कटौती के लिए योग्य (₹1.5 लाख तक)\n• SIP निवेश आपकी कर देयता को फैलाता है\n\n📊 उदाहरण:\nयदि आप इक्विटी फंड से 2 साल में ₹50,000 लाभ कमाते हैं:\n• प्रति वर्ष पहले ₹1 लाख लाभ = कोई कर नहीं\n• आपके ₹50,000 = कोई कर नहीं!\n\nहम फाइलिंग को आसान बनाने के लिए विस्तृत कर विवरण प्रदान करते हैं।`
      }
    },
    {
      id: 4,
      question: {
        en: "How does the round-up feature work?",
        hi: "राउंड-अप फीचर कैसे काम करता है?"
      },
      answer: {
        en: `Round-up is a smart way to invest spare change automatically:\n\n🛒 How it works:\n• You buy coffee for ₹47\n• We round it up to ₹50\n• The extra ₹3 gets invested automatically\n• This happens with all your transactions\n\n💡 Example:\n• Coffee: ₹47 → ₹3 invested\n• Groceries: ₹287 → ₹13 invested\n• Bus ticket: ₹23 → ₹7 invested\n• Daily total: ₹23 invested without you noticing!\n\n📈 Impact:\n• Average ₹20-30 invested daily\n• ₹600-900 per month\n• ₹7,200-10,800 per year\n• Potential value after 5 years: ₹50,000-75,000\n\n⚙️ Control:\n• Turn on/off anytime\n• Set maximum daily limit\n• Choose which cards to include\n\nIt's like having a digital piggy bank that invests for you!`,
        hi: `राउंड-अप अतिरिक्त पैसे को अपने आप निवेश करने का एक स्मार्ट तरीका है:\n\n🛒 यह कैसे काम करता है:\n• आप ₹47 में कॉफी खरीदते हैं\n• हम इसे ₹50 तक राउंड करते हैं\n• अतिरिक्त ₹3 अपने आप निवेश हो जाता है\n• यह आपके सभी लेनदेन के साथ होता है\n\n💡 उदाहरण:\n• कॉफी: ₹47 → ₹3 निवेशित\n• किराना: ₹287 → ₹13 निवेशित\n• बस टिकट: ₹23 → ₹7 निवेशित\n• दैनिक कुल: ₹23 निवेशित बिना आपको पता चले!\n\n📈 प्रभाव:\n• औसतन ₹20-30 दैनिक निवेश\n• ₹600-900 प्रति महीना\n• ₹7,200-10,800 प्रति वर्ष\n• 5 साल बाद संभावित मूल्य: ₹50,000-75,000\n\n⚙️ नियंत्रण:\n• कभी भी चालू/बंद करें\n• अधिकतम दैनिक सीमा सेट करें\n• कौन से कार्ड शामिल करने हैं चुनें\n\nयह एक डिजिटल गुल्लक रखने जैसा है जो आपके लिए निवेश करती है!`
      }
    },
    {
      id: 5,
      question: {
        en: "What happens if the market crashes?",
        hi: "यदि बाजार गिर जाए तो क्या होगा?"
      },
      answer: {
        en: `Market crashes are temporary, and here's how we protect you:\n\n📉 During Market Crash:\n• Your investment value may decrease temporarily\n• You still own the same number of fund units\n• Professional fund managers adjust strategy\n• Diversification limits your losses\n\n🛡️ Protection Strategies:\n• Emergency fund stays separate and safe\n• Only invest money you won't need for 3+ years\n• SIP continues buying at lower prices (good for you!)\n• Diversified funds recover faster than individual stocks\n\n📈 Historical Reality:\n• Markets have always recovered from crashes\n• 2008 crash: Markets recovered in 3 years\n• 2020 COVID crash: Recovered in 1 year\n• Long-term investors always profit\n\n💡 What to do:\n• Don't panic and sell\n• Continue your SIPs (buy more at lower prices)\n• Think long-term (5+ years)\n• Remember: Temporary problem, permanent solution\n\nCrashes are like sales in a shop - everything becomes cheaper!`,
        hi: `बाजार में गिरावट अस्थायी होती है, और यहाँ बताया गया है कि हम आपकी सुरक्षा कैसे करते हैं:\n\n📉 बाजार गिरावट के दौरान:\n• आपके निवेश की वैल्यू अस्थायी रूप से कम हो सकती है\n• आपके पास अभी भी उतनी ही फंड यूनिट्स हैं\n• पेशेवर फंड मैनेजर रणनीति समायोजित करते हैं\n• विविधीकरण आपके नुकसान को सीमित करता है\n\n🛡️ सुरक्षा रणनीतियां:\n• आपातकालीन फंड अलग और सुरक्षित रहता है\n• केवल वह पैसा निवेश करें जिसकी आपको 3+ साल तक जरूरत नहीं\n• SIP कम कीमतों पर खरीदना जारी रखता है (आपके लिए अच्छा!)\n• विविधीकृत फंड व्यक्तिगत स्टॉक से तेजी से ठीक होते हैं\n\n📈 ऐतिहासिक वास्तविकता:\n• बाजार हमेशा गिरावट से उबरे हैं\n• 2008 की गिरावट: 3 साल में बाजार ठीक हुए\n• 2020 COVID गिरावट: 1 साल में ठीक हुए\n• लंबी अवधि के निवेशक हमेशा लाभ कमाते हैं\n\n💡 क्या करना चाहिए:\n• घबराकर बेचें नहीं\n• अपने SIP जारी रखें (कम कीमतों पर अधिक खरीदें)\n• लंबी अवधि (5+ साल) सोचें\n• याद रखें: अस्थायी समस्या, स्थायी समाधान\n\nगिरावट दुकान में सेल जैसी है - सब कुछ सस्ता हो जाता है!`
      }
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {currentLanguage === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
        </h3>
        <p className="text-muted-foreground">
          {currentLanguage === 'en' ?'Get answers to common questions about investing with Sikka' :'सिक्का के साथ निवेश के बारे में सामान्य प्रश्नों के उत्तर पाएं'
          }
        </p>
      </div>
      {faqData?.map((faq) => (
        <div key={faq?.id} className="bg-card rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => toggleFAQ(faq?.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
          >
            <span className="font-medium text-foreground pr-4">
              {faq?.question?.[currentLanguage]}
            </span>
            <Icon 
              name={expandedFAQ === faq?.id ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground flex-shrink-0" 
            />
          </button>
          
          {expandedFAQ === faq?.id && (
            <div className="px-6 pb-4">
              <div className="pt-2 border-t border-border">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {faq?.answer?.[currentLanguage]}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Contact Support */}
      <div className="bg-primary/5 rounded-lg p-6 text-center border border-primary/20">
        <Icon name="HelpCircle" size={24} className="text-primary mx-auto mb-3" />
        <h4 className="font-semibold text-foreground mb-2">
          {currentLanguage === 'en' ? 'Still have questions?' : 'अभी भी प्रश्न हैं?'}
        </h4>
        <p className="text-muted-foreground mb-4">
          {currentLanguage === 'en' ?'Our support team is here to help you 24/7' :'हमारी सहायता टीम 24/7 आपकी मदद के लिए यहाँ है'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
            {currentLanguage === 'en' ? 'Chat with Support' : 'सहायता से चैट करें'}
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200">
            {currentLanguage === 'en' ? 'Call Us' : 'हमें कॉल करें'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;