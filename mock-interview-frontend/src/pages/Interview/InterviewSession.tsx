import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIAvatar } from "./AIAvatar";
import { Clock, Brain, MessageCircle, Monitor, Target, Zap, Users, CheckCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InterviewAssistant from "../InterviewAssistant";

const InterviewSession = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const [aiMood, setAiMood] = useState<'neutral' | 'thinking' | 'encouraging' | 'analyzing'>('neutral');
  const [aiMessage, setAiMessage] = useState("Ready when you are! Take your time to think through each question.");

  const questions = [
    {
      id: 1,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain the difference between == and === in JavaScript, and provide examples of when you would use each.",
      hints: ["Think about type coercion", "Consider strict vs loose equality", "Performance implications matter"],
      expectedDuration: "3-5 minutes"
    },
    {
      id: 2,
      category: "Technical",
      difficulty: "Hard",
      question: "Design a function that finds the longest palindromic substring in a given string. What's the time complexity?",
      hints: ["Consider dynamic programming", "Think about expanding around centers", "Optimize space complexity"],
      expectedDuration: "5-7 minutes"
    },
    {
      id: 3,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      hints: ["Use the STAR method", "Focus on your actions and the outcome", "Show emotional intelligence"],
      expectedDuration: "4-6 minutes"
    },
    {
      id: 1,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain the difference between == and === in JavaScript, and provide examples of when you would use each.",
      hints: ["Think about type coercion", "Consider strict vs loose equality", "Performance implications matter"],
      expectedDuration: "3-5 minutes"
    },
    {
      id: 2,
      category: "Technical",
      difficulty: "Hard",
      question: "Design a function that finds the longest palindromic substring in a given string. What's the time complexity?",
      hints: ["Consider dynamic programming", "Think about expanding around centers", "Optimize space complexity"],
      expectedDuration: "5-7 minutes"
    },
    {
      id: 3,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      hints: ["Use the STAR method", "Focus on your actions and the outcome", "Show emotional intelligence"],
      expectedDuration: "4-6 minutes"
    },
    {
      id: 1,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain the difference between == and === in JavaScript, and provide examples of when you would use each.",
      hints: ["Think about type coercion", "Consider strict vs loose equality", "Performance implications matter"],
      expectedDuration: "3-5 minutes"
    },
    {
      id: 2,
      category: "Technical",
      difficulty: "Hard",
      question: "Design a function that finds the longest palindromic substring in a given string. What's the time complexity?",
      hints: ["Consider dynamic programming", "Think about expanding around centers", "Optimize space complexity"],
      expectedDuration: "5-7 minutes"
    },
    {
      id: 3,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      hints: ["Use the STAR method", "Focus on your actions and the outcome", "Show emotional intelligence"],
      expectedDuration: "4-6 minutes"
    },
    {
      id: 1,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain the difference between == and === in JavaScript, and provide examples of when you would use each.",
      hints: ["Think about type coercion", "Consider strict vs loose equality", "Performance implications matter"],
      expectedDuration: "3-5 minutes"
    },
    {
      id: 2,
      category: "Technical",
      difficulty: "Hard",
      question: "Design a function that finds the longest palindromic substring in a given string. What's the time complexity?",
      hints: ["Consider dynamic programming", "Think about expanding around centers", "Optimize space complexity"],
      expectedDuration: "5-7 minutes"
    },
    {
      id: 3,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      hints: ["Use the STAR method", "Focus on your actions and the outcome", "Show emotional intelligence"],
      expectedDuration: "4-6 minutes"
    },

  ];

  const currentQ = questions[currentQuestion];

  //----------------- Start Fullscreen setup for the interview ----------------------------------
  const requestFullscreen = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.error("Failed to enter fullscreen:", err);
      setIsFullscreen(false);
    }
  }, []);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  //--------------------------End Fullscreen setup for the interview -----------------------------

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <Zap className="w-4 h-4" />;
      case 'Behavioral': return <Users className="w-4 h-4" />;
      case 'System Design': return <Target className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {!isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md">
          <Card className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
            <CardHeader>
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Monitor className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>
              <CardTitle className="text-3xl font-semibold text-gray-900 tracking-wide">
                Enable Fullscreen
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <p className="text-gray-700 text-base leading-relaxed">
                For the best and most immersive interview experience, please enable fullscreen mode. The timer will start once you enter fullscreen.
              </p>
              <Button
                onClick={requestFullscreen}
                size="lg"
                className="w-full bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
              >
                Enter Fullscreen
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Interview Assistant</h1>
              <p className="text-gray-600">Interactive practice session • Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => navigate("/interview/results")}
                className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-300"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Submit Interview</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Question Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-200/50">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl flex items-center">
                    {getCategoryIcon(currentQ.category)}
                    <span className="ml-2">Current Question</span>
                  </CardTitle>
                  <div className="flex space-x-3">
                    <Badge className={`${getDifficultyColor(currentQ.difficulty)} border`}>
                      {currentQ.difficulty}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50">
                      {currentQ.category}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                      ⏱️ {currentQ.expectedDuration}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <InterviewAssistant /> 
              </CardContent>
            </Card>
          </div>

          {/* Enhanced AI Assistant Panel */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-lg shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-lg">AI Interview Coach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <AIAvatar mood={aiMood} message={aiMessage} />
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Interview Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {Array.from({ length: Math.ceil(questions.length / 8) }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-3">
                      {questions
                        .slice(rowIndex * 8, rowIndex * 8 + 8)
                        .map((q, index) => {
                          const actualIndex = rowIndex * 8 + index;
                          const isCurrent = actualIndex === currentQuestion;
                          const isCompleted = completedQuestions.includes(actualIndex);

                          return (
                            <div
                              key={q.id}
                              className={`p-1 rounded-full border-2 transition-all duration-300 ${isCurrent
                                ? 'bg-blue-100 border-blue-300 shadow-md'
                                : isCompleted
                                  ? 'bg-green-100 border-green-300'
                                  : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                              <div className="flex items-center justify-center">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCurrent
                                    ? 'bg-blue-600 text-white'
                                    : isCompleted
                                      ? 'bg-green-600 text-white'
                                      : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                  {isCompleted ? '✓' : actualIndex + 1}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-lg shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mr-2">
                      <li>Test mic & internet.</li>
                      <li>Think aloud clearly.</li>
                      <li>Keep eye contact.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;