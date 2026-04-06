/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function Pagination({ meta, setParams }: any) {
  const { page, totalPage } = meta;

  if (totalPage <= 1) return null;

  const handlePageChange = (newPage: number) => {
    setParams((prev: any) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-3 py-1 rounded border ${
            page === p
              ? "bg-red-500 text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === totalPage}
        onClick={() => handlePageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}