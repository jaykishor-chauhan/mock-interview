import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InterviewerAvatar } from '../../components/InterviewerAvatar';
import { UserInput } from '../../components/UserInput';


export function InterviewInterface() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
    
    // Start with welcome message
    setTimeout(() => {
      const welcomeMessage = "Hello! I'm Sarah, and I'll be conducting your technical interview today. Let's start with a simple question: Can you tell me about yourself and your background in software development?";
      setCurrentMessage(welcomeMessage);
      setShowBubble(true);
      speak(welcomeMessage);
    }, 1000);
  }, []);

  const interviewQuestions = [
    "Can you tell me about yourself and your background in software development?",
    "What programming languages are you most comfortable with and why?",
    "Describe a challenging project you've worked on recently. What made it challenging?",
    "How do you approach debugging when you encounter a difficult problem?",
    "Can you explain the difference between REST and GraphQL APIs?",
    "What's your experience with version control systems like Git?",
    "How do you ensure code quality in your projects?",
    "Tell me about a time you had to learn a new technology quickly.",
    "What's your approach to working in a team environment?",
    "Do you have any questions about our company or the role?"
  ];

  const generateInterviewResponse = (userAnswer: string): string => {
    const responses = [
      "That's a great answer. Let me ask you another question.",
      "Interesting perspective. I'd like to dive deeper into another area.",
      "Thank you for sharing that. Let's move on to the next question.",
      "I appreciate the detail in your response. Here's another question for you.",
      "That shows good understanding. Let me ask you about something else.",
      "Excellent. I'd like to explore another aspect of your experience."
    ];
    
    if (userAnswer.toLowerCase().includes('question') && userAnswer.toLowerCase().includes('company')) {
      return "That's a great question! We're a fast-growing tech company focused on innovation. We value collaboration, continuous learning, and work-life balance. Is there anything specific about our culture or technology stack you'd like to know?";
    }
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    const nextQuestion = interviewQuestions[Math.min(questionCount + 1, interviewQuestions.length - 1)];
    
    return `${response} ${nextQuestion}`;
  };

  const speak = useCallback((text: string) => {
    if (!speechSynthRef.current) return;

    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure for professional female voice
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    const voices = speechSynthRef.current.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('susan') ||
      (voice.lang === 'en-US' && voice.name.includes('Google'))
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setShowBubble(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => setShowBubble(false), 3000);
    };

    speechSynthRef.current.speak(utterance);
  }, []);

  const handleSendMessage = useCallback(async (userAnswer: string) => {
    setIsThinking(true);
    setShowBubble(false);

    setTimeout(() => {
      const interviewerResponse = generateInterviewResponse(userAnswer);
      setCurrentMessage(interviewerResponse);
      setIsThinking(false);
      setQuestionCount(prev => Math.min(prev + 1, interviewQuestions.length - 1));
      
      setTimeout(() => {
        speak(interviewerResponse);
      }, 500);
    }, 2000 + Math.random() * 1000);
  }, [speak, questionCount]);

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
      setShowBubble(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100">
      {/* Main Interview Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Interviewer Avatar with Speech Bubble */}
        <div className="relative mb-8">
          <InterviewerAvatar 
            isThinking={isThinking} 
            isSpeaking={isSpeaking} 
          />
        </div>

        {/* Interview Controls */}
        <div className="w-full max-w-2xl space-y-4">
          {isSpeaking && (
            <div className="text-center">
              <button
                onClick={stopSpeaking}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg"
              >
                Stop Speaking
              </button>
            </div>
          )}

          {/* User Input */}
          <UserInput 
            onSendMessage={handleSendMessage}
            disabled={isThinking || isSpeaking}
          />
        </div>
      </div>
    </div>
  );
}




export default InterviewInterface;