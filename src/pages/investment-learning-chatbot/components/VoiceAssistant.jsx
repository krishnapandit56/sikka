import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = ({ currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!voiceSupported) {
      alert(currentLanguage === 'en' ?'Voice recognition not supported in this browser' :'इस ब्राउज़र में आवाज पहचान समर्थित नहीं है'
      );
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
    };

    recognition.onresult = (event) => {
      const speechResult = event?.results?.[0]?.[0]?.transcript;
      setTranscript(speechResult);
      processVoiceCommand(speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const response = generateVoiceResponse(command);
      setResponse(response);
      setIsProcessing(false);
      
      // Speak the response
      speakResponse(response);
    }, 1000);
  };

  const generateVoiceResponse = (command) => {
    const lowerCommand = command?.toLowerCase();
    
    if (lowerCommand?.includes('portfolio') || lowerCommand?.includes('पोर्टफोलियो')) {
      return currentLanguage === 'en' ?'Your current portfolio value is ₹2,450 with a growth of 8.5% this month. You have invested in 3 different funds.' :'आपके पोर्टफोलियो की वर्तमान वैल्यू ₹2,450 है इस महीने 8.5% की वृद्धि के साथ। आपने 3 अलग-अलग फंड में निवेश किया है।';
    }
    
    if (lowerCommand?.includes('balance') || lowerCommand?.includes('बैलेंस')) {
      return currentLanguage === 'en' ?'Your emergency fund balance is ₹850 and your investment balance is ₹2,450. Total portfolio value is ₹3,300.' :'आपका आपातकालीन फंड बैलेंस ₹850 है और निवेश बैलेंस ₹2,450 है। कुल पोर्टफोलियो वैल्यू ₹3,300 है।';
    }
    
    if (lowerCommand?.includes('invest') || lowerCommand?.includes('निवेश')) {
      return currentLanguage === 'en' ?'To make a new investment, you can say "invest 100 rupees in mutual fund" or go to the investment section in the app.' : 'नया निवेश करने के लिए, आप"म्यूचुअल फंड में 100 रुपये निवेश करें" कह सकते हैं या ऐप में निवेश सेक्शन में जा सकते हैं।';
    }
    
    return currentLanguage === 'en' ?'I heard you say: "' + command + '". I can help you check your portfolio, balance, make investments, or answer questions about your money. What would you like to know?' : 'मैंने आपको कहते सुना:"' + command + '"। मैं आपके पोर्टफोलियो, बैलेंस की जांच, निवेश करने या आपके पैसे के बारे में सवालों के जवाब देने में मदद कर सकता हूं। आप क्या जानना चाहते हैं?';
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
      utterance.rate = 0.8;
      window.speechSynthesis?.speak(utterance);
    }
  };

  const voiceCommands = [
    {
      command: currentLanguage === 'en' ? 'Check my portfolio' : 'मेरा पोर्टफोलियो चेक करें',
      description: currentLanguage === 'en' ? 'Get your current investment status' : 'अपनी वर्तमान निवेश स्थिति जानें'
    },
    {
      command: currentLanguage === 'en' ? 'What is my balance?' : 'मेरा बैलेंस क्या है?',
      description: currentLanguage === 'en' ? 'Check your total balance' : 'अपना कुल बैलेंस चेक करें'
    },
    {
      command: currentLanguage === 'en' ? 'How to invest money?' : 'पैसा कैसे निवेश करें?',
      description: currentLanguage === 'en' ? 'Learn about investment process' : 'निवेश प्रक्रिया के बारे में जानें'
    },
    {
      command: currentLanguage === 'en' ? 'Show my returns' : 'मेरे रिटर्न दिखाएं',
      description: currentLanguage === 'en' ? 'View your investment returns' : 'अपने निवेश रिटर्न देखें'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Voice Assistant Interface */}
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <div className="mb-6">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening ? 'bg-primary animate-pulse' : 'bg-primary/10'
          }`}>
            <Icon 
              name={isListening ? 'MicIcon' : 'Mic'} 
              size={32} 
              className={isListening ? 'text-primary-foreground' : 'text-primary'} 
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          {currentLanguage === 'en' ? 'Voice Assistant' : 'आवाज सहायक'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {isListening 
            ? (currentLanguage === 'en' ? 'Listening... Speak now' : 'सुन रहा हूं... अब बोलें')
            : (currentLanguage === 'en' ? 'Tap the microphone and ask me anything' : 'माइक्रोफोन दबाएं और मुझसे कुछ भी पूछें')
          }
        </p>

        <button
          onClick={startListening}
          disabled={isListening || isProcessing}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            isListening || isProcessing
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isListening 
            ? (currentLanguage === 'en' ? 'Listening...' : 'सुन रहा हूं...')
            : isProcessing
            ? (currentLanguage === 'en' ? 'Processing...' : 'प्रोसेसिंग...')
            : (currentLanguage === 'en' ? 'Start Voice Chat' : 'आवाज चैट शुरू करें')
          }
        </button>

        {!voiceSupported && (
          <p className="text-warning text-sm mt-4">
            {currentLanguage === 'en' ?'Voice recognition not supported in this browser' :'इस ब्राउज़र में आवाज पहचान समर्थित नहीं है'
            }
          </p>
        )}
      </div>
      {/* Transcript and Response */}
      {(transcript || response) && (
        <div className="space-y-4">
          {transcript && (
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="User" size={20} className="text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {currentLanguage === 'en' ? 'You said:' : 'आपने कहा:'}
                  </p>
                  <p className="text-muted-foreground">{transcript}</p>
                </div>
              </div>
            </div>
          )}

          {response && (
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="Bot" size={20} className="text-success mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {currentLanguage === 'en' ? 'Sikka Assistant:' : 'सिक्का सहायक:'}
                  </p>
                  <p className="text-muted-foreground">{response}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Voice Commands Help */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h4 className="font-semibold text-foreground mb-4">
          {currentLanguage === 'en' ? 'Try these voice commands:' : 'इन आवाज कमांड को आज़माएं:'}
        </h4>
        
        <div className="space-y-3">
          {voiceCommands?.map((cmd, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="Volume2" size={16} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground text-sm">"{cmd?.command}"</p>
                <p className="text-xs text-muted-foreground">{cmd?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Language Note */}
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <Icon name="Globe" size={20} className="text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          {currentLanguage === 'en' ?'Voice assistant supports both Hindi and English. Switch language anytime from the top menu.' :'आवाज सहायक हिंदी और अंग्रेजी दोनों का समर्थन करता है। ऊपरी मेनू से कभी भी भाषा बदलें।'
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant;