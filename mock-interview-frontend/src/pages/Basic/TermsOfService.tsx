import { Scale, Users, AlertTriangle, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Scale className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our AI Mock Interview System.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-primary/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Effective Date:</strong> December 2024. By accessing or using our service, 
            you agree to be bound by these Terms of Service.
          </AlertDescription>
        </Alert>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By creating an account or using our AI Mock Interview System, you acknowledge 
                that you have read, understood, and agree to be bound by these Terms of Service 
                and our Privacy Policy. If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To use our service, you must:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Be at least 16 years of age</li>
                <li>• Provide accurate and complete registration information</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Use the service for legitimate interview preparation purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our AI Mock Interview System provides:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">AI-Powered Interviews</h4>
                  <p className="text-sm text-muted-foreground">
                    Simulated interview experiences with AI-generated questions and feedback.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed analysis of your interview performance and improvement suggestions.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Progress Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your improvement over time with comprehensive statistics.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Educational Resources</h4>
                  <p className="text-sm text-muted-foreground">
                    Access to blogs, tips, and best practices for interview success.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You agree to:</p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Use the service only for lawful purposes</li>
                <li>• Not attempt to reverse engineer or exploit our AI systems</li>
                <li>• Respect intellectual property rights</li>
                <li>• Not share account credentials with others</li>
                <li>• Provide honest responses during mock interviews</li>
                <li>• Report any bugs or security vulnerabilities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All content, software, and materials provided through our service are owned by 
                us or our licensors and are protected by copyright, trademark, and other 
                intellectual property laws. You may not copy, modify, distribute, or create 
                derivative works without explicit permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our service is provided "as is" without warranties of any kind. We are not 
                liable for any damages arising from your use of the service, including but 
                not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your account at any time for 
                violation of these terms. You may also terminate your account at any time 
                through your account settings or by contacting us.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may modify these Terms of Service at any time. We will notify you of 
                significant changes via email or through our service. Continued use of 
                the service after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@aimockinterview.com</p>
                <p><strong>Address:</strong> 123 AI Street, Tech City, TC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            These terms constitute the entire agreement between you and AI Mock Interview System 
            regarding your use of our service.
          </p>
        </div>
      </div>
    </div>
  );
}