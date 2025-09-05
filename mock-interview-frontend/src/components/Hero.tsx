import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-interview.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white mb-6">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">Trusted by 10,000+ students</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Interview Skills
              </span>{" "}
              with AI
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Practice with our AI-powered mock interviews, get personalized feedback, 
              and land your dream job with confidence. Available 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 group">
                  Start Free Interview
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start text-white mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="text-2xl font-bold">10K+</span>
                </div>
                <p className="text-white/70 text-sm">Active Users</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start text-white mb-2">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="text-2xl font-bold">95%</span>
                </div>
                <p className="text-white/70 text-sm">Success Rate</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start text-white mb-2">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="text-2xl font-bold">4.9/5</span>
                </div>
                <p className="text-white/70 text-sm">User Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="AI Interview Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg animate-float">
                <div className="text-sm font-semibold text-primary">AI Feedback</div>
                <div className="text-xs text-muted-foreground">Analyzing response...</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-sm font-semibold text-success">Score: 92%</div>
                <div className="text-xs text-muted-foreground">Excellent answer!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;