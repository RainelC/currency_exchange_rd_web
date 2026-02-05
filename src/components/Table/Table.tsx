import React, { useState } from "react";

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function Table<T>({
  data,
  columns,
  className = "",
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key?: keyof T, sortable?: boolean) => {
    if (!key || !sortable) return;
    setSortConfig((current) => {
      if (current?.key === key && current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full min-w-full text-left border-collapse text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-gray-400">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`py-4 px-4 font-medium select-none ${col.sortable ? "cursor-pointer hover:text-white" : ""} ${col.className || ""}`}
                onClick={() => handleSort(col.accessorKey, col.sortable)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable &&
                    sortConfig &&
                    sortConfig.key === col.accessorKey && (
                      <span className="text-xs">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 group"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-4 px-4 ${col.className || ""}`}
                >
                  {col.cell
                    ? col.cell(row)
                    : col.accessorKey
                      ? (row[col.accessorKey] as React.ReactNode)
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
