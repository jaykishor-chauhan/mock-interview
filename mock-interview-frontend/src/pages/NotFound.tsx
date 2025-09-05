import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-destructive/20">
          <CardContent className="pt-6 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            {/* Error Code */}
            <div>
              <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
              <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground">
                Sorry, the page you are looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                You might be looking for:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/interviews">Interviews</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/blogs">Blogs</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
