/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMedia } from "@/hooks/useMovie";
import FilterBar from "@/components/FilterBar";
import MediaCard from "@/components/layouts/shared/MovieCard";
import Pagination from "@/components/Pagination";
import PageLoading from "@/components/ui/PageLoading";

export default function SeriesPage() {
  const { data, meta, loading, params, setParams } = useMedia({
    type: "Series",
    page: 1,
    limit: 10,
  });

  // Filter only movies
  const series = data.filter((item: any) => item.type === "Series");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TV Series</h1>

      <FilterBar params={params} setParams={setParams} />

      {loading ? (
        <PageLoading></PageLoading>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {series.map((item: any) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          {series.length === 0 && !loading && (
            <p className="text-center text-gray-500 py-12">No seies found.</p>
          )}
          <Pagination meta={meta} setParams={setParams} />
        </>
      )}
    </div>
  );
}
