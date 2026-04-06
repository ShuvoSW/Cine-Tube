"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Tv,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  Award,
  Clock,
  TrendingUp,
  Shield,
  CreditCard,
  Headphones,
  ArrowUp,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    explore: [
      { name: "Movies", href: "/movies", icon: Film },
      { name: "TV Series", href: "/series", icon: Tv },
      { name: "Top Rated", href: "/top-rated", icon: Star },
      { name: "Trending Now", href: "/trending", icon: TrendingUp },
      { name: "New Releases", href: "/new-releases", icon: Sparkles },
    ],
    support: [
      { name: "Help Center", href: "/help", icon: Headphones },
      { name: "Contact Us", href: "/contact", icon: Mail },
      { name: "FAQ", href: "/faq", icon: Clock },
      { name: "Privacy Policy", href: "/privacy", icon: Shield },
      { name: "Terms of Service", href: "/terms", icon: Award },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Advertising", href: "/advertise" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const streamingPartners = [
    { name: "Netflix", color: "from-red-600 to-red-800" },
    { name: "Prime Video", color: "from-blue-600 to-indigo-800" },
    { name: "Disney+", color: "from-blue-500 to-blue-700" },
    { name: "HBO Max", color: "from-purple-600 to-purple-900" },
    { name: "Apple TV+", color: "from-gray-700 to-gray-900" },
    { name: "YouTube", color: "from-red-600 to-red-700" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      color: "hover:bg-[#1877f2]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      color: "hover:bg-[#1da1f2]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      color: "hover:bg-gradient-to-r from-[#833ab4] to-[#fd1d1d]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "hover:bg-[#0077b5]",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      color: "hover:bg-gray-700 dark:hover:bg-gray-600",
    },
  ];

  return (
    <>
      <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Top Section with Logo and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-red-500 to-purple-600 rounded-lg p-2">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  CineTube
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Your ultimate destination for discovering, rating, and reviewing
                movies and TV series. Join our community of cinephiles and share
                your thoughts!
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} hover:text-white`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Explore */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <span className="ml-4">Explore</span>
                  <Sparkles className="w-4 h-4 text-red-500" />
                </h3>
                <ul className="space-y-2">
                  {footerLinks.explore.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 text-sm group"
                        >
                          <Icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <span className="ml-4">Support</span>
                  <Headphones className="w-4 h-4 text-purple-500" />
                </h3>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 text-sm group"
                        >
                          <Icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Company */}
              <div className="ml-6 md:ml-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Company
                </h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Streaming Partners Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center justify-center space-x-2">
                <span>Streaming Partners</span>
                <CreditCard className="w-4 h-4 text-green-500" />
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Watch your favorite content on these platforms
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {streamingPartners.map((partner) => (
                <div
                  key={partner.name}
                  className={`px-4 py-2 bg-gradient-to-r ${partner.color} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                >
                  <span className="text-white text-sm font-semibold">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>© {currentYear} CineTube.</span>
                <span>All rights reserved.</span>
                <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-[#635bff] to-[#0f0e1a] rounded-lg">
                  <CreditCard className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-medium">
                    Powered by Stripe
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-[#635bff]" />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">
                    Secure payments
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">
                    PCI compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
