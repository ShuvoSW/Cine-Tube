/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Film, Eye, Heart } from "lucide-react";
import { useState } from "react";
import { MediaCardProps } from "@/lib/types/types";


export default function MediaCard({ item }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatRating = (rating: number) => {
    return rating?.toFixed(1) || "0.0";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <Link href={`/media/${item.id}`}>
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with Fixed Dimensions */}
        <div className="relative w-full aspect-[2/3]">
          {/* Image */}
          <Image
            src={item.coverImage || "/placeholder-image.jpg"}
            alt={item.title}
            fill
            className="object-cover w-full transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Info */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="space-y-2">
              {/* Watch Now Button */}
              <button className="w-full py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Watch Now
              </button>
              
              {/* Quick Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg hover:bg-white/30 transition">
                  Details
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLiked(!isLiked);
                  }}
                  className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
                >
                  <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg flex items-center gap-1">
            <Star className={`w-3 h-3 ${getRatingColor(item.averageRating)} fill-current`} />
            <span className={`text-xs font-bold ${getRatingColor(item.averageRating)}`}>
              {formatRating(item.averageRating)}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
            <span className="text-xs text-white font-medium">
              {item.type === "Series" ? "TV Series" : "Movie"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
            {item.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{item.releaseYear}</span>
            </div>
            
            {item.genre && (
              <div className="flex items-center gap-2">
                <Film className="w-3 h-3" />
                <span className="line-clamp-1">{item.genre[1]}</span>
              </div>
            )}
          </div>

          {/* Ratings Count */}
          {item.totalRatings && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3 h-3" />
              <span>{item.totalRatings.toLocaleString()} ratings</span>
            </div>
          )}

          {/* Progress Bar (Optional) */}
          {isHovered && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 animate-slideIn" />
          )}
        </div>
      </div>
    </Link>
  );
}