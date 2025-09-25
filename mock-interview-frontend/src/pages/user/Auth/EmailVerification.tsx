import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";


const EmailVerification = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const verificationToken = params.get("token");
      const userId = params.get("id");

      try {
        const response = await fetch("http://localhost:5001/api/mock-interview/verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, token: verificationToken }),
        });

        if (response.ok) {
          setVerificationStatus(true);
        } else {
          setVerificationStatus(false);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationStatus(false);
      }
    };

    verifyEmail();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="gray-50 p-8 w-full max-w-md text-center">

        {verificationStatus === null && (
          <div>
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verifying your email...</h2>
            <p className="text-gray-600 mb-4">Please wait while we verify your email address.</p>
          </div>
        )}

        {verificationStatus === true && (
          <div>
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Email verified successfully!</h2>
            <p className="text-gray-600 mb-6">Your email has been verified. Continue to login.</p>
            <button
              onClick={() => navigate('/login') }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Continue to Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {verificationStatus === false && (
          <div>
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification failed</h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't verify your email. The link may have expired or is invalid.
            </p>
            <button
              onClick={() => { navigate('/') }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend Verification
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmailVerification;
