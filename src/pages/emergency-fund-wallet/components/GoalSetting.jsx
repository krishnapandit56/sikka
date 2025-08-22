import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalSetting = ({ currentLanguage, onClose, onSave }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [targetMonths, setTargetMonths] = useState(6);
  const [customGoal, setCustomGoal] = useState(false);
  const [customAmount, setCustomAmount] = useState(180000);

  const content = {
    en: {
      title: "Set Emergency Fund Goal",
      subtitle: "Calculate your ideal emergency fund target",
      monthlyExpenses: "Monthly Expenses",
      expensesPlaceholder: "Enter your monthly expenses",
      targetMonths: "Target Months",
      monthsDesc: "How many months of expenses to save",
      customGoal: "Set Custom Goal",
      customAmount: "Custom Amount",
      recommendedGoal: "Recommended Goal",
      yourGoal: "Your Goal",
      saveGoal: "Save Goal",
      cancel: "Cancel",
      expenseCategories: "Common expense categories:",
      categories: [
        "Rent/EMI",
        "Food & Groceries", 
        "Utilities",
        "Transportation",
        "Healthcare",
        "Other expenses"
      ],
      tip: "Tip: Include all essential monthly expenses for accurate calculation"
    },
    hi: {
      title: "आपातकालीन फंड लक्ष्य सेट करें",
      subtitle: "अपना आदर्श आपातकालीन फंड लक्ष्य गणना करें",
      monthlyExpenses: "मासिक खर्च",
      expensesPlaceholder: "अपना मासिक खर्च दर्ज करें",
      targetMonths: "लक्ष्य महीने",
      monthsDesc: "कितने महीने का खर्च बचाना है",
      customGoal: "कस्टम लक्ष्य सेट करें",
      customAmount: "कस्टम राशि",
      recommendedGoal: "अनुशंसित लक्ष्य",
      yourGoal: "आपका लक्ष्य",
      saveGoal: "लक्ष्य सेव करें",
      cancel: "रद्द करें",
      expenseCategories: "सामान्य खर्च श्रेणियां:",
      categories: [
        "किराया/EMI",
        "भोजन और किराना",
        "उपयोगिताएं",
        "परिवहन",
        "स्वास्थ्य सेवा",
        "अन्य खर्च"
      ],
      tip: "सुझाव: सटीक गणना के लिए सभी आवश्यक मासिक खर्च शामिल करें"
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const calculatedGoal = monthlyExpenses * targetMonths;
  const finalGoal = customGoal ? customAmount : calculatedGoal;

  const handleSave = () => {
    onSave({
      monthlyExpenses,
      targetMonths,
      goalAmount: finalGoal,
      isCustom: customGoal
    });
    onClose();
  };

  const monthOptions = [3, 6, 9, 12];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {content?.[currentLanguage]?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {content?.[currentLanguage]?.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Monthly Expenses Input */}
        <div className="mb-6">
          <Input
            label={content?.[currentLanguage]?.monthlyExpenses}
            type="number"
            placeholder={content?.[currentLanguage]?.expensesPlaceholder}
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e?.target?.value))}
            className="mb-4"
          />

          {/* Expense Categories Helper */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm font-medium text-foreground mb-2">
              {content?.[currentLanguage]?.expenseCategories}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {content?.[currentLanguage]?.categories?.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-xs text-muted-foreground">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Months Selection */}
        {!customGoal && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              {content?.[currentLanguage]?.targetMonths}
            </label>
            <p className="text-xs text-muted-foreground mb-4">
              {content?.[currentLanguage]?.monthsDesc}
            </p>
            
            <div className="grid grid-cols-4 gap-2">
              {monthOptions?.map((months) => (
                <button
                  key={months}
                  onClick={() => setTargetMonths(months)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    targetMonths === months
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-lg font-semibold">{months}</div>
                  <div className="text-xs">
                    {currentLanguage === 'en' ? 'months' : 'महीने'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Goal Toggle */}
        <div className="mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={customGoal}
              onChange={(e) => setCustomGoal(e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-foreground">
              {content?.[currentLanguage]?.customGoal}
            </span>
          </label>
        </div>

        {/* Custom Amount Input */}
        {customGoal && (
          <div className="mb-6">
            <Input
              label={content?.[currentLanguage]?.customAmount}
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e?.target?.value))}
            />
          </div>
        )}

        {/* Goal Summary */}
        <div className="bg-primary/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {customGoal ? content?.[currentLanguage]?.yourGoal : content?.[currentLanguage]?.recommendedGoal}
            </span>
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(finalGoal)}
          </div>
          {!customGoal && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(monthlyExpenses)} × {targetMonths} {currentLanguage === 'en' ? 'months' : 'महीने'}
            </p>
          )}
        </div>

        {/* Tip */}
        <div className="bg-muted/50 rounded-lg p-3 mb-6">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <p className="text-xs text-muted-foreground">
              {content?.[currentLanguage]?.tip}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {content?.[currentLanguage]?.cancel}
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            className="flex-1"
          >
            {content?.[currentLanguage]?.saveGoal}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;