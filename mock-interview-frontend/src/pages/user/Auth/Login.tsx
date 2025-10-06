import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Brain, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: data.message || "An unknown error occurred.",
        });
        return;
      }

      toast({
        description: "Login successful!",
      });

      if (data) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Server error. Could not connect to the server.",
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
            <h1 className="text-2xl font-semibold text-gray-900 mt-3">
              Welcome Back!
            </h1>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-11 bg-gradient-primary hover:opacity-90">
              {loading ? "Signing In..." : "Sign In"}
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
              Sign in with Google
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/register")}
              disabled={loading}
              className="p-0 font-medium underline:no-underline"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
