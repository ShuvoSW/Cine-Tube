"use client";

import { Film, Loader2, Sparkles, Heart, Star } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  text?: string;
  variant?: "default" | "spinner" | "pulse" | "skeleton" | "dots";
}

export default function Loading({ 
  size = "md", 
  fullScreen = false, 
  text = "Loading...", 
  variant = "default" 
}: LoadingProps) {
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-red-500 rounded-full animate-spin`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="w-1/2 h-1/2 text-red-500 opacity-50" />
            </div>
          </div>
        );

      case "pulse":
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-pulse`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-1/2 h-1/2 text-white animate-spin" />
            </div>
          </div>
        );

      case "skeleton":
        return (
          <div className="space-y-3 w-64">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-full" />
          </div>
        );

      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`${sizeClasses[size]} bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-bounce`}
                style={{ animationDelay: `${dot * 0.15}s` }}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            {/* Outer rotating ring */}
            <div className={`${sizeClasses[size]} border-4 border-transparent border-t-red-500 border-r-purple-500 rounded-full animate-spin`} />
            
            {/* Inner pulsing ring */}
            <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-b-red-500 border-l-purple-500 rounded-full animate-ping opacity-75`} />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="w-1/2 h-1/2 text-gradient" />
            </div>
          </div>
        );
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      
      {variant !== "skeleton" && (
        <>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium`}>
              {text}
            </p>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          
          {/* Loading tips */}
          <div className="text-center max-w-md animate-fadeIn">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Did you know? CineRate has over 10,000+ movies and series rated by our community!
            </p>
          </div>
        </>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="relative">
          {/* Animated background circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse" />
          </div>
          {content}
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
}