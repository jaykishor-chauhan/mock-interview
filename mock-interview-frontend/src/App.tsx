import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Portal Imports
import Layout from "./layouts/UserLayout";
import Index from "./pages/user/Index";
import Login from "./pages/user/Auth/Login";
import Register from "./pages/user/Auth/Register";
import ForgotPassword from "./pages/user/Auth/ResetPassword";
import Profile from "./pages/user/Profile";
import InterviewTopics from "./pages/user/Interview/InterviewTopics";
import InterviewSession from "./pages/user/Interview/InterviewSession";
import InterviewResults from "./pages/user/Interview/InterviewResults";
import Blogs from "./pages/user/Basic/Blogs";
import Contact from "./pages/user/Basic/Contact";
import RequestQuote from "./pages/user/Basic/RequestQuote";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/user/Basic/PrivacyPolicy";
import TermsOfService from "./pages/user/Basic/TermsOfService";
import CookiePolicy from "./pages/user/Basic/CookiePolicy";
import NewPassword from "./pages/user/Auth/NewPassword";
import EmailVerification from "./pages/user/Auth/EmailVerification";
import CheckPermissions from "./pages/user/Interview/CheckPermissions";
import VerificationSent from "./pages/user/VerificationSent";





// Admin Portal Imports
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AddQuestionForm from "./pages/admin/AddQuestionForm";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import Questions from "./pages/admin/Questions";
import Reports from "./pages/admin/Reports";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Users routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification" element={<EmailVerification />} />
          <Route path="verification-sent" element={<VerificationSent />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="interview/session" element={<InterviewSession />} />
          <Route path="interview/results" element={<InterviewResults />} />
          <Route path="/check-permissions" element={<CheckPermissions />} />

          {/* Layout routes for users */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} /> //this defult index page on Layout on '/'
            <Route path="profile" element={<Profile />} />
            <Route path="interviews" element={<InterviewTopics />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="quote" element={<RequestQuote />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="cookies" element={<CookiePolicy />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/admin/login" element={ < AdminLogin />} />

          {/* Layout routes for admin  */}
          <Route path="/add-question" element={<AddQuestionForm />} />
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="courses" element={<Courses />} />
            <Route path="questions" element={<Questions />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* fallback when page not found.. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>


    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
