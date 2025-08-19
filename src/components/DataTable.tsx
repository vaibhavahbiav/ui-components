import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const valA = a[sortKey as keyof T];
        const valB = b[sortKey as keyof T];
        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
      })
    : data;

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const toggleRow = (id: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    if (onRowSelect) {
      onRowSelect(data.filter((d) => newSelected.has(d.id)));
    }
  };

  if (loading) return <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center tracking-wider animate-pulse">Loading...</p>;
  if (!data.length) return <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center tracking-wider">No data available.</p>;

  return (
    <table className="min-w-full rounded-sm overflow-hidden text-center">
      <thead className="bg-amber-300 text-gray-950 dark:bg-purple-500 dark:text-gray-50 select-none">
        <tr>
          {selectable && <th className="p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-2 cursor-pointer"
              onClick={() => col.sortable && toggleSort(col.key)}
            >
              {col.title}
              {col.sortable && sortKey === col.key && (asc ? " ↑" : " ↓")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="font-thin">
        {sortedData.map((row) => (
          <tr key={row.id} className="border-t border-amber-300 dark:border-purple-300">
            {selectable && (
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
