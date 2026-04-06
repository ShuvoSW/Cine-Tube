import LoginForm from "@/components/modules/LoginForm";
import { Film, Sparkles, TrendingUp, Star } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl p-3">
                <Film className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Sign in to continue your cinematic journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-fadeInUp">
          <LoginForm />
        </div>

        {/* Features Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fadeInUp animation-delay-200">
          <div className="flex items-center gap-1 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs text-gray-600 dark:text-gray-400">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>Rate Movies</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span>Trending Reviews</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-xs text-gray-600 dark:text-gray-400">
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>Personalized</span>
          </div>
        </div>
      </div>
    </div>
  );
};