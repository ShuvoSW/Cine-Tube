/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { api } from "@/lib/axios";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", data);
      setIsSent(true);
      toast.success("Reset link sent to your email!", {
        duration: 5000,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-24 px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-24 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}