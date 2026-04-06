/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function FilterBar({ params, setParams }: any) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      
      {/* Search */}
      <input
        placeholder="Search..."
        value={params.search || ""}
        onChange={(e) =>
          setParams({ ...params, search: e.target.value, page: 1 })
        }
        className="border px-3 py-2 rounded-md"
      />

      {/* Genre */}
      <select
        onChange={(e) =>
          setParams({ ...params, genre: e.target.value, page: 1 })
        }
        className="border px-3 py-2 rounded-md bg-gray-800"
      >
        <option value="">All Genre</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
      </select>

      {/* Sort */}
      <select
        onChange={(e) =>
          setParams({ ...params, sort: e.target.value })
        }
        className="border px-3 py-2 rounded-md bg-gray-800"
      >
        <option value="latest">Latest</option>
        <option value="rating">Top Rated</option>
        <option value="reviews">Most Reviewed</option>
      </select>
    </div>
  );
}