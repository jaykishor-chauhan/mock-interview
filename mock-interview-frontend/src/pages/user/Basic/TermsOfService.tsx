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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            Please read these terms carefully before using our AI Mock Interview System.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border border-gray-200 rounded-xl shadow-sm">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm text-gray-500">
            <strong>Effective Date:</strong> December 2024. By accessing or using our service,
            you agree to be bound by these Terms of Service.
          </AlertDescription>
        </Alert>

        {/* Terms Content */}
        <div className="space-y-8">
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <FileCheck className="h-5 w-5 mr-2 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                By creating an account or using our AI Mock Interview System, you acknowledge
                that you have read, understood, and agree to be bound by these Terms of Service
                and our Privacy Policy. If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Users className="h-5 w-5 mr-2 text-primary" />
                User Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                To use our service, you must:
              </p>
              <ul className="space-y-2 text-sm text-gray-500 ml-4 leading-relaxed">
                <li>• Be at least 16 years of age</li>
                <li>• Provide accurate and complete registration information</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Use the service for legitimate interview preparation purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                Our AI Mock Interview System provides:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "AI-Powered Interviews",
                    desc: "Simulated interview experiences with AI-generated questions and feedback.",
                  },
                  {
                    title: "Performance Analytics",
                    desc: "Detailed analysis of your interview performance and improvement suggestions.",
                  },
                  {
                    title: "Progress Tracking",
                    desc: "Monitor your improvement over time with comprehensive statistics.",
                  },
                  {
                    title: "Educational Resources",
                    desc: "Access to blogs, tips, and best practices for interview success.",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">You agree to:</p>
              <ul className="space-y-2 text-sm text-gray-500 ml-4 leading-relaxed">
                <li>• Use the service only for lawful purposes</li>
                <li>• Not attempt to reverse engineer or exploit our AI systems</li>
                <li>• Respect intellectual property rights</li>
                <li>• Not share account credentials with others</li>
                <li>• Provide honest responses during mock interviews</li>
                <li>• Report any bugs or security vulnerabilities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                All content, software, and materials provided through our service are owned by
                us or our licensors and are protected by copyright, trademark, and other
                intellectual property laws. You may not copy, modify, distribute, or create
                derivative works without explicit permission.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                Our service is provided "as is" without warranties of any kind. We are not
                liable for any damages arising from your use of the service, including but
                not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time for
                violation of these terms. You may also terminate your account at any time
                through your account settings or by contacting us.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                We may modify these Terms of Service at any time. We will notify you of
                significant changes via email or through our service. Continued use of
                the service after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p><strong>Email:</strong> legal@aimockinterview.com</p>
                <p><strong>Address:</strong> 123 AI Street, Tech City, TC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-gray-500">
          <p>
            These terms constitute the entire agreement between you and AI Mock Interview System
            regarding your use of our service.
          </p>
        </div>
      </div>
    </div>
  );
}
