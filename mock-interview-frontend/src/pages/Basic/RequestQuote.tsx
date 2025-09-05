import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Users, 
  Building,
  Zap,
  Shield,
  Phone,
  Calendar,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    serviceType: "",
    timeline: "",
    budget: "",
    description: "",
    features: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted:", formData);
    // Add success notification and form reset
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const services = [
    {
      title: "Enterprise Platform",
      description: "Custom AI interview platform for large organizations",
      features: ["Unlimited interviews", "Custom branding", "Analytics dashboard", "API access"],
      icon: Building,
      popular: false
    },
    {
      title: "Team Training",
      description: "Bulk interview training for your entire team",
      features: ["Group sessions", "Progress tracking", "Manager dashboard", "Custom content"],
      icon: Users,
      popular: true
    },
    {
      title: "Custom Integration",
      description: "Integrate our AI into your existing HR systems",
      features: ["API integration", "Custom workflows", "Data sync", "Technical support"],
      icon: Zap,
      popular: false
    }
  ];

  const availableFeatures = [
    "Custom Interview Questions",
    "Company-Specific Scenarios",
    "Multi-language Support",
    "Advanced Analytics",
    "White-label Solution",
    "Dedicated Support",
    "API Integration",
    "SSO Integration",
    "Custom Reporting",
    "Video Interview Analysis"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Request Custom Quote</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a personalized solution for your organization's interview training needs
            </p>
          </div>

          {/* Service Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Service</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    formData.serviceType === service.title ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleInputChange("serviceType", service.title)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <service.icon className="w-8 h-8 text-primary" />
                      {service.popular && (
                        <Badge className="bg-yellow-500 text-yellow-950">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Quote Form */}
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Tell Us About Your Needs</CardTitle>
                <CardDescription>
                  Fill out this form and we'll prepare a custom quote within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          placeholder="Enter company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Project Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employees">Company Size</Label>
                        <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                            <SelectItem value="1000+">1,000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                            <SelectItem value="month">Within 1 month</SelectItem>
                            <SelectItem value="quarter">Within 3 months</SelectItem>
                            <SelectItem value="flexible">Flexible timeline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                          <SelectItem value="discuss">Prefer to discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Desired Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.features.includes(feature)}
                            onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                          />
                          <Label htmlFor={feature} className="text-sm">{feature}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us more about your specific requirements, goals, and any special considerations..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Request Custom Quote
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Process</CardTitle>
                  <CardDescription>How we deliver your custom solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">1</div>
                    <div>
                      <h4 className="font-medium">Requirements Analysis</h4>
                      <p className="text-sm text-muted-foreground">We analyze your needs and prepare a detailed proposal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">2</div>
                    <div>
                      <h4 className="font-medium">Custom Quote</h4>
                      <p className="text-sm text-muted-foreground">Receive a detailed quote within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">3</div>
                    <div>
                      <h4 className="font-medium">Implementation</h4>
                      <p className="text-sm text-muted-foreground">Our team delivers your solution on time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">4</div>
                    <div>
                      <h4 className="font-medium">Ongoing Support</h4>
                      <p className="text-sm text-muted-foreground">Continuous support and optimization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Prefer to Talk?</CardTitle>
                  <CardDescription>Get in touch with our sales team directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Call us directly</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Schedule a demo</p>
                      <p className="text-sm text-muted-foreground">Book a 30-minute consultation</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Demo Call
                  </Button>
                </CardContent>
              </Card>

              {/* Guarantee */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Shield className="w-5 h-5 mr-2" />
                    Our Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      24-hour quote response time
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      No hidden fees or charges
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      30-day money-back guarantee
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Dedicated project manager
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;