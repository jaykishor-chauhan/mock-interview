import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';


const VerificationSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-100 p-8 w-full max-w-md text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          A verification email has been sent!
        </h2>
        <p className="text-gray-600 mb-6">
          Please check your inbox at <strong>{email || "your email address"}</strong> and follow the instructions to verify your account.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center mx-auto"
        >
          Continue to Login
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default VerificationSent;
