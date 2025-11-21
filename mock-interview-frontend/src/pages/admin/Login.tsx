import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      toast({
        description: decodeURIComponent(errorMessage),
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          description: data.message || "An error occurred. Please try again.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminId", data.user.id);
      localStorage.setItem("adminName", data.user.name);
      localStorage.setItem("adminEmail", data.user.email);
      localStorage.setItem("adminPhotoURL", data.user.photo);
      localStorage.setItem("created_at", data.user.created_at);

      navigate("/dashboard");

    } catch (error) {
      toast({
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
        <div className="p-8 bg-gray-50 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-600 pb-5">Sign in to manage your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              aria-label="Email address"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-900 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <Link
                to="/forgot-password?role=admin"
                className="text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              >
                Forgot password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full border border-gray-300 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
              }}
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

          {/* Signup link */}
          <div className="text-center text-sm text-gray-600 pt-2">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
