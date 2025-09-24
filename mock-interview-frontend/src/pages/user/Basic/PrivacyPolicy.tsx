import { Shield, FileText, Eye, Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security
            of your personal information.
          </p>
        </div>

        {/* Last Updated */}
        <Card className="mb-8 border border-gray-200 rounded-xl shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>Last updated: December 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Personal Information
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We collect information you provide directly to us, such as when
                  you create an account, participate in interviews, or contact us
                  for support. This may include your name, email address, profile
                  information, and interview responses.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Usage Information
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We automatically collect information about your use of our
                  service, including interview performance data, feature usage,
                  and interaction patterns to improve our AI algorithms and user
                  experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <ul className="space-y-2 text-sm text-gray-500 leading-relaxed">
                <li>• Provide and improve our mock interview services</li>
                <li>• Generate personalized AI feedback and recommendations</li>
                <li>• Communicate with you about your account and our services</li>
                <li>• Analyze usage patterns to enhance user experience</li>
                <li>• Ensure the security and integrity of our platform</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. Your interview data is
                encrypted and stored securely.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <p className="text-sm text-gray-500 leading-relaxed">
                You have the right to access, update, or delete your personal
                information. You can also opt out of certain communications and
                request data portability.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Access & Update
                  </h4>
                  <p className="text-sm text-gray-500">
                    View and modify your personal information through your
                    account settings.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Data Deletion
                  </h4>
                  <p className="text-sm text-gray-500">
                    Request deletion of your account and associated data at any
                    time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>
                  <strong>Email:</strong> privacy@aimockinterview.com
                </p>
                <p>
                  <strong>Address:</strong> 123 AI Street, Tech City, TC 12345
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-gray-500">
          <p>
            By using our service, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
