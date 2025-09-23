import { Cookie, Settings, BarChart3, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CookiePolicy() {
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about how we use cookies to improve your experience on our AI Mock Interview platform.
          </p>
        </div>

        {/* Cookie Preferences */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Required for the website to function properly. Cannot be disabled.
                </p>
              </div>
              <Switch checked={essentialCookies} disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how you use our website to improve performance.
                </p>
              </div>
              <Switch 
                checked={analyticsCookies} 
                onCheckedChange={setAnalyticsCookies}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements and content.
                </p>
              </div>
              <Switch 
                checked={marketingCookies} 
                onCheckedChange={setMarketingCookies}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button>Save Preferences</Button>
              <Button variant="outline">Accept All</Button>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our service, and improving our AI algorithms based on user interactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Essential Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These cookies are necessary for the website to function and cannot be switched off. 
                They are usually only set in response to actions made by you.
              </p>
              <div className="grid gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep you logged in and maintain your session security.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Protect against fraud and maintain website security.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Functionality</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences and settings for a better experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                These cookies help us understand how visitors interact with our website by 
                collecting and reporting information anonymously.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Usage Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Track which features are most popular and how users navigate through interviews.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor website performance and identify areas for improvement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                These cookies are used to deliver advertisements more relevant to you and your interests.
              </p>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Personalized Content</h4>
                <p className="text-sm text-muted-foreground">
                  Show you relevant blog posts, interview tips, and career advice based on your activity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may use third-party services that place cookies on your device:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Google Analytics for website analytics</li>
                <li>• Authentication providers for secure login</li>
                <li>• Content delivery networks for faster loading</li>
                <li>• Customer support chat services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You can control cookies through:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Most browsers allow you to control cookies through their settings.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Our Cookie Preferences</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the preferences panel above to customize your cookie settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> cookies@aimockinterview.com</p>
                <p><strong>Address:</strong> 123 AI Street, Tech City, TC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            This Cookie Policy was last updated in December 2024. We may update this policy 
            from time to time to reflect changes in our practices or for other operational, 
            legal, or regulatory reasons.
          </p>
        </div>
      </div>
    </div>
  );
}