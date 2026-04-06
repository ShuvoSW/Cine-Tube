"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Info,
  TrendingUp,
  Star,
  Clock,
  Calendar,
  Film,
  Eye,
} from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Oppenheimer",
    titleShort: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    descriptionShort: "The story of J. Robert Oppenheimer and the atomic bomb.",
    image: "https://i.ibb.co.com/N6BX6Vkz/oppenheimerr.jpg",
    rating: 8.9,
    year: 2023,
    duration: "3h",
    genre: "Drama",
    trending: true,
  },
  {
    id: 2,
    title: "The Batman",
    titleShort: "The Batman",
    description:
      "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate.",
    descriptionShort: "Batman investigates a sadistic serial killer in Gotham.",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format",
    rating: 8.5,
    year: 2022,
    duration: "2h 56m",
    genre: "Action",
    trending: true,
  },

  {
    id: 3,
    title: "Dune: Part Two",
    titleShort: "Dune 2",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    descriptionShort: "Paul unites with Chani and the Fremen seeking revenge.",
    image:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=2070&auto=format",
    rating: 8.9,
    year: 2024,
    duration: "2h 46m",
    genre: "Sci-Fi",
    trending: true,
  },

  {
    id: 4,
    title: "Spider-Man",
    titleShort: "Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    descriptionShort: "Miles Morales travels across the Multiverse.",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=2070&auto=format",
    rating: 8.7,
    year: 2023,
    duration: "2h 20m",
    genre: "Animation",
    trending: true,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating]);

//   const goToSlide = (index: number) => {
//     if (isAnimating || index === currentSlide) return;
//     setIsAnimating(true);
//     setCurrentSlide(index);
//     setTimeout(() => setIsAnimating(false), 500);
//   };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    return (
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              i < fullStars ? "text-yellow-400 fill-current" : "text-gray-400"
            }`}
          />
        ))}
        <span className="ml-1 sm:ml-2 text-white font-semibold text-xs sm:text-sm">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="relative h-screen min-h-150 sm:min-h-150 w-full -mb-36 md:-mb-18 overflow-hidden bg-linear-to-b from-gray-900 to-black">
      {/* Background Image Carousel  */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              {/* Overlay Gradients - Enhanced for mobile */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30" />
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-l from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto mb-22 md:mb-8 px-4 sm:px-6 lg:px-8 w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 delay-100 ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10 absolute"
              }`}
            >
              <div className="max-w-2xl">
                {/* Trending Badge - Mobile optimized */}
                {slide.trending && (
                  <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1 bg-linear-to-r from-red-500 to-purple-600 rounded-full mb-3 sm:mb-4 animate-pulse">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    <span className="text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                      TRENDING
                    </span>
                  </div>
                )}

                {/* Title - Responsive font sizes */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                  <span className="block sm:hidden">{slide.titleShort}</span>
                  <span className="hidden sm:block">{slide.title}</span>
                </h1>

                {/* Meta Info - Horizontal scroll on mobile */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  <div className="flex items-center space-x-1 text-gray-300 shrink-0">
                    {renderStars(slide.rating)}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300 shrink-0">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{slide.year}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300 shrink-0">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{slide.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300 shrink-0">
                    <Film className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{slide.genre}</span>
                  </div>
                </div>

                {/* Description - Different text for mobile */}
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 line-clamp-3">
                  <span className="block sm:hidden">
                    {slide.descriptionShort}
                  </span>
                  <span className="hidden sm:block">{slide.description}</span>
                </p>

                {/* Buttons - Stacked on mobile, row on tablet+ */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-red-500 to-purple-600 text-white rounded-full font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 w-full sm:w-auto">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Watch Now</span>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-red-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </button>

                  <Link
                    href={`/movie/${slide.id}`}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>More Info</span>
                  </Link>
                </div>

                {/* Viewers Count - Mobile friendly */}
                <div className="mt-6 sm:mt-8 flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>1.2M+ views this week</span>
                  <div className="flex -space-x-2 ml-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-linear-to-r from-red-500 to-purple-600 border-2 border-black flex items-center justify-center"
                      >
                        <span className="text-[8px] sm:text-[10px] text-white font-bold">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar class */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
