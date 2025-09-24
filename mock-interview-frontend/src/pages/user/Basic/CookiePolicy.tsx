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
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Cookie Policy
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Learn about how we use cookies to improve your experience on our AI Mock Interview platform.
          </p>
        </div>

        {/* Cookie Preferences */}
        <Card className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <Settings className="h-5 w-5 text-primary" />
              Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-0">
            {[
              {
                title: "Essential Cookies",
                description: "Required for the website to function properly. Cannot be disabled.",
                state: essentialCookies,
                setState: setEssentialCookies,
                disabled: true,
              },
              {
                title: "Analytics Cookies",
                description: "Help us understand how you use our website to improve performance.",
                state: analyticsCookies,
                setState: setAnalyticsCookies,
              },
              {
                title: "Marketing Cookies",
                description: "Used to deliver personalized advertisements and content.",
                state: marketingCookies,
                setState: setMarketingCookies,
              },
            ].map((cookie, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{cookie.title}</h4>
                  <p className="text-sm text-gray-500">{cookie.description}</p>
                </div>
                <Switch
                  checked={cookie.state}
                  onCheckedChange={cookie.setState}
                  disabled={cookie.disabled}
                />
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button>Save Preferences</Button>
              <Button variant="outline">Accept All</Button>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Information */}
        <div className="space-y-8">
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                Cookies are small text files placed on your device when you visit our website.
                They help us provide a better experience by remembering your preferences,
                analyzing usage, and improving AI algorithms based on interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Shield className="h-5 w-5 text-primary" />
                Essential Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                Necessary for website functionality and cannot be switched off.
              </p>
              <div className="grid gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
                  <p className="text-sm text-gray-500">Keep you logged in and maintain session security.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                  <p className="text-sm text-gray-500">Protect against fraud and maintain website security.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Functionality</h4>
                  <p className="text-sm text-gray-500">Remember your preferences and settings for a better experience.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <BarChart3 className="h-5 w-5 text-primary" />
                Analytics Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                Help us understand visitor interactions by collecting information anonymously.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Analytics</h4>
                  <p className="text-sm text-gray-500">Track popular features and user navigation patterns.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Monitoring</h4>
                  <p className="text-sm text-gray-500">Monitor performance and identify areas for improvement.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">Marketing Cookies</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Used to deliver advertisements more relevant to you and your interests.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Content</h4>
                <p className="text-sm text-gray-500">
                  Show relevant blog posts, interview tips, and career advice based on your activity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                We may use third-party services that place cookies on your device:
              </p>
              <ul className="space-y-2 text-sm text-gray-500 ml-4 leading-relaxed">
                <li>• Google Analytics for website analytics</li>
                <li>• Authentication providers for secure login</li>
                <li>• Content delivery networks for faster loading</li>
                <li>• Customer support chat services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">Managing Your Cookies</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">You can control cookies through:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Browser Settings</h4>
                  <p className="text-sm text-gray-500">Most browsers allow control through their settings.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Our Cookie Preferences</h4>
                  <p className="text-sm text-gray-500">Use the preferences panel above to customize your cookie settings.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p><strong>Email:</strong> cookies@aimockinterview.com</p>
                <p><strong>Address:</strong> 123 AI Street, Tech City, TC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-gray-500">
          <p>
            This Cookie Policy was last updated in December 2024. We may update this policy 
            from time to time to reflect changes in practices, operational, legal, or regulatory reasons.
          </p>
        </div>
      </div>
    </div>
  );
}
