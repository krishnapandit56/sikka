import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmergencyFundWallet from './pages/emergency-fund-wallet';
import InvestmentSelectionPurchase from './pages/investment-selection-purchase';
import UserProfileSettings from './pages/user-profile-settings';
import InvestmentLearningChatbot from './pages/investment-learning-chatbot';
import InvestmentDashboard from './pages/investment-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EmergencyFundWallet />} />
        <Route path="/emergency-fund-wallet" element={<EmergencyFundWallet />} />
        <Route path="/investment-selection-purchase" element={<InvestmentSelectionPurchase />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/investment-learning-chatbot" element={<InvestmentLearningChatbot />} />
        <Route path="/investment-dashboard" element={<InvestmentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
