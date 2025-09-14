import React from 'react';

interface InterviewerAvatarProps {
  isThinking?: boolean;
  isSpeaking?: boolean;
}

export function InterviewerAvatar({ isThinking = false, isSpeaking = false }: InterviewerAvatarProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Avatar Container */}
      <div className={`
        relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden
        transition-all duration-300 ease-in-out bg-white shadow-2xl
        ${isSpeaking ? 'scale-105 shadow-blue-200/50' : ''}
        ${isThinking ? 'animate-pulse' : ''}
      `}>
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        
        {/* Professional Figure */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Head */}
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full relative shadow-inner border border-amber-200/30">
              {/* Professional Hair */}
              <div className="absolute -top-1 left-4 right-4 h-7 bg-gradient-to-br from-slate-600 to-slate-700 rounded-t-full" />
              <div className="absolute top-2 left-2 right-2 h-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full opacity-80" />
              
              {/* Eyes - Professional and Attentive */}
              <div className="absolute top-8 left-6 w-2 h-2 bg-slate-800 rounded-full" />
              <div className="absolute top-8 right-6 w-2 h-2 bg-slate-800 rounded-full" />
              
              {/* Eyebrows */}
              <div className="absolute top-6 left-5 w-3 h-0.5 bg-slate-700 rounded-full" />
              <div className="absolute top-6 right-5 w-3 h-0.5 bg-slate-700 rounded-full" />
              
              {/* Professional Smile */}
              <div className={`
                absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-1.5 
                rounded-full transition-all duration-200 bg-slate-700
                ${isSpeaking ? 'animate-pulse w-4 h-2 bg-blue-600' : ''}
              `} />
            </div>
            
            {/* Professional Attire - Suit/Blazer */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-full" />
            {/* Shirt/Collar */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-t-full border-t border-slate-300" />
            {/* Tie */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-blue-600 to-blue-700 rounded-b-sm" />
          </div>
        </div>
        
        {/* Status Ring */}
        <div className={`
          absolute inset-0 rounded-full border-4 transition-all duration-300
          ${isSpeaking ? 'border-blue-500 shadow-lg shadow-blue-500/30' : 
            isThinking ? 'border-amber-500 shadow-lg shadow-amber-500/30' : 
            'border-slate-300'}
        `} />
      </div>
      
      {/* Status Text */}
      <div className="mt-3 text-center">
        <p className={`
          text-sm font-medium transition-colors duration-300
          ${isSpeaking ? 'text-blue-600' : 
            isThinking ? 'text-amber-600' : 
            'text-slate-600'}
        `}>
          {isSpeaking ? 'Speaking...' : isThinking ? 'Reviewing your answer...' : 'Ready for interview'}
        </p>
      </div>
      
      {/* Thinking animation */}
      {isThinking && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1 bg-white rounded-full px-3 py-2 shadow-lg border border-gray-200">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}


export default InterviewerAvatar;