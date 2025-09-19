import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Volume2, Play, RotateCcw, Clock, Brain, MessageCircle, Monitor, CheckCircle } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AIAvatar } from "./AIAvatar";

type InterviewState = 'idle' | 'speaking_question' | 'listening_answer' | 'processing' | 'completed';

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  hints: string[];
  expectedDuration: string;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Conversation {
  type: 'question' | 'answer';
  text: string;
  timestamp: Date;
  questionId?: number;
}

const InterviewSession = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  // Speech Recognition States
  const [state, setState] = useState<InterviewState>('idle');
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [storedResponses, setStoredResponses] = useState<{ questionId: number, question: string, answer: string, timestamp: Date }[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [listeningTimeout, setListeningTimeout] = useState<NodeJS.Timeout | null>(null);
  const [noResponsePrompts, setNoResponsePrompts] = useState(0);
  const [silenceTimeout, setSilenceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastTranscriptLength, setLastTranscriptLength] = useState(0);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [manualInput, setManualInput] = useState('');

  // AI States
  const [aiMood, setAiMood] = useState<'neutral' | 'thinking' | 'encouraging' | 'analyzing'>('neutral');
  const [aiMessage, setAiMessage] = useState("Ready when you are! Take your time to think through each question.");

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const shouldContinueListening = useRef(false);

  const questions: Question[] = [
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
      id: 4,
      category: "System Design",
      difficulty: "Hard",
      question: "How would you design a scalable chat application that supports millions of users?",
      hints: ["Consider microservices", "Think about real-time communication", "Database partitioning strategies"],
      expectedDuration: "7-10 minutes"
    },
    {
      id: 5,
      category: "Technical",
      difficulty: "Easy",
      question: "What is the difference between null and undefined in JavaScript?",
      hints: ["Think about variable declaration", "Consider function return values", "Memory allocation differences"],
      expectedDuration: "2-3 minutes"
    },
    {
      id: 6,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Describe a project you're particularly proud of. What made it successful?",
      hints: ["Highlight your specific contributions", "Discuss challenges overcome", "Quantify the impact"],
      expectedDuration: "4-6 minutes"
    },
    {
      id: 7,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain how you would optimize a slow-loading web page.",
      hints: ["Consider various optimization techniques", "Think about both frontend and backend", "Mention performance metrics"],
      expectedDuration: "4-5 minutes"
    },
    {
      id: 8,
      category: "Behavioral",
      difficulty: "Medium",
      question: "How do you handle tight deadlines and pressure?",
      hints: ["Provide specific examples", "Show your problem-solving process", "Demonstrate stress management"],
      expectedDuration: "3-4 minutes"
    },
    {
      id: 9,
      category: "Technical",
      difficulty: "Hard",
      question: "Implement a LRU (Least Recently Used) cache with O(1) operations.",
      hints: ["Think about data structures needed", "Consider hashmap + doubly linked list", "Handle edge cases"],
      expectedDuration: "8-10 minutes"
    },
    {
      id: 10,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time when you disagreed with your manager. How did you handle it?",
      hints: ["Show respect for authority", "Focus on constructive communication", "Highlight positive outcomes"],
      expectedDuration: "4-5 minutes"
    },
    {
      id: 11,
      category: "System Design",
      difficulty: "Medium",
      question: "Design a URL shortening service like bit.ly. What are the key components?",
      hints: ["Consider encoding algorithms", "Think about database design", "Plan for scalability"],
      expectedDuration: "6-8 minutes"
    },
    {
      id: 12,
      category: "Technical",
      difficulty: "Medium",
      question: "What are the differences between SQL and NoSQL databases? When would you use each?",
      hints: ["Compare ACID properties", "Consider scalability differences", "Think about use cases"],
      expectedDuration: "4-6 minutes"
    }
  ];

  const currentQ = questions[currentQuestion];

  // Initialize speech services
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);

      // Test if speech recognition actually works
      const testRecognition = new SpeechRecognition();
      testRecognition.lang = 'en-US';

      const testTimeout = setTimeout(() => {
        console.log('Speech recognition test timeout - probably network issues');
        setNetworkError(true);
        setSpeechAvailable(false);
        testRecognition.abort();
      }, 3000);

      testRecognition.onstart = () => {
        console.log('Speech recognition test successful');
        clearTimeout(testTimeout);
        setSpeechAvailable(true);
        setNetworkError(false);
        testRecognition.stop();
      };

      testRecognition.onerror = (event) => {
        console.error('Speech recognition test failed:', event.error);
        clearTimeout(testTimeout);
        if (event.error === 'network') {
          setNetworkError(true);
          setSpeechAvailable(false);
          setAiMood('encouraging');
          setAiMessage("Speech recognition isn't available right now. You can type your responses instead!");
        }
      };

      // Try to start test recognition
      try {
        testRecognition.start();
      } catch (error) {
        console.error('Failed to start test recognition:', error);
        setNetworkError(true);
        setSpeechAvailable(false);
      }

      // Setup main recognition if test passes
      if (!networkError) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let final = '';
          let interim = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }

          if (final) {
            setTranscript(prev => {
              const newTranscript = prev + final;
              setLastTranscriptLength(newTranscript.length);
              return newTranscript;
            });
            setInterimTranscript('');
            setNoResponsePrompts(0);
            setErrorCount(0);

            // Clear any existing timeouts
            if (listeningTimeout) {
              clearTimeout(listeningTimeout);
              setListeningTimeout(null);
            }
            if (silenceTimeout) {
              clearTimeout(silenceTimeout);
              setSilenceTimeout(null);
            }

            // Set a new silence timeout to detect when user stops speaking
            const newSilenceTimeout = setTimeout(() => {
              if (state === 'listening_answer' && !isProcessingAnswer) {
                handleAnswerComplete();
              }
            }, 2500); // 2.5 seconds of silence after speech
            setSilenceTimeout(newSilenceTimeout);
          } else {
            setInterimTranscript(interim);
          }
        };

        recognition.onstart = () => {
          setIsListening(true);
          setAiMood('thinking');
          setAiMessage("I'm listening to your response...");
          setErrorCount(0);
        };

        recognition.onend = () => {
          setIsListening(false);

          if (shouldContinueListening.current && state === 'listening_answer' && !isProcessingAnswer && speechAvailable) {
            setTimeout(() => {
              if (recognitionRef.current && shouldContinueListening.current && errorCount < 3) {
                try {
                  recognitionRef.current.start();
                } catch (error) {
                  console.error('Error restarting recognition:', error);
                  setErrorCount(prev => prev + 1);
                }
              }
            }, 100);
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setErrorCount(prev => prev + 1);

          if (event.error === 'network') {
            setNetworkError(true);
            setSpeechAvailable(false);
            setAiMood('encouraging');
            setAiMessage("Network issues detected. Please type your response instead!");
            shouldContinueListening.current = false;
            setState('idle');
            return;
          }

          // Stop trying after 3 network errors
          if (errorCount >= 2) {
            console.log('Too many speech recognition errors, switching to fallback mode');
            setNetworkError(true);
            setSpeechAvailable(false);
            shouldContinueListening.current = false;
            setState('idle');
            setAiMood('encouraging');
            setAiMessage("Having trouble with speech recognition. Please type your response!");
            return;
          }

          if (shouldContinueListening.current &&
            (event.error === 'no-speech') &&
            !isProcessingAnswer && speechAvailable) {
            setTimeout(() => {
              if (recognitionRef.current && shouldContinueListening.current && errorCount < 3) {
                try {
                  recognitionRef.current.start();
                } catch (error) {
                  console.error('Error restarting after error:', error);
                }
              }
            }, 1000);
          }
        };

        recognitionRef.current = recognition;
      }
    } else {
      setSpeechSupported(false);
      setSpeechAvailable(false);
      setAiMessage("Speech recognition isn't supported in your browser. Please type your responses!");
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);

        const preferredVoice = availableVoices.find(voice =>
          voice.lang.startsWith('en') && voice.name.includes('Google')
        ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];

        setSelectedVoice(preferredVoice);
      };

      loadVoices();
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      shouldContinueListening.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (listeningTimeout) {
        clearTimeout(listeningTimeout);
      }
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
      }
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isFullscreen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFullscreen, timeLeft]);

  // Clean up timeouts when state changes
  useEffect(() => {
    if (state !== 'listening_answer') {
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
        setSilenceTimeout(null);
      }
      if (listeningTimeout) {
        clearTimeout(listeningTimeout);
        setListeningTimeout(null);
      }
    }
  }, [state]);

  //----------------- Fullscreen setup ----------------------------------
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

  // Speech functions
  const speakQuestion = (questionText: string) => {
    if (!synthRef.current || !selectedVoice) return;

    setState('speaking_question');
    setIsSpeaking(true);
    setAiMood('neutral');
    setAiMessage("I'm asking you a question...");
    shouldContinueListening.current = false;

    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setAiMessage("Ready when you are! Take your time to think through this question.");

      const newQuestion: Conversation = {
        type: 'question',
        text: questionText,
        timestamp: new Date(),
        questionId: questions[currentQuestion].id
      };
      setConversation(prev => [...prev, newQuestion]);

      if (isAutoMode) {
        setTimeout(() => {
          startListening();
        }, 1500);
      } else {
        setState('idle');
      }
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      setState('idle');
    };

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current || !speechSupported || isProcessingAnswer || !speechAvailable) {
      if (!speechAvailable || networkError) {
        // Fallback to manual input mode
        setState('listening_answer');
        setAiMood('encouraging');
        setAiMessage("Speech recognition isn't available. Please type your response in the text area below.");
        return;
      }
      return;
    }

    setState('listening_answer');
    setTranscript('');
    setInterimTranscript('');
    setLastTranscriptLength(0);
    shouldContinueListening.current = true;
    setIsProcessingAnswer(false);

    try {
      recognitionRef.current.start();

      if (isAutoMode) {
        const timeout = setTimeout(() => {
          if (state === 'listening_answer' && !transcript.trim()) {
            handleNoResponse();
          }
        }, 20000);
        setListeningTimeout(timeout);
      }
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
      setState('idle');
      shouldContinueListening.current = false;
    }
  };

  const handleNoResponse = () => {
    if (isProcessingAnswer) return;

    shouldContinueListening.current = false;
    stopListening();
    setNoResponsePrompts(prev => prev + 1);

    const prompts = [
      "I didn't hear your response. Please share your thoughts on this question.",
      "Take your time. Could you please provide an answer to the question?",
      "I'm still waiting for your response. Please speak clearly into the microphone.",
      "Let's try again. Please answer the current question when you're ready."
    ];

    const promptIndex = Math.min(noResponsePrompts, prompts.length - 1);
    speakPrompt(prompts[promptIndex]);
  };

  const speakPrompt = (promptText: string) => {
    if (!synthRef.current || !selectedVoice) return;

    setState('speaking_question');
    setIsSpeaking(true);
    setAiMood('encouraging');
    setAiMessage("Let me help you get back on track...");

    const utterance = new SpeechSynthesisUtterance(promptText);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setIsSpeaking(false);
      setAiMessage("Ready when you are! Take your time to think through this question.");
      setTimeout(() => startListening(), 1500);
    };

    synthRef.current.speak(utterance);
  };

  const stopListening = () => {
    shouldContinueListening.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }

    if (listeningTimeout) {
      clearTimeout(listeningTimeout);
      setListeningTimeout(null);
    }

    if (silenceTimeout) {
      clearTimeout(silenceTimeout);
      setSilenceTimeout(null);
    }

    setIsListening(false);
  };

  const handleAnswerComplete = () => {
    const finalResponse = transcript.trim() || manualInput.trim();
    if (isProcessingAnswer || !finalResponse) {
      return;
    }

    setIsProcessingAnswer(true);
    shouldContinueListening.current = false;

    stopListening();
    setState('processing');
    setAiMood('analyzing');
    setAiMessage("Analyzing your response...");

    const newAnswer: Conversation = {
      type: 'answer',
      text: finalResponse,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, newAnswer]);

    const responseData = {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      answer: finalResponse,
      timestamp: new Date()
    };

    setStoredResponses(prev => [...prev, responseData]);
    setCompletedQuestions(prev => [...prev, currentQuestion]);

    setTimeout(() => {
      setTranscript('');
      setInterimTranscript('');
      setManualInput('');
      setIsProcessingAnswer(false);
      setNoResponsePrompts(0);
      setAiMood('encouraging');
      setAiMessage("Great answer! Moving to the next question...");

      if (currentQuestion < questions.length - 1) {
        const nextIndex = currentQuestion + 1;
        setCurrentQuestion(nextIndex);

        if (isAutoMode) {
          setTimeout(() => {
            speakQuestion(questions[nextIndex].question);
          }, 2000);
        } else {
          setState('idle');
        }
      } else {
        setState('completed');
        setAiMood('neutral');
        setAiMessage("Interview completed! Great job on all your responses.");
      }
    }, 1500);
  };

  const startInterview = () => {
    setNoResponsePrompts(0);
    setIsProcessingAnswer(false);
    const currentQuestionObj = questions[currentQuestion];
    if (selectedVoice) {
      speakQuestion(currentQuestionObj.question);
    }
  };

  const skipToNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && state !== 'speaking_question') {
      shouldContinueListening.current = false;
      stopListening();
      if (synthRef.current) synthRef.current.cancel();
      setCurrentQuestion(prev => prev + 1);
      setState('idle');
      setNoResponsePrompts(0);
      setTranscript('');
      setInterimTranscript('');
      setIsProcessingAnswer(false);
    }
  };

  const repeatQuestion = () => {
    shouldContinueListening.current = false;
    if (synthRef.current) synthRef.current.cancel();
    stopListening();
    setIsProcessingAnswer(false);
    const currentQuestionObj = questions[currentQuestion];
    speakQuestion(currentQuestionObj.question);
  };

  const resetInterview = () => {
    shouldContinueListening.current = false;
    stopListening();
    if (synthRef.current) synthRef.current.cancel();
    setCurrentQuestion(0);
    setConversation([]);
    setState('idle');
    setTranscript('');
    setInterimTranscript('');
    setNoResponsePrompts(0);
    setIsProcessingAnswer(false);
    setCompletedQuestions([]);
    setAiMood('neutral');
    setAiMessage("Ready when you are! Take your time to think through each question.");
  };

  // Utility functions
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

  const getStateDisplay = () => {
    switch (state) {
      case 'speaking_question': return { text: 'Speaking Question', color: 'text-blue-600', bgColor: 'bg-blue-50' };
      case 'listening_answer': return { text: 'Listening for Answer', color: 'text-green-600', bgColor: 'bg-green-50' };
      case 'processing': return { text: 'Processing Response', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      case 'completed': return { text: 'Interview Completed', color: 'text-purple-600', bgColor: 'bg-purple-50' };
      default: return { text: 'Ready to Start', color: 'text-gray-600', bgColor: 'bg-gray-50' };
    }
  };

  const stateDisplay = getStateDisplay();

  if (!speechSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Speech Not Supported</h2>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support speech recognition. Please use Chrome or Edge for the best experience.
          </p>
        </Card>
      </div>
    );
  }

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
                <span 
                  className="font-semibold"
                >Submit Interview</span>
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
                {/* Current State */}
                <div className={`text-center p-4 rounded-lg ${stateDisplay.bgColor}`}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {state === 'speaking_question' && <Volume2 className="w-6 h-6 text-blue-600" />}
                    {state === 'listening_answer' && <Mic className="w-6 h-6 text-green-600 animate-pulse" />}
                    {state === 'processing' && <div className="w-6 h-6 bg-yellow-500 rounded-full animate-spin" />}
                    {state === 'idle' && <MessageCircle className="w-6 h-6 text-gray-600" />}
                    {state === 'completed' && <CheckCircle className="w-6 h-6 text-purple-600" />}
                    <span className={`font-semibold ${stateDisplay.color}`}>
                      {stateDisplay.text}
                    </span>
                  </div>

                  {/* Auto Mode Toggle */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAutoMode}
                        onChange={(e) => setIsAutoMode(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        disabled={state !== 'idle' && state !== 'completed'}
                      />
                      <span className="text-sm text-gray-700">Auto Mode</span>
                    </label>
                  </div>

                  {noResponsePrompts > 0 && state === 'listening_answer' && (
                    <div className="mt-2 text-sm text-orange-600 animate-pulse">
                      Waiting for response... (Attempt {noResponsePrompts + 1})
                    </div>
                  )}
                </div>

                {/* Current Question Display */}
                {state !== 'completed' && (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-900 font-medium text-lg leading-relaxed">
                        {currentQ.question}
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Transcript / Manual Input */}
                {(state === 'listening_answer' || transcript || interimTranscript || manualInput) && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">Your Response:</h4>
                      {state === 'listening_answer' && speechAvailable && !networkError && (
                        <div className="text-xs text-gray-500 animate-pulse">
                          🎤 Listening...
                        </div>
                      )}
                      {state === 'listening_answer' && (!speechAvailable || networkError) && (
                        <div className="text-xs text-blue-600">
                          ✏️ Type your response
                        </div>
                      )}
                    </div>

                    {/* Speech Recognition Display */}
                    {speechAvailable && !networkError && (
                      <div className="p-4 bg-gray-50 rounded-lg min-h-[80px] border">
                        <p className="text-gray-900 leading-relaxed">
                          {transcript}
                          <span className="text-gray-500 italic">{interimTranscript}</span>
                          {isListening && <span className="animate-pulse">|</span>}
                        </p>
                        {!transcript && !interimTranscript && state === 'listening_answer' && (
                          <p className="text-gray-400 italic">Start speaking to see your words appear here...</p>
                        )}
                      </div>
                    )}

                    {/* Manual Text Input Fallback */}
                    {(!speechAvailable || networkError) && (
                      <div className="space-y-2">
                        <Textarea
                          value={manualInput}
                          onChange={(e) => setManualInput(e.target.value)}
                          placeholder="Type your response here..."
                          className="min-h-[120px] p-4 text-base leading-relaxed"
                          disabled={state !== 'listening_answer'}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              if (manualInput.trim()) {
                                setTranscript(manualInput.trim());
                                handleAnswerComplete();
                              }
                            }}
                            disabled={!manualInput.trim() || state !== 'listening_answer'}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Submit Response
                          </Button>
                          <Button
                            onClick={() => setManualInput('')}
                            variant="outline"
                            disabled={state !== 'listening_answer'}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Network Error Notice */}
                {networkError && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <span className="text-lg">⚠️</span>
                      <div>
                        <p className="font-medium">Speech Recognition Unavailable</p>
                        <p className="text-sm">Network issues detected. Please use the text input above to type your responses.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="grid grid-cols-3 gap-3">
                  {state === 'idle' ? (
                    <Button
                      onClick={startInterview}
                      className="col-span-2 bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {currentQuestion === 0 ? 'Start Auto Interview' : 'Continue Interview'}
                    </Button>
                  ) : state === 'completed' ? (
                    <Button
                      onClick={resetInterview}
                      className="col-span-2 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Start New Interview
                    </Button>
                  ) : (
                    <>
                      {state === 'listening_answer' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={repeatQuestion}
                            variant="outline"
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Repeat
                          </Button>
                          <Button
                            onClick={skipToNextQuestion}
                            variant="outline"
                            disabled={currentQuestion >= questions.length - 1}
                          >
                            Skip Question
                          </Button>
                          <Button
                            onClick={handleAnswerComplete}
                            variant="outline"
                            className="flex-1"
                            disabled={!transcript.trim() || transcript.trim().length < 5 || isProcessingAnswer}
                          >
                            Finish Answer
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Auto Mode Info */}
                {isAutoMode && state === 'idle' && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      🤖 <strong>Auto Mode:</strong> Questions flow automatically.
                      {speechAvailable && !networkError
                        ? " The interview will automatically proceed after 2.5 seconds of silence."
                        : " Type your responses and click Submit to proceed."
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced AI Assistant Panel */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-lg shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-lg">AI Interviewer</CardTitle>
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
                <div className="text-sm text-gray-700">
                  <div>
                    {/* Listening Tips */}
                    <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        {speechAvailable && !networkError ? (
                          <p><strong>Speaking:</strong> Speak clearly and pause for 2-3 seconds when you finish. The system will automatically move to the next question.</p>
                        ) : (
                          <p>
                            <strong>Typing:</strong> Type your complete response in the text area above,
                            then click "Submit Response" to continue.
                          </p>
                        )}
                      </p>
                    </div>
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