// ─── Generic sortable + paginated table ───────────────────────────────────────
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "./ui";
import { Pagination } from "./ui";
import type { TableColumn } from "../types";

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  emptyMessage?: string;
  className?: string;
  stickyHeader?: boolean;
  loading?: boolean;
}

export function DataTable<T>({
  columns, data, rowKey, pageSize = 10, onRowClick,
  selectable, selectedIds, onSelectionChange,
  emptyMessage = "No records found.", className, stickyHeader, loading,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = av === bv ? 0 : (av == null ? 1 : bv == null ? -1 : av < bv ? -1 : 1);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const paged = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page, pageSize]);

  function handleSort(col: TableColumn<T>) {
    if (!col.sortable || !col.key) return;
    if (sortKey === col.key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(col.key); setSortDir("asc"); }
    setPage(1);
  }

  const allIds = paged.map(r => rowKey(r));
  const allSelected = allIds.length > 0 && allIds.every(id => selectedIds?.has(id));
  const someSelected = allIds.some(id => selectedIds?.has(id)) && !allSelected;

  function toggleAll() {
    if (!onSelectionChange || !selectedIds) return;
    const next = new Set(selectedIds);
    if (allSelected) allIds.forEach(id => next.delete(id));
    else allIds.forEach(id => next.add(id));
    onSelectionChange(next);
  }

  function toggleRow(id: string) {
    if (!onSelectionChange || !selectedIds) return;
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    onSelectionChange(next);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm border-collapse">
          <thead className={cn("bg-muted/50", stickyHeader && "sticky top-0 z-10")}>
            <tr>
              {selectable && (
                <th className="w-10 px-3 py-3 text-left">
                  <input type="checkbox" checked={allSelected} ref={el => { if (el) el.indeterminate = someSelected; }} onChange={toggleAll} className="rounded border-border accent-[#440F7C]" />
                </th>
              )}
              {columns.map(col => (
                <th key={String(col.key ?? col.header)} onClick={() => handleSort(col)} className={cn("px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", col.sortable && "cursor-pointer hover:text-foreground select-none", col.width && `w-[${col.width}]`)}>
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      sortKey === col.key
                        ? sortDir === "asc" ? <ChevronUp size={12} className="text-[#440F7C]" /> : <ChevronDown size={12} className="text-[#440F7C]" />
                        : <ChevronsUpDown size={12} className="text-muted-foreground/40" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="py-16 text-center text-sm text-muted-foreground">Loading…</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="py-16 text-center text-sm text-muted-foreground">{emptyMessage}</td></tr>
            ) : paged.map(row => {
              const id = rowKey(row);
              const selected = selectedIds?.has(id);
              return (
                <tr key={id} onClick={() => onRowClick?.(row)} className={cn("border-t border-border transition-colors", onRowClick && "cursor-pointer hover:bg-muted/30", selected && "bg-[#440F7C]/5")}>
                  {selectable && (
                    <td className="px-3 py-3" onClick={e => { e.stopPropagation(); toggleRow(id); }}>
                      <input type="checkbox" checked={!!selected} onChange={() => toggleRow(id)} className="rounded border-border accent-[#440F7C]" />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={String(col.key ?? col.header)} className={cn("px-4 py-3 text-foreground", col.align === "right" && "text-right", col.align === "center" && "text-center")}>
                      {col.render ? col.render(row[col.key as keyof T], row) : String(col.key ? row[col.key as keyof T] ?? "" : "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <Pagination page={page} pageSize={pageSize} total={data.length} onPageChange={setPage} />
      )}
    </div>
  );
}
