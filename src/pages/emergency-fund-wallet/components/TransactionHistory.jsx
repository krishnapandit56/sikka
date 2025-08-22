import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TransactionHistory = ({ currentLanguage }) => {
  const [filter, setFilter] = useState('all');

  const content = {
    en: {
      title: "Transaction History",
      all: "All",
      deposits: "Deposits",
      withdrawals: "Withdrawals",
      interest: "Interest",
      noTransactions: "No transactions found",
      deposit: "Deposit",
      withdrawal: "Withdrawal",
      interestEarned: "Interest Earned",
      balance: "Balance",
      today: "Today",
      yesterday: "Yesterday",
      thisWeek: "This Week",
      thisMonth: "This Month",
      older: "Older"
    },
    hi: {
      title: "लेनदेन इतिहास",
      all: "सभी",
      deposits: "जमा",
      withdrawals: "निकासी",
      interest: "ब्याज",
      noTransactions: "कोई लेनदेन नहीं मिला",
      deposit: "जमा",
      withdrawal: "निकासी",
      interestEarned: "ब्याज अर्जित",
      balance: "बैलेंस",
      today: "आज",
      yesterday: "कल",
      thisWeek: "इस सप्ताह",
      thisMonth: "इस महीने",
      older: "पुराने"
    }
  };

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 5000,
      date: new Date('2025-01-22'),
      balance: 45750,
      description: 'UPI Transfer'
    },
    {
      id: 2,
      type: 'interest',
      amount: 125,
      date: new Date('2025-01-21'),
      balance: 40750,
      description: 'Monthly Interest'
    },
    {
      id: 3,
      type: 'deposit',
      amount: 2000,
      date: new Date('2025-01-20'),
      balance: 40625,
      description: 'Auto Round-up'
    },
    {
      id: 4,
      type: 'withdrawal',
      amount: 3000,
      date: new Date('2025-01-18'),
      balance: 38625,
      description: 'Emergency Medical'
    },
    {
      id: 5,
      type: 'deposit',
      amount: 10000,
      date: new Date('2025-01-15'),
      balance: 41625,
      description: 'Salary Allocation'
    },
    {
      id: 6,
      type: 'deposit',
      amount: 1500,
      date: new Date('2025-01-10'),
      balance: 31625,
      description: 'Manual Transfer'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return content?.[currentLanguage]?.today;
    if (diffDays === 2) return content?.[currentLanguage]?.yesterday;
    if (diffDays <= 7) return content?.[currentLanguage]?.thisWeek;
    if (diffDays <= 30) return content?.[currentLanguage]?.thisMonth;
    return content?.[currentLanguage]?.older;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return { icon: 'ArrowUp', color: 'text-success' };
      case 'withdrawal':
        return { icon: 'ArrowDown', color: 'text-error' };
      case 'interest':
        return { icon: 'TrendingUp', color: 'text-primary' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getTransactionLabel = (type) => {
    switch (type) {
      case 'deposit':
        return content?.[currentLanguage]?.deposit;
      case 'withdrawal':
        return content?.[currentLanguage]?.withdrawal;
      case 'interest':
        return content?.[currentLanguage]?.interestEarned;
      default:
        return type;
    }
  };

  const filteredTransactions = transactions?.filter(transaction => {
    if (filter === 'all') return true;
    return transaction?.type === filter;
  });

  const filters = [
    { key: 'all', label: content?.[currentLanguage]?.all },
    { key: 'deposit', label: content?.[currentLanguage]?.deposits },
    { key: 'withdrawal', label: content?.[currentLanguage]?.withdrawals },
    { key: 'interest', label: content?.[currentLanguage]?.interest }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {content?.[currentLanguage]?.title}
        </h3>
        <Icon name="History" size={20} className="text-muted-foreground" />
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {filters?.map((filterOption) => (
          <button
            key={filterOption?.key}
            onClick={() => setFilter(filterOption?.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === filterOption?.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterOption?.label}
          </button>
        ))}
      </div>
      {/* Transaction List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTransactions?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {content?.[currentLanguage]?.noTransactions}
            </p>
          </div>
        ) : (
          filteredTransactions?.map((transaction) => {
            const { icon, color } = getTransactionIcon(transaction?.type);
            
            return (
              <div
                key={transaction?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-card ${color}`}>
                    <Icon name={icon} size={20} />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      {getTransactionLabel(transaction?.type)}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {transaction?.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction?.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction?.type === 'withdrawal' ? 'text-error' : 'text-success'
                  }`}>
                    {transaction?.type === 'withdrawal' ? '-' : '+'}
                    {formatCurrency(transaction?.amount)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {content?.[currentLanguage]?.balance}: {formatCurrency(transaction?.balance)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;