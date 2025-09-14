import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ResetPassword";
import Profile from "./pages/Profile";
import InterviewTopics from "./pages/Interview/InterviewTopics";
import InterviewSession from "./pages/Interview/InterviewSession";
import InterviewResults from "./pages/Interview/InterviewResults";
import Blogs from "./pages/Basic/Blogs";
import Contact from "./pages/Basic/Contact";
import RequestQuote from "./pages/Basic/RequestQuote";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/Basic/PrivacyPolicy";
import TermsOfService from "./pages/Basic/TermsOfService";
import CookiePolicy from "./pages/Basic/CookiePolicy";
import NewPassword from "./pages/Auth/NewPassword";
import CheckPermissions from "./pages/Interview/CheckPermissions";
import InterviewInterface from "./pages/Interview/InterviewInterface";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="interview/session" element={<InterviewSession />} />
          <Route path="interview/results" element={<InterviewResults />} />
          <Route path="/check-permissions" element={<CheckPermissions />} />
          <Route path="/test-interview" element={<InterviewInterface />} />



          {/* Layout routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="profile" element={<Profile />} />
            <Route path="interviews" element={<InterviewTopics />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="quote" element={<RequestQuote />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
