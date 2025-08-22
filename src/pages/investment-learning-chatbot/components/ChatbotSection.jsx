import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ChatbotSection = ({ currentLanguage }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    {
      en: "Where is my money?",
      hi: "मेरा पैसा कहाँ है?"
    },
    {
      en: "How much will I earn?",
      hi: "मैं कितना कमाऊंगा?"
    },
    {
      en: "Is my money safe?",
      hi: "क्या मेरा पैसा सुरक्षित है?"
    },
    {
      en: "How to withdraw?",
      hi: "कैसे निकालें?"
    }
  ];

  const initialMessage = {
    id: 1,
    type: 'bot',
    content: {
      en: `Hello! I'm Sikka AI, your investment assistant. I'm here to help you understand investments in simple terms. Ask me anything about your money, investments, or how Sikka works!`,
      hi: `नमस्ते! मैं सिक्का AI हूँ, आपका निवेश सहायक। मैं आपको सरल शब्दों में निवेश समझाने के लिए यहाँ हूँ। मुझसे अपने पैसे, निवेश या सिक्का कैसे काम करता है के बारे में कुछ भी पूछें!`
    },
    timestamp: new Date()
  };

  useEffect(() => {
    if (messages?.length === 0) {
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('money') || lowerMessage?.includes('पैसा')) {
      return currentLanguage === 'en' 
        ? `Your money is invested in carefully selected ETFs and Mutual Funds. Think of it like this: instead of keeping money in one place, we spread it across many good companies, just like not putting all eggs in one basket! 🥚\n\nYour investments are:\n• Protected by SEBI regulations\n• Managed by professional fund managers\n• Diversified across multiple companies\n\nWould you like to see exactly where your ₹100 is invested?`
        : `आपका पैसा सावधानी से चुने गए ETF और म्यूचुअल फंड में निवेशित है। इसे ऐसे समझें: पैसे को एक जगह रखने के बजाय, हमने इसे कई अच्छी कंपनियों में फैलाया है, जैसे सभी अंडे एक टोकरी में न रखना! 🥚\n\nआपके निवेश:\n• SEBI नियमों द्वारा सुरक्षित\n• पेशेवर फंड मैनेजरों द्वारा प्रबंधित\n• कई कंपनियों में विविधीकृत\n\nक्या आप देखना चाहते हैं कि आपके ₹100 कहाँ निवेशित हैं?`;
    }
    
    if (lowerMessage?.includes('earn') || lowerMessage?.includes('कमा')) {
      return currentLanguage === 'en'
        ? `Great question! Your earnings depend on market performance, but here's a simple example:\n\n🌱 If you invest ₹10 daily:\n• In 1 year: ₹3,650 invested\n• Potential growth: ₹4,000-4,500 (10-12% returns)\n• Your profit: ₹350-850\n\nIt's like planting a seed that grows into a tree! The longer you keep it, the bigger it grows. 🌳\n\nRemember: Past performance doesn't guarantee future results, but historically, good funds have given 10-15% annual returns.`
        : `बहुत अच्छा सवाल! आपकी कमाई बाजार के प्रदर्शन पर निर्भर करती है, लेकिन यहाँ एक सरल उदाहरण है:\n\n🌱 यदि आप रोज ₹10 निवेश करते हैं:\n• 1 साल में: ₹3,650 निवेशित\n• संभावित वृद्धि: ₹4,000-4,500 (10-12% रिटर्न)\n• आपका लाभ: ₹350-850\n\nयह बीज बोने जैसा है जो पेड़ बन जाता है! जितना लंबा रखेंगे, उतना बड़ा होगा। 🌳\n\nयाद रखें: पिछला प्रदर्शन भविष्य की गारंटी नहीं है, लेकिन ऐतिहासिक रूप से अच्छे फंड ने 10-15% वार्षिक रिटर्न दिया है।`;
    }
    
    if (lowerMessage?.includes('safe') || lowerMessage?.includes('सुरक्षित')) {
      return currentLanguage === 'en' ? `Yes, your money is safe! Here's why:\n\n🛡️ **Regulatory Protection:**\n• SEBI (Securities Exchange Board) regulates all funds\n• Your money is held by trustee banks, not by us\n• Regular audits and compliance checks\n\n🏦 **Fund Safety:**\n• Professional fund managers\n• Diversified investments (not just one company)\n• Transparent reporting\n\n💡 **Think of it like this:**\nIt's like keeping your money in a government-approved bank that invests in many businesses instead of just one.\n\nRisk exists (like any investment), but it's much safer than keeping cash at home!`
        : `हाँ, आपका पैसा सुरक्षित है! यहाँ क्यों:\n\n🛡️ **नियामक सुरक्षा:**\n• SEBI (सिक्यूरिटीज एक्सचेंज बोर्ड) सभी फंड को नियंत्रित करता है\n• आपका पैसा ट्रस्टी बैंकों के पास है, हमारे पास नहीं\n• नियमित ऑडिट और अनुपालन जांच\n\n🏦 **फंड सुरक्षा:**\n• पेशेवर फंड मैनेजर\n• विविधीकृत निवेश (सिर्फ एक कंपनी में नहीं)\n• पारदर्शी रिपोर्टिंग\n\n💡 **इसे ऐसे समझें:**\nयह सरकार द्वारा अनुमोदित बैंक में पैसा रखने जैसा है जो सिर्फ एक के बजाय कई व्यवसायों में निवेश करता है।\n\nजोखिम है (किसी भी निवेश की तरह), लेकिन घर में नकदी रखने से कहीं ज्यादा सुरक्षित है!`;
    }
    
    if (lowerMessage?.includes('withdraw') || lowerMessage?.includes('निकाल')) {
      return currentLanguage === 'en' ? `Withdrawing money is simple! Here's how:\n\n💳 **Regular Investments:**\n• Go to 'My Portfolio' section\n• Select the fund you want to withdraw from\n• Choose amount (minimum ₹100)\n• Money reaches your bank in 1-3 working days\n\n🚨 **Emergency Fund:**\n• Instant withdrawal available 24/7\n• Money reaches your account in 30 minutes\n• No penalties or charges\n\n📱 **Steps:**\n1. Tap 'Withdraw' button\n2. Enter amount\n3. Confirm with OTP\n4. Done!\n\nIt's as easy as withdrawing from an ATM! 🏧`
        : `पैसा निकालना आसान है! यहाँ कैसे:\n\n💳 **नियमित निवेश:**\n• 'मेरा पोर्टफोलियो' सेक्शन में जाएं\n• जिस फंड से निकालना है उसे चुनें\n• राशि चुनें (न्यूनतम ₹100)\n• 1-3 कार्य दिवसों में पैसा आपके बैंक में पहुंच जाता है\n\n🚨 **आपातकालीन फंड:**\n• 24/7 तुरंत निकासी उपलब्ध\n• 30 मिनट में पैसा आपके खाते में\n• कोई जुर्माना या शुल्क नहीं\n\n📱 **चरण:**\n1. 'निकालें' बटन दबाएं\n2. राशि दर्ज करें\n3. OTP से पुष्टि करें\n4. हो गया!\n\nयह ATM से पैसा निकालने जितना आसान है! 🏧`;
    }
    
    // Default response
    return currentLanguage === 'en' ? `I understand you're asking about investments. Let me help you with that!\n\nI can explain:\n• Where your money goes when you invest\n• How much you might earn\n• Safety of your investments\n• How to withdraw money\n• Investment basics in simple terms\n\nWhat specific topic would you like to know more about? You can also use the quick questions below! 😊`
      : `मैं समझ गया कि आप निवेश के बारे में पूछ रहे हैं। मैं आपकी मदद करता हूँ!\n\nमैं समझा सकता हूँ:\n• निवेश करने पर आपका पैसा कहाँ जाता है\n• आप कितना कमा सकते हैं\n• आपके निवेश की सुरक्षा\n• पैसा कैसे निकालें\n• सरल शब्दों में निवेश की मूल बातें\n\nआप किस विशिष्ट विषय के बारे में और जानना चाहते हैं? आप नीचे दिए गए त्वरित प्रश्न भी उपयोग कर सकते हैं! 😊`;
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question?.[currentLanguage]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-lg border border-border">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-border">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Sikka AI Assistant' : 'सिक्का AI सहायक'}
          </h3>
          <p className="text-xs text-success">
            {currentLanguage === 'en' ? 'Online' : 'ऑनलाइन'}
          </p>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-line">
                {typeof message?.content === 'object' 
                  ? message?.content?.[currentLanguage] 
                  : message?.content
                }
              </p>
              <p className="text-xs opacity-70 mt-1">
                {message?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Questions */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions?.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full text-xs transition-colors duration-200"
            >
              {question?.[currentLanguage]}
            </button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            placeholder={currentLanguage === 'en' ? 'Ask me anything about investments...' : 'निवेश के बारे में कुछ भी पूछें...'}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage?.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSection;