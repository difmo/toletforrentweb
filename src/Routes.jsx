import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PropertySearchBrowse from './pages/property-search-browse';
import MessagesPage from './pages/messages-communication';
import PropertyListingCreation from './pages/property-listing-creation';
import PropertyDetailsBooking from './pages/property-details-booking';
import UserRegistrationLogin from './pages/user-registration-login';
import OwnerDashboard from './pages/owner-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MessagesPage />} />
        <Route path="/property-search-browse" element={<PropertySearchBrowse />} />
        <Route path="/messages-communication" element={<MessagesPage />} />
        <Route path="/property-listing-creation" element={<PropertyListingCreation />} />
        <Route path="/property-details-booking" element={<PropertyDetailsBooking />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
