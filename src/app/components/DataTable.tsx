import { useState, ReactNode } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreVertical } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
  density?: 'comfortable' | 'compact';
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  actions,
  emptyMessage = 'No data available',
  density = 'comfortable',
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const column = columns.find(col => col.key === sortColumn);
    if (!column) return 0;
    
    const aValue = column.accessor(a);
    const bValue = column.accessor(b);
    
    // Simple string/number comparison
    const aStr = String(aValue);
    const bStr = String(bValue);
    
    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const paddingClass = density === 'compact' ? 'px-4 py-2' : 'px-6 py-4';

  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-[var(--muted-foreground)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--muted)] border-b border-border">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`${paddingClass} text-${column.align || 'left'}`}
                  scope="col"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-2 font-medium text-sm text-foreground hover:text-[var(--primary)] transition-colors"
                    >
                      {column.header}
                      {sortColumn === column.key ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="size-4" aria-label="Sorted ascending" />
                        ) : (
                          <ChevronDown className="size-4" aria-label="Sorted descending" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-4 opacity-50" aria-label="Not sorted" />
                      )}
                    </button>
                  ) : (
                    <span className="font-medium text-sm text-foreground">{column.header}</span>
                  )}
                </th>
              ))}
              {actions && (
                <th className={`${paddingClass} text-right`} scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-[var(--muted)]/50' : ''}
                  transition-colors
                `}
              >
                {columns.map(column => (
                  <td
                    key={column.key}
                    className={`${paddingClass} text-sm text-${column.align || 'left'}`}
                  >
                    {column.accessor(row)}
                  </td>
                ))}
                {actions && (
                  <td className={`${paddingClass} text-right`}>
                    <div className="flex justify-end">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
