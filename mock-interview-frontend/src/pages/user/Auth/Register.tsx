import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Brain, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          description: "Passwords do not match.",
          title: "Error",
        });
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // Not a JSON response
        }
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorData?.message || "An unknown error occurred. Please try again.",
        });
        return;
      }
      toast({
        title: "Success!",
        description: "Registration successful! You can now log in.",
      });
      const email = payload.email;
      navigate("/verification-sent", { state: { email } });

    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not connect to the server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="p-8 bg-gray-50 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mt-3">Create your account</h1>
            <p className="text-sm text-gray-600 max-w-[40ch] mx-auto mt-1">Sign up to access curated interview courses and practice questions.</p>
          </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="h-11 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="h-11 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-gradient-primary hover:opacity-90" disabled={loading}>
                {loading ? ("Creating Account...") : ("Create Account")}
              </Button>
            </form>
            {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Login with Google */}
          <div className="space-y-3">
            <button
              // onClick={() => {
              //   window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
              // }}
              className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="h-5 w-5"
              />
              Sign up with Google
            </button>
          </div>
            <div className="text-center text-sm text-muted-foreground m-4">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="p-0 font-medium underline:no-underline"
              >
                Sign in
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
