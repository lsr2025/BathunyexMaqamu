// Lightweight CSV builder + browser download helper.

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCSV(rows: readonly object[], columns?: string[]): string {
  if (rows.length === 0) return "";
  const records = rows as readonly Record<string, unknown>[];
  const cols = columns ?? Object.keys(records[0]);
  const header = cols.map(escapeCell).join(",");
  const body = records
    .map((row) => cols.map((c) => escapeCell(row[c])).join(","))
    .join("\r\n");
  return `${header}\r\n${body}`;
}

export function downloadBlob(content: BlobPart, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSV(
  rows: readonly object[],
  filename: string,
  columns?: string[]
) {
  const csv = toCSV(rows, columns);
  downloadBlob("﻿" + csv, filename, "text/csv;charset=utf-8;");
}
