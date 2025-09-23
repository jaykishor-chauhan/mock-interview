import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { KeyRound, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const NewPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Get token and id from the URL (e.g., /new-password?token=...&id=...)
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("id");

    useEffect(() => {
        if (!token || !userId) {
            toast({
                variant: "destructive",
                description: "The password reset link is incomplete.",
            });
            navigate("/forget-password");
        }
    }, [token, userId, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                variant: "destructive",
                description: "Passwords do not match.",
            });
            return;
        }
        setLoading(true);

        try {
            const response = await fetch("https://mock-interview-backend-nyby.onrender.com/api/mock-interview/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, token, newPassword: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message || "Failed to reset password. The link may be invalid or expired.",
                });
                return;
            }

            setIsSuccess(true); // Show the success message
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Network Error",
                description: "Could not connect to the server.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div>
                    {!isSuccess ? (
                        <CardHeader className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
                                <KeyRound className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <CardTitle className="text-2xl">Set a New Password</CardTitle>
                            <CardDescription>
                                Your new password must be different from previously used passwords.
                            </CardDescription>
                        </CardHeader>
                    ) : (null)}
                    <CardContent>
                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                        required
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your new password"
                                        required
                                        className="h-11"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={loading}
                                >
                                    {loading ? "Updating Password..." : "Reset Password"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center space-y-6">
                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                <h3 className="text-xl font-semibold">Password Updated!</h3>
                                <p className="text-muted-foreground">
                                    Your password has been changed successfully. You can now log in.
                                </p>
                                <Button asChild className="w-full">
                                    <Link to="/login">Proceed to Login</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
