
import React from 'react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  title: string;
  width?: string;
}

interface SimpleTableProps {
  columns: Column[];
  data: Array<Record<string, any>>;
  onRowClick?: (row: Record<string, any>) => void;
  className?: string;
}

const SimpleTable: React.FC<SimpleTableProps> = ({
  columns,
  data,
  onRowClick,
  className,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className={cn('w-full border-collapse', className)}>
        <thead>
          <tr className="bg-muted">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground tracking-wider border-b"
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-border hover:bg-muted/50 transition-colors',
                  onRowClick ? 'cursor-pointer' : ''
                )}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className="px-4 py-3 text-sm"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
