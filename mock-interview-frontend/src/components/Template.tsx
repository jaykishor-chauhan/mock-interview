import { Button } from "@/components/ui/button";
import { Brain, BarChart3, MessageSquare } from "lucide-react";
import heroImage from "../assets/hero-interview-02.jpg";
import questionsIcon from "../assets/icon-questions.jpg";
import analyticsIcon from "../assets/icon-analytics.jpg";
import feedbackIcon from "../assets/icon-feedback.jpg";

const Template = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-18 mb-24">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Intuitive interview preparation designed for job seekers
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Build meaningful connections with easy-to-use interview tools that streamline everything from practice to performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg">
                  Learn more
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-lg">
                  Take a tour
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
                <div className="bg-white rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted-foreground">Get ready for your next interview!</div>
                    <img src={heroImage} alt="Interview preparation" className="w-full h-32 object-cover rounded-lg" />
                    <div className="flex gap-2">
                      <div className="w-12 h-8 bg-green-100 border-2 border-dashed border-green-300 rounded"></div>
                      <div className="w-12 h-8 bg-green-100 border-2 border-dashed border-green-300 rounded"></div>
                      <div className="w-12 h-8 bg-green-100 border-2 border-dashed border-green-300 rounded"></div>
                    </div>
                    <Button className="w-full bg-foreground text-background">
                      Start your interview
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">Click anywhere to start practicing</div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <section className="py-24 bg-section-bg">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-foreground text-background p-12 rounded-3xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground to-gray-800"></div>
                  <div className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                          Interview preparation by professionals for professionals
                        </h2>
                        <p className="text-xl text-background/80 leading-relaxed">
                          With 99% success rate and infrastructure that helps 148+ thousand candidates every month. InterviewAI's all-in-one career development platform gives you everything you need to ace interviews at scale.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-lg">
                            Start for free
                          </Button>
                          <Button variant="outline" size="lg" className=" border-none text-background hover:bg-primary text-foreground hover:text-white font-semibold px-8 py-4 rounded-lg">
                            See plans & pricing →
                          </Button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-2xl rotate-3"></div>
                        <div className="relative bg-white rounded-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                              </div>
                              <div className="text-sm text-foreground">
                                <div className="font-semibold">Career Coach</div>
                                <div className="text-muted-foreground">3:45pm</div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="text-sm text-foreground font-medium mb-2">Re: Interview preparation...</div>
                              <div className="text-xs text-muted-foreground">Great progress on your mock interviews!</div>
                            </div>
                            <div className="text-xs text-foreground">Your performance has improved significantly</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Three Features Grid */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              The InterviewAI difference
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center space-y-6">
              <div className="relative">
                <img src={questionsIcon} alt="Smart Questions" className="w-full h-64 object-cover rounded-2xl" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Smart Questions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The tools and expertise you need to prepare for your interview with confidence.
                </p>
                <a href="#" className="inline-flex items-center text-primary font-semibold hover:underline">
                  Practice now →
                </a>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="relative">
                <img src={analyticsIcon} alt="Performance Analytics" className="w-full h-64 object-cover rounded-2xl" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Scale with confidence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Practice on a world-class platform that helps thousands improve their interview skills every month.
                </p>
                <a href="#" className="inline-flex items-center text-primary font-semibold hover:underline">
                  Send & grow →
                </a>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="relative">
                <img src={feedbackIcon} alt="Expert Feedback" className="w-full h-64 object-cover rounded-2xl" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Interview expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experts can help you optimize your performance, troubleshoot, and resolve issues.
                </p>
                <a href="#" className="inline-flex items-center text-primary font-semibold hover:underline">
                  Work with experts →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template;