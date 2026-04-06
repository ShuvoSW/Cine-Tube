"use client";

import { useEffect, useState } from "react";
import { Film, Star, TrendingUp, Award } from "lucide-react";

const loadingMessages = [
  "Loading amazing content...",
  "Finding the best movies for you...",
  "Almost there...",
  "Preparing your cinematic experience...",
  "Gathering top ratings...",
  "Setting the stage..."
];

export default function PageLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="relative">
        {/* Animated background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-full animate-ping" />
          <div className="absolute w-48 h-48 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse" />
        </div>

        {/* Main loader */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center space-y-6">
            {/* Animated logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-r from-red-500 to-purple-600 rounded-full p-4">
                <Film className="w-12 h-12 text-white animate-spin-slow" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-64 space-y-2">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-loading-bar" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center animate-fadeIn">
                {loadingMessages[messageIndex]}
              </p>
            </div>

            {/* Decorative stars */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-yellow-400 animate-pulse"
                  style={{ animationDelay: `${star * 0.1}s` }}
                />
              ))}
            </div>

            {/* Features */}
            <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}