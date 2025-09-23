import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual authentication API call
    try {
      // Mock authentication - replace with real API call
      if (email === "admin@mockinterviewai.com" && password === "admin123") {
        localStorage.setItem('adminToken', 'mock-jwt-token');
        localStorage.setItem('adminUser', JSON.stringify({ email, role: 'admin' }));

        toast({
          title: "Login successful",
          description: "Welcome to the Admin Portal",
        });

        navigate("/admin");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 space-y-6">
        {/* Card Container */}
        <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-md">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">Mock Interview AI</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-200 text-gray-900"
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-gray-200 text-gray-900 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full bg-green-500 text-white hover:shadow-lg">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 text-gray-400 my-2">
            <hr className="flex-1 border-gray-300" />
            <span>or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <a
              href="/auth/google"
              className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5" />
              Sign in with Google
            </a>
            <a
              href="/auth/facebook"
              className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-icon-svg-download-png-1350125.png?f=webp&w=256" alt="Facebook" className="h-5 w-5" />
              Sign in with Facebook
            </a>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 rounded-lg bg-gray-100 text-sm text-gray-500">
            <p><span className="font-medium">Email:</span> admin@mockinterviewai.com</p>
            <p><span className="font-medium">Password:</span> admin123</p>
          </div>
        </Card>
      </div>
    </div>

  );
};

export default Login;