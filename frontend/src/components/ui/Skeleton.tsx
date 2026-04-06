"use client";

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-48 bg-gray-300 dark:bg-gray-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonMovieGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array(count).fill(0).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonReview = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
    </div>
  </div>
);