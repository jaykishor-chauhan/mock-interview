import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface AIAvatarProps {
  mood: 'neutral' | 'thinking' | 'encouraging' | 'analyzing';
  message?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ mood, message }) => {
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (mood === 'thinking' || mood === 'analyzing') {
      setPulseAnimation(true);
    } else {
      setPulseAnimation(false);
    }
  }, [mood]);

  const getMoodIcon = () => {
    switch (mood) {
      case 'thinking':
        return <Brain className="w-8 h-8 text-blue-400" />;
      case 'encouraging':
        return <Lightbulb className="w-8 h-8 text-amber-400" />;
      case 'analyzing':
        return <CheckCircle className="w-8 h-8 text-emerald-400" />;
      default:
        return <Brain className="w-8 h-8 text-gray-400" />;
    }
  };

  const getMoodGradient = () => {
    switch (mood) {
      case 'thinking':
        return 'from-blue-400 to-purple-400';
      case 'encouraging':
        return 'from-amber-400 to-orange-400';
      case 'analyzing':
        return 'from-emerald-400 to-teal-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getMoodGradient()} p-1 ${pulseAnimation ? 'animate-pulse' : ''}`}>
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
          {getMoodIcon()}
        </div>
        {pulseAnimation && (
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getMoodGradient()} animate-ping opacity-20`}></div>
        )}
      </div>
      
      {message && (
        <div className="max-w-xs p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50">
          <p className="text-sm text-gray-700 text-center">{message}</p>
        </div>
      )}
    </div>
  );
};