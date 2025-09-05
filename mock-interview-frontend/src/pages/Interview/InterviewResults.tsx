import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Star,
  RotateCcw,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

const InterviewResults = () => {
  const overallScore = 87;
  const totalTime = "28 min";
  const questionsAnswered = 3;
  
  const categoryScores = [
    { category: "Technical", score: 92, description: "JavaScript, algorithms" },
    { category: "Problem Solving", score: 85, description: "Logical thinking" },
    { category: "Communication", score: 88, description: "Clear explanations" },
    { category: "Confidence", score: 82, description: "Self-assurance" }
  ];

  const questionResults = [
    {
      id: 1,
      question: "Explain the difference between == and === in JavaScript",
      category: "Technical",
      score: 92,
      feedback: "Excellent explanation! You clearly understood the concept and provided good examples.",
      strengths: ["Clear explanation", "Good examples", "Mentioned type coercion"],
      improvements: ["Could mention performance implications"]
    },
    {
      id: 2,
      question: "Design a function that finds the longest palindromic substring",
      category: "Technical",
      score: 85,
      feedback: "Good approach with DP. Your solution is correct but could be optimized.",
      strengths: ["Correct algorithm", "Good time complexity analysis"],
      improvements: ["Consider space optimization", "Mention alternative approaches"]
    },
    {
      id: 3,
      question: "Tell me about working with a difficult team member",
      category: "Behavioral",
      score: 88,
      feedback: "Great use of STAR method. You showed good conflict resolution skills.",
      strengths: ["Used STAR method", "Showed empathy", "Positive outcome"],
      improvements: ["Could elaborate on prevention strategies"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", variant: "default" as const };
    if (score >= 80) return { text: "Good", variant: "secondary" as const };
    if (score >= 70) return { text: "Fair", variant: "outline" as const };
    return { text: "Needs Work", variant: "destructive" as const };
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-gradient-success";
    if (score >= 80) return "bg-gradient-primary";
    if (score >= 70) return "bg-gradient-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Interview Complete!</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">Here's how you performed</p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4">
              <div className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </div>
              <Badge {...getScoreBadge(overallScore)} className="text-base sm:text-lg px-6 py-2">
                {getScoreBadge(overallScore).text}
              </Badge>
              <p className="text-muted-foreground text-lg">Overall Performance</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 pt-6 border-t">
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-muted/30">
                  <Clock className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="text-xl font-semibold">{totalTime}</p>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-muted/30">
                  <Target className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="text-xl font-semibold">{questionsAnswered}/3</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-muted/30">
                  <Star className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="text-xl font-semibold">Top 15%</p>
                    <p className="text-sm text-muted-foreground">Rank</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Performance Breakdown</CardTitle>
            <CardDescription>Your scores across different evaluation criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryScores.map((item, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-lg">{item.category}</span>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>{item.score}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={item.score} className="h-3" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="questions" className="text-sm sm:text-base">Question Analysis</TabsTrigger>
            <TabsTrigger value="improvement" className="text-sm sm:text-base">Improvement Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {questionResults.map((result) => (
              <Card key={result.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg leading-relaxed mb-3">{result.question}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">{result.category}</Badge>
                        <Badge {...getScoreBadge(result.score)} className="text-xs">
                          {result.score}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">AI Feedback:</h4>
                    <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
                      {result.feedback}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-success flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {result.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-warning flex items-center text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1">
                        {result.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="improvement" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Personalized Improvement Plan</CardTitle>
                <CardDescription>Recommended next steps to enhance your interview performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Short-term Goals</h3>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-sm">Practice 5 more technical coding problems</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-sm">Review algorithm optimization techniques</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-sm">Record yourself answering behavioral questions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Long-term Goals</h3>
                    <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          <span className="text-sm">Complete advanced data structures course</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          <span className="text-sm">Practice mock interviews weekly</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          <span className="text-sm">Build a portfolio project demonstrating skills</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 text-lg">📚 Recommended Resources</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Practice Platforms</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• LeetCode - Algorithm Practice</li>
                        <li>• HackerRank - Coding Challenges</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Learning Materials</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Cracking the Coding Interview</li>
                        <li>• System Design Interview Guide</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;