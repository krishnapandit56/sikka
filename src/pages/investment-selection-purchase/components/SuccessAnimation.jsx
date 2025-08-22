import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessAnimation = ({ 
  investmentDetails, 
  onViewPortfolio, 
  onInvestMore, 
  currentLanguage 
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount) => {
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const confettiColors = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4 z-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: confettiColors?.[i % confettiColors?.length],
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
      <div className="max-w-md w-full text-center">
        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 
          }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Icon name="CheckCircle" size={48} className="text-green-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentLanguage === 'en' ? 'Investment Successful!' : 'निवेश सफल!'}
          </h1>
          <p className="text-gray-600">
            {currentLanguage === 'en' ?'Congratulations! Your investment has been processed successfully.' :'बधाई हो! आपका निवेश सफलतापूर्वक संसाधित हो गया है।'
            }
          </p>
        </motion.div>

        {/* Investment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {currentLanguage === 'en' ? 'Fund' : 'फंड'}
              </span>
              <span className="font-medium text-gray-900">
                {investmentDetails?.fund?.name}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {currentLanguage === 'en' ? 'Amount Invested' : 'निवेशित राशि'}
              </span>
              <span className="font-bold text-xl text-primary">
                {formatCurrency(investmentDetails?.amount)}
              </span>
            </div>

            {investmentDetails?.sip?.enabled && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {currentLanguage === 'en' ? 'SIP' : 'SIP'}
                </span>
                <span className="font-medium text-green-600">
                  {currentLanguage === 'en' ? 'Active' : 'सक्रिय'}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Growth Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
        >
          <h3 className="font-medium text-gray-900 mb-3">
            {currentLanguage === 'en' ? 'Potential Growth' : 'संभावित वृद्धि'}
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {[1, 5, 10]?.map((years) => {
              const projectedValue = Math.round(
                investmentDetails?.amount * Math.pow(1.12, years)
              );
              return (
                <div key={years} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    {years} {currentLanguage === 'en' ? 'Year' : 'साल'}{years > 1 ? 's' : ''}
                  </p>
                  <p className="font-semibold text-green-600 text-sm">
                    {formatCurrency(projectedValue)}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="space-y-3"
        >
          <Button
            variant="default"
            fullWidth
            onClick={onViewPortfolio}
            iconName="PieChart"
            iconPosition="left"
          >
            {currentLanguage === 'en' ? 'View Portfolio' : 'पोर्टफोलियो देखें'}
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={onInvestMore}
            iconName="Plus"
            iconPosition="left"
          >
            {currentLanguage === 'en' ? 'Invest More' : 'और निवेश करें'}
          </Button>
        </motion.div>

        {/* Celebration Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6"
        >
          <p className="text-sm text-gray-500">
            {currentLanguage === 'en' ?'🎉 You\'re now on your way to financial growth!' :'🎉 अब आप वित्तीय वृद्धि के रास्ते पर हैं!'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessAnimation;