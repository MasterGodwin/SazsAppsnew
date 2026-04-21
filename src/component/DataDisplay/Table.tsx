import React, { useState, useMemo } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Search...",
  className = "",
  title,
  subtitle,
  actions,
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  };

  return (
    <div className={`flex flex-col ${className}`}>

      {(title || subtitle || searchable || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          
          {(title || subtitle) && (
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 sm:ml-auto">
            {searchable && (
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-56 placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap select-none
                      ${col.sortable ? "cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-colors" : ""}`}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && (
                        <span className="flex flex-col gap-px">
                          <svg
                            className={`w-2.5 h-2.5 transition-colors ${
                              sortConfig?.key === col.key && sortConfig.direction === "asc"
                                ? "text-blue-500"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 10 6"
                            fill="currentColor"
                          >
                            <path d="M5 0L10 6H0z" />
                          </svg>
                          <svg
                            className={`w-2.5 h-2.5 transition-colors ${
                              sortConfig?.key === col.key && sortConfig.direction === "desc"
                                ? "text-blue-500"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 10 6"
                            fill="currentColor"
                          >
                            <path d="M5 6L0 0H10z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/40 transition-colors duration-100 group"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-5 py-3.5 text-gray-700 whitespace-nowrap"
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-500">No data found</p>
                      {searchTerm && (
                        <p className="text-xs text-gray-400">
                          Try adjusting your search for{" "}
                          <span className="font-medium text-gray-500">"{searchTerm}"</span>
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredAndSortedData.length > 0 && (
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredAndSortedData.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">{data.length}</span>{" "}
              results
            </p>
            {searchTerm && filteredAndSortedData.length !== data.length && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;