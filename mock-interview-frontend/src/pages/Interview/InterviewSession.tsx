import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { WaveformVisualizer } from "./WaveformVisualizer";
import { AIAvatar } from "./AIAvatar";
import { Mic, MicOff, SkipForward, Clock, Brain, MessageCircle, Monitor, Target, Zap, Users, CheckCircle, Lightbulb } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const InterviewSession = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [aiMood, setAiMood] = useState<'neutral' | 'thinking' | 'encouraging' | 'analyzing'>('neutral');
  const [aiMessage, setAiMessage] = useState("Ready when you are! Take your time to think through each question.");
  const [showHints, setShowHints] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

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
    let interval: NodeJS.Timeout;
    if (!isPaused && timeLeft > 0 && isFullscreen) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timeLeft, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  //--------------------------End Fullscreen setup for the interview -------------------------------------------

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      // Mark current question as completed
      setCompletedQuestions(prev => [...prev, currentQuestion]);
      setCurrentQuestion(prev => prev + 1);
      setAnswer("");
      setIsThinking(false);
      setAiMood('neutral');
      setAiMessage("Great progress! Let's tackle the next question.");
      setShowHints(false);
    } else {
      // End interview simulation
      setCompletedQuestions(prev => [...prev, currentQuestion]);
      setAiMood('analyzing');
      setAiMessage("Excellent work! I'm analyzing your responses now...");
    }
  };

  const handleThinking = () => {
    setIsThinking(true);
    setAiMood('thinking');
    setAiMessage("Take your time... I can see you're processing this thoughtfully.");

    setTimeout(() => {
      setIsThinking(false);
      setAiMood('encouraging');
      setAiMessage("Great approach! Remember to explain your reasoning as you go.");
    }, 4000);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setAiMood('analyzing');
      setAiMessage("I'm listening carefully. Speak clearly and take your time.");
    } else {
      setAiMood('neutral');
      setAiMessage("Recording stopped. Feel free to continue typing or start recording again.");
    }
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
        {/* Enhanced Header */}
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
                <div className="relative p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200/30">
                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-lg leading-relaxed text-gray-800 font-medium">{currentQ.question}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowHints(!showHints)}
                      className="bg-white/70"
                    >
                      <Lightbulb className="w-4 h-4 mr-1" />
                      Hints
                    </Button>
                  </div>
                </div>

                {/* Enhanced Hints */}
                {showHints && currentQ.hints && (
                  <div className="space-y-3 animate-in slide-in-from-top duration-300">
                    <h4 className="font-semibold text-amber-700 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Smart Hints
                    </h4>
                    <div className="grid gap-2">
                      {currentQ.hints.map((hint, index) => (
                        <div key={index} className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-amber-600 mr-3 flex-shrink-0" />
                          <span className="text-sm text-amber-800">{hint}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Answer Input */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-gray-900 text-lg">Your Response:</label>
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={handleRecording}
                        className={isRecording ? "animate-pulse" : ""}
                      >
                        {isRecording ? <MicOff className="w-4 h-4 mr-1" /> : <Mic className="w-4 h-4 mr-1" />}
                        {isRecording ? "Stop" : "Record"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleThinking}
                        disabled={isThinking}
                        className="bg-purple-50 hover:bg-purple-100"
                      >
                        <Brain className="w-4 h-4 mr-1" />
                        {isThinking ? "Processing..." : "Think Mode"}
                      </Button>
                    </div>
                  </div>

                  {/* Waveform Visualizer */}
                  {isRecording && (
                    <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                      <WaveformVisualizer isActive={isRecording} />
                    </div>
                  )}

                  <Textarea
                    placeholder="Share your thoughts here... Remember to explain your reasoning step by step."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[180px] resize-none text-base leading-relaxed"
                  />

                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-gray-500">
                      Words: {answer.trim().split(/\s+/).filter(word => word).length} •
                      Characters: {answer.length}
                    </div>
                    <Button onClick={handleNextQuestion} className="px-8">
                      <SkipForward className="w-4 h-4 mr-2" />
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Interview"}
                    </Button>
                  </div>
                </div>
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