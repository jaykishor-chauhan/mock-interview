import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

interface UserInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function UserInput({ onSendMessage, disabled = false }: UserInputProps) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const isVoiceSupported = recognitionRef.current !== null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3 bg-white rounded-full shadow-lg border border-gray-200 p-2">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? "AI is thinking..." : "Type your message..."}
          disabled={disabled}
          className={`
            flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
        />
        
        {/* Voice input button */}
        {isVoiceSupported && (
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={disabled}
            className={`
              p-3 rounded-full transition-all duration-200 flex-shrink-0
              ${isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : disabled 
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
              }
            `}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        )}

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`
            p-3 rounded-full transition-all duration-200 flex-shrink-0
            ${message.trim() && !disabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Send size={20} />
        </button>
      </form>
      
      {isListening && (
        <div className="text-center mt-2">
          <p className="text-sm text-red-500 animate-pulse">Listening...</p>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}