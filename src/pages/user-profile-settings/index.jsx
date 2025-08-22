import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import InvestmentPreferencesSection from './components/InvestmentPreferencesSection';
import SecuritySection from './components/SecuritySection';
import NotificationPreferencesSection from './components/NotificationPreferencesSection';
import BankAccountSection from './components/BankAccountSection';
import DocumentUploadSection from './components/DocumentUploadSection';
import ReferralSection from './components/ReferralSection';
import SupportSection from './components/SupportSection';

const UserProfileSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userProfile, setUserProfile] = useState({
    name: "Rajesh Kumar",
    mobile: "+91 9876543210",
    email: "rajesh.kumar@email.com",
    language: "en",
    dateOfBirth: "1985-06-15",
    occupation: "farmer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    memberSince: "Jan 2024",
    isVerified: true,
    referralCode: "SIKKA2024RK",
    investmentPreferences: {
      riskTolerance: "moderate",
      knowledgeLevel: "beginner",
      investmentGoal: "wealth",
      monthlyInvestment: "500-1000"
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: "2025-07-15"
    },
    notificationPreferences: {
      portfolioUpdates: { sms: true, email: true, push: true },
      goalAchievements: { sms: true, email: false, push: true },
      educationalContent: { sms: false, email: true, push: false },
      marketAlerts: { sms: true, email: true, push: true },
      transactionAlerts: { sms: true, email: true, push: true }
    },
    documents: {
      aadhaar: {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
        status: "verified",
        uploadedAt: "2024-01-15T10:30:00Z"
      },
      pan: {
        url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
        status: "verified",
        uploadedAt: "2024-01-15T10:35:00Z"
      },
      bankStatement: {
        url: null,
        status: null,
        uploadedAt: null
      },
      addressProof: {
        url: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=250&fit=crop",
        status: "pending",
        uploadedAt: "2024-01-20T14:20:00Z"
      }
    }
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sikka-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleAvatarChange = (newAvatar) => {
    setUserProfile(prev => ({
      ...prev,
      avatar: newAvatar
    }));
  };

  const handleUpdateProfile = (updatedData) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setUserProfile(prev => ({
      ...prev,
      investmentPreferences: updatedPreferences
    }));
  };

  const handleUpdateSecurity = (updatedSecurity) => {
    setUserProfile(prev => ({
      ...prev,
      security: {
        ...prev?.security,
        ...updatedSecurity
      }
    }));
  };

  const handleUpdateNotifications = (updatedNotifications) => {
    setUserProfile(prev => ({
      ...prev,
      notificationPreferences: updatedNotifications
    }));
  };

  const handleUpdateBankAccounts = (updatedAccounts) => {
    // Handle bank account updates
    console.log('Bank accounts updated:', updatedAccounts);
  };

  const handleUpdateDocuments = (updatedDocuments) => {
    setUserProfile(prev => ({
      ...prev,
      documents: updatedDocuments
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 max-w-4xl">
        <ProfileHeader 
          userProfile={userProfile}
          onAvatarChange={handleAvatarChange}
          currentLanguage={currentLanguage}
        />

        <PersonalInfoSection 
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          currentLanguage={currentLanguage}
        />

        <InvestmentPreferencesSection 
          userProfile={userProfile}
          onUpdatePreferences={handleUpdatePreferences}
          currentLanguage={currentLanguage}
        />

        <SecuritySection 
          userProfile={userProfile}
          onUpdateSecurity={handleUpdateSecurity}
          currentLanguage={currentLanguage}
        />

        <NotificationPreferencesSection 
          userProfile={userProfile}
          onUpdateNotifications={handleUpdateNotifications}
          currentLanguage={currentLanguage}
        />

        <BankAccountSection 
          userProfile={userProfile}
          onUpdateBankAccounts={handleUpdateBankAccounts}
          currentLanguage={currentLanguage}
        />

        <DocumentUploadSection 
          userProfile={userProfile}
          onUpdateDocuments={handleUpdateDocuments}
          currentLanguage={currentLanguage}
        />

        <ReferralSection 
          userProfile={userProfile}
          currentLanguage={currentLanguage}
        />

        <SupportSection 
          currentLanguage={currentLanguage}
        />
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default UserProfileSettings;