/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  LogOut,
  Film,
  Tv,
  Home,
  LayoutDashboard,
  Sun,
  Moon,
  ChevronDown,
  LucideCreditCard,
  ClipboardListIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { api } from "@/lib/axios";

const NavLink = memo(({ href, label, icon: Icon, isActive }: any) => (
  <Link
    href={href}
    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
      isActive
        ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
        : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-white/10"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {isActive && (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600" />
    )}
  </Link>
));
NavLink.displayName = "NavLink";

export default function Navbar() {
  const { user, loading, refetchUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  Auto-refresh user data when route changes
  useEffect(() => {
    const refreshUserData = async () => {
      await refetchUser();
    };
    refreshUserData();
  }, [pathname, refetchUser]); // Refetch when route changes

  //  Listen for custom events for auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      refetchUser();
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [refetchUser]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    },
    [searchQuery, router],
  );

  const handleLogout = useCallback(async () => {
    try {
      // Call backend logout
      await api.post("/auth/logout", {});

      // Refresh auth context (clears user)
      await refetchUser();

      // Show success toast
      toast.success("Logged out successfully", {
        description: "See you again soon!",
        duration: 3000,
      });

      // Close menus
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: still clear user and redirect
      await refetchUser();
      toast.error("Logged out");
      router.push("/");
    }
  }, [refetchUser, router]);

  const isAdmin = user?.role === "ADMIN";

  const navLinks = isAdmin
    ? [
        { href: "/", label: "Home", icon: Home },
        { href: "/movies", label: "Movies", icon: Film },
        { href: "/series", label: "TV Series", icon: Tv },
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      ]
    : [
        { href: "/", label: "Home", icon: Home },
        { href: "/movies", label: "Movies", icon: Film },
        { href: "/series", label: "TV Series", icon: Tv },
        { href: "/watchlist", label: "Watchlist", icon: ClipboardListIcon },
        {
          href: "/subscription",
          label: "Subscription",
          icon: LucideCreditCard,
        },
      ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-red-500 to-purple-600 p-1.5 rounded-lg">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  CineTube
                </span>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1">
                  Rate & Review
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search */}
              {!isAdmin && (
                <div className="relative">
                  {isSearchOpen ? (
                    <form onSubmit={handleSearch} className="relative w-72">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies & series..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        autoFocus
                      />
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Safe Theme Toggle with mounted check */}
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <div className="w-5 h-5" />
                ) : resolvedTheme === "dark" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* User Section */}
              {loading ? (
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 px-3 py-1 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10 transition"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 py-2 z-50">
                      <div className="px-5 py-2 border-b dark:border-gray-700">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-300">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium hover:text-red-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Functional */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white dark:bg-gray-900 md:hidden"
          style={{ top: "64px" }}
        >
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            {/* Mobile Search */}
            {!isAdmin && (
              <form onSubmit={handleSearch} className="mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies & series..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </form>
            )}

            {/* Mobile Navigation Links */}
            <div className="flex-1 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-base font-medium transition ${
                    pathname === link.href
                      ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      : "hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="pt-6 border-t dark:border-gray-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-center border rounded-2xl font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 text-center bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-2xl font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
