import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLoader: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Get token from URL query
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://mockinterview-ymzx.onrender.com/api/admin/google-login", {
          credentials: "include"
        });
        const data = await res.json();

        console.log("Admin details: ", data);
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminId", data.id);
        localStorage.setItem("adminName", data.name);
        localStorage.setItem("adminEmail", data.email);
        localStorage.setItem("adminPhotoURL", data.photo);
        localStorage.setItem("created_at", data.created_at);

        if (!data.id) {
          navigate('/admin/login');
          return;
        }
        navigate('/dashboard');

      } catch (err) {
        console.error("Authentication check failed:", err);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Return null if not loading
  if (!loading) return null;

  // Loader JSX
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#ffffff', // White background
      color: '#333',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Inline keyframes */}
      <style>{`
        @keyframes spinArrow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Spinner shaped like an arrow */}
      <div style={{
        width: '60px',
        height: '60px',
        border: '6px solid rgba(0,0,0,0.1)',
        borderTop: '6px solid #1e90ff', // arrow color
        borderRadius: '50%',
        animation: 'spinArrow 1s linear infinite',
        marginBottom: '20px'
      }}></div>

      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: 500,
        letterSpacing: '0.5px',
        animation: 'fadeIn 1.5s ease-in-out infinite alternate'
      }}>
        Verifying your account...
      </h2>
    </div>
  );
};

export default AuthLoader;
