import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, BarChart3, Users, Shield, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Get dynamic, intelligent questions tailored to your field and experience level."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere. Our AI interviewer never sleeps."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track your progress with comprehensive performance analytics and insights."
    },
    {
      icon: Users,
      title: "Multiple Interview Types",
      description: "Technical, behavioral, HR, and industry-specific interview scenarios."
    },
    {
      icon: Shield,
      title: "Personalized Feedback",
      description: "Receive detailed feedback on your answers, speaking pace, and confidence."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate scoring and suggestions right after your interview."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Why Choose InterviewAI?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mt-2"  >
            Our advanced AI technology provides the most realistic and helpful interview preparation experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;