"use client";

import { Loader2 } from "lucide-react";

interface ButtonLoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function ButtonLoading({ text = "Loading...", size = "md" }: ButtonLoadingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span>{text}</span>
    </div>
  );
}