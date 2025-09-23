import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Volume2, Play, RotateCcw, MessageSquare, User } from 'lucide-react';

type InterviewState = 'idle' | 'speaking_question' | 'listening_answer' | 'processing' | 'completed';

interface Question {
  id: number;
  text: string;
  category: string;
}

interface Conversation {
  type: 'question' | 'answer';
  text: string;
  timestamp: Date;
  questionId?: number;
}

const interviewQuestions: Question[] = [
  { id: 1, text: "Tell me about yourself and your professional background.", category: "Introduction" },
  { id: 2, text: "What interests you most about this position and our company?", category: "Motivation" },
  { id: 3, text: "What are your greatest strengths and how do they apply to this role?", category: "Skills" },
  { id: 4, text: "Describe a challenging situation you faced at work and how you handled it.", category: "Problem Solving" },
  { id: 5, text: "Where do you see yourself in 5 years professionally?", category: "Career Goals" },
  { id: 6, text: "What would you consider your biggest weakness and how are you working to improve it?", category: "Self-Awareness" },
  { id: 7, text: "Why are you looking to leave your current position?", category: "Motivation" },
  { id: 8, text: "Do you have any questions about the role or our company?", category: "Engagement" }
];

export default function InterviewAssistant() {
  const [state, setState] = useState<InterviewState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [storedResponses, setStoredResponses] = useState<{questionId: number, question: string, answer: string, timestamp: Date}[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [listeningTimeout, setListeningTimeout] = useState<NodeJS.Timeout | null>(null);
  const [noResponsePrompts, setNoResponsePrompts] = useState(0);
  const [silenceTimeout, setSilenceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastTranscriptLength, setLastTranscriptLength] = useState(0);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const shouldContinueListening = useRef(false);

  // Initialize speech services
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
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
        console.log('Recognition started');
        setIsListening(true);
      };

      recognition.onend = () => {
        console.log('Recognition ended, should continue:', shouldContinueListening.current);
        setIsListening(false);
        
        // Only restart if we should continue listening and we're in the right state
        if (shouldContinueListening.current && state === 'listening_answer' && !isProcessingAnswer) {
          console.log('Restarting recognition');
          setTimeout(() => {
            if (recognitionRef.current && shouldContinueListening.current) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.error('Error restarting recognition:', error);
              }
            }
          }, 100);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Restart on certain errors if we should continue
        if (shouldContinueListening.current && 
            (event.error === 'no-speech' || event.error === 'network') && 
            !isProcessingAnswer) {
          setTimeout(() => {
            if (recognitionRef.current && shouldContinueListening.current) {
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

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);
        
        // Try to find a good default voice
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

  const speakQuestion = (questionText: string) => {
    if (!synthRef.current || !selectedVoice) return;

    console.log('Speaking question:', questionText);
    setState('speaking_question');
    setIsSpeaking(true);
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
      console.log('Question finished speaking');
      setIsSpeaking(false);
      
      // Add question to conversation
      const newQuestion: Conversation = {
        type: 'question',
        text: questionText,
        timestamp: new Date(),
        questionId: interviewQuestions[currentQuestionIndex].id
      };
      setConversation(prev => [...prev, newQuestion]);
      
      // Automatically start listening after question in auto mode
      if (isAutoMode) {
        setTimeout(() => {
          console.log('Starting to listen after question');
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
    if (!recognitionRef.current || !speechSupported || isProcessingAnswer) {
      console.log('Cannot start listening:', { speechSupported, isProcessingAnswer });
      return;
    }

    console.log('Starting listening');
    setState('listening_answer');
    setTranscript('');
    setInterimTranscript('');
    setLastTranscriptLength(0);
    shouldContinueListening.current = true;
    setIsProcessingAnswer(false);

    try {
      recognitionRef.current.start();
      
      // Set timeout for no response (20 seconds)
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
    
    console.log('Handling no response');
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

    const utterance = new SpeechSynthesisUtterance(promptText);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => startListening(), 1500);
    };

    synthRef.current.speak(utterance);
  };

  const stopListening = () => {
    console.log('Stopping listening');
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
    if (isProcessingAnswer || !transcript.trim()) {
      console.log('Cannot complete answer:', { isProcessingAnswer, transcript: transcript.trim() });
      return;
    }

    console.log('Completing answer:', transcript.trim());
    setIsProcessingAnswer(true);
    shouldContinueListening.current = false;
    
    // Stop listening immediately
    stopListening();
    setState('processing');
    
    // Add answer to conversation
    const newAnswer: Conversation = {
      type: 'answer',
      text: transcript.trim(),
      timestamp: new Date()
    };
    setConversation(prev => [...prev, newAnswer]);

    // Store the complete Q&A pair
    const responseData = {
      questionId: interviewQuestions[currentQuestionIndex].id,
      question: interviewQuestions[currentQuestionIndex].text,
      answer: transcript.trim(),
      timestamp: new Date()
    };
    
    setStoredResponses(prev => [...prev, responseData]);

    // Move to next question after a brief pause
    setTimeout(() => {
      setTranscript('');
      setInterimTranscript('');
      setIsProcessingAnswer(false);
      setNoResponsePrompts(0);
      
      if (currentQuestionIndex < interviewQuestions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        
        // Automatically ask next question in auto mode
        if (isAutoMode) {
          console.log('Moving to next question:', nextIndex);
          setTimeout(() => {
            speakQuestion(interviewQuestions[nextIndex].text);
          }, 2000);
        } else {
          setState('idle');
        }
      } else {
        console.log('Interview completed');
        setState('completed');
      }
    }, 1500);
  };

  const startInterview = () => {
    console.log('Starting interview');
    setNoResponsePrompts(0);
    setIsProcessingAnswer(false);
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (selectedVoice) {
      speakQuestion(currentQuestion.text);
    }
  };

  const skipToNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1 && state !== 'speaking_question') {
      shouldContinueListening.current = false;
      stopListening();
      if (synthRef.current) synthRef.current.cancel();
      setCurrentQuestionIndex(prev => prev + 1);
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
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    speakQuestion(currentQuestion.text);
  };

  const resetInterview = () => {
    console.log('Resetting interview');
    shouldContinueListening.current = false;
    stopListening();
    if (synthRef.current) synthRef.current.cancel();
    setCurrentQuestionIndex(0);
    setConversation([]);
    setState('idle');
    setTranscript('');
    setInterimTranscript('');
    setNoResponsePrompts(0);
    setIsProcessingAnswer(false);
  };

  const clearStoredResponses = () => {
    setStoredResponses([]);
  };

  const downloadResponses = () => {
    if (storedResponses.length === 0) return;
    
    const data = storedResponses.map(response => ({
      question: response.question,
      answer: response.answer,
      timestamp: response.timestamp.toISOString()
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-responses-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
  const currentQuestion = interviewQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / interviewQuestions.length) * 100;

  if (!speechSupported) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
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
    <div>
      <div>
        <div>
          {/* Interview Panel */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Current State */}
              <div className={`text-center p-4 rounded-lg ${stateDisplay.bgColor}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {state === 'speaking_question' && <Volume2 className="w-6 h-6 text-blue-600" />}
                  {state === 'listening_answer' && <Mic className="w-6 h-6 text-green-600 animate-pulse" />}
                  {state === 'processing' && <div className="w-6 h-6 bg-yellow-500 rounded-full animate-spin" />}
                  {state === 'idle' && <MessageSquare className="w-6 h-6 text-gray-600" />}
                  {state === 'completed' && <User className="w-6 h-6 text-purple-600" />}
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

              {/* Current Question */}
              {state !== 'completed' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Current Question</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {currentQuestion.category}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-blue-900 font-medium">
                      {currentQuestion.text}
                    </p>
                  </div>
                </div>
              )}

              {/* Live Transcript */}
              {(state === 'listening_answer' || transcript || interimTranscript) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">Your Response:</h4>
                    {state === 'listening_answer' && (
                      <div className="text-xs text-gray-500 animate-pulse">
                        🎤 Listening...
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg min-h-[60px] border">
                    <p className="text-gray-900">
                      {transcript}
                      <span className="text-gray-500 italic">{interimTranscript}</span>
                      {isListening && <span className="animate-pulse">|</span>}
                    </p>
                    {!transcript && !interimTranscript && state === 'listening_answer' && (
                      <p className="text-gray-400 italic">Start speaking to see your words appear here...</p>
                    )}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                {state === 'idle' ? (
                  <Button 
                    onClick={startInterview}
                    className="col-span-2 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {currentQuestionIndex === 0 ? 'Start Auto Interview' : 'Continue Interview'}
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
                    <Button 
                      onClick={repeatQuestion}
                      variant="outline"
                      disabled={state === 'processing' || isProcessingAnswer}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Repeat
                    </Button>
                    <Button 
                      onClick={skipToNextQuestion}
                      variant="outline"
                      disabled={currentQuestionIndex >= interviewQuestions.length - 1}
                    >
                      Skip Question
                    </Button>
                  </>
                )}
              </div>

              {/* Manual Override Controls */}
              {!isAutoMode && state === 'idle' && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    onClick={startListening}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                  <Button 
                    onClick={() => speakQuestion(currentQuestion.text)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Speak Question
                  </Button>
                </div>
              )}

              {state === 'listening_answer' && (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAnswerComplete}
                    variant="outline"
                    className="flex-1"
                    disabled={!transcript.trim() || transcript.trim().length < 5 || isProcessingAnswer}
                  >
                    Finish Answer
                  </Button>
                  {/* <Button 
                    onClick={() => {
                      stopListening();
                      setState('idle');
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Stop
                  </Button> */}
                </div>
              )}

              {/* Auto Mode Info */}
              {isAutoMode && state === 'idle' && (
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    🤖 <strong>Auto Mode:</strong> Questions flow automatically. 
                    The interview will automatically proceed after 2.5 seconds of silence.
                  </p>
                </div>
              )}

              {/* Listening Tips */}
              {state === 'listening_answer' && (
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    💡 <strong>Speaking:</strong> Speak clearly and pause for 2-3 seconds when you finish. 
                    The system will automatically move to the next question.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stored Responses Panel */}
          {/* <Card className="p-6 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Stored Responses</h3>
                <div className="flex gap-2">
                  {storedResponses.length > 0 && (
                    <>
                      <Button 
                        onClick={downloadResponses}
                        variant="outline"
                        size="sm"
                      >
                        Download
                      </Button>
                      <Button 
                        onClick={clearStoredResponses}
                        variant="outline"
                        size="sm"
                      >
                        Clear
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}