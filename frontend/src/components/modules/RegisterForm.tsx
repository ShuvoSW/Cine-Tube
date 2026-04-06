/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Chrome,
  Github,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Phone,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { registerSchema } from "@/lib/zod/auth.schema";

// Registration schema with image validation
const zodSchema = registerSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  },
);

type FormData = z.infer<typeof zodSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const password = watch("password");

  // Password strength checker
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password || "");

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const onSubmit = async (data: FormData) => {
    setIsRegistering(true);

    try {
      // Create FormData for file upload (matches backend field name "image")
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      // IMPORTANT: Field name must be "image" to match upload.single("image")
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Send to register API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          body: formData, // Don't set Content-Type header, browser will set it with boundary
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful!", {
          duration: 3000,
          icon: "🎉",
        });
        router.push("/");
      } else {
        toast.error(result.message || "Registration failed", {
          duration: 4000,
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error?.message || "Something went wrong", {
        duration: 4000,
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Profile Image Upload Section */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-purple-600 p-0.5">
            {imagePreview ? (
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-full p-1.5 cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <Upload className="w-4 h-4 text-white" />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Upload profile picture (optional)
      </p>

      {/* Full Name Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className={`block w-full pl-10 pr-3 py-2.5 border ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email Address <span className="text-red-500">*</span>
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
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
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
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className={`block w-full pl-10 pr-10 py-2.5 border ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    passwordStrength >= level
                      ? getStrengthColor()
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Password strength:{" "}
              <span className="font-semibold">{getStrengthText()}</span>
            </p>
            <ul className="text-xs text-gray-500 space-y-1 mt-2">
              <li className={password.length >= 6 ? "text-green-500" : ""}>
                ✓ At least 6 characters
              </li>
              <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                ✓ Uppercase letter
              </li>
              <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                ✓ Number
              </li>
            </ul>
          </div>
        )}

        {errors.password && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className={`block w-full pl-10 pr-10 py-2.5 border ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
        />
        <label
          htmlFor="terms"
          className="text-xs text-gray-600 dark:text-gray-400"
        >
          I agree to the{" "}
          <Link href="/terms" className="text-red-500 hover:text-red-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-red-500 hover:text-red-600">
            Privacy Policy
          </Link>
        </label>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={isRegistering}
        className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isRegistering ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <User className="w-5 h-5" />
            <span>Create Account</span>
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
            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
          ) : (
            <Chrome className="w-5 h-5 text-red-500" />
          )}
          <span className="text-md font-medium text-gray-700 dark:text-gray-300">
            Google Sign Up
          </span>
        </button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-red-500 hover:text-red-600 font-semibold transition-colors inline-flex items-center gap-1 group"
        >
          Sign in
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </p>
    </form>
  );
}
