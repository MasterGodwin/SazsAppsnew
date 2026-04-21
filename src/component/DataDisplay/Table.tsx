import React, { useState, useMemo } from "react";

export interface Column<T, K extends keyof T = keyof T> {
  key: K;
  label: string;
  sortable?: boolean;
  render?: (value: T[K], row: T) => React.ReactNode;
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

    // 🔍 Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
    }

    // 🔃 Sort
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
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 text-sm border rounded-lg"
              />
            )}
            {actions}
          </div>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`p-2 text-left ${
                  col.sortable ? "cursor-pointer" : ""
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2">
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs mt-2">
        Showing {filteredAndSortedData.length} of {data.length}
      </p>
    </div>
  );
};

export default Table;