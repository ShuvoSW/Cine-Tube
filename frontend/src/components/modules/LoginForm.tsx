/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod/auth.schema";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogin } from "@/hooks/auth.hook";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Chrome,
  ArrowRight,
  AlertCircle
} from "lucide-react";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Login successful! Welcome back!", {
          duration: 3000,
          icon: "🎉",
        });
        router.push("/");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Invalid email or password", {
          duration: 4000,
          icon: "❌",
        });
      },
    });
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Redirect to Google OAuth
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`block w-full pl-10 pr-10 py-2.5 border ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Logging in...</span>
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-70"
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Chrome className="w-5 h-5 text-red-500" />
          )}
          <span className="text-md font-medium text-gray-700 dark:text-gray-300">Google Login</span>
        </button>       
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-red-500 hover:text-red-600 font-semibold transition-colors inline-flex items-center gap-1 group">
          Sign up
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </p>
    </form>
  );
}