"use client";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFeatures } from "./useFeatures";
import { columns } from "./columns";

export function FeaturesTable() {
  const {
    table,
    canTablePrevPage,
    canTableNextPage,
    tablePrevPage,
    tableNextPage,
    tableFirstPage,
    tableLastPage,
    pagination,
  } = useFeatures();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <p>Pagina numero: {pagination.pageIndex || 0}</p>
        <Button variant="outline" size="sm" onClick={() => tableFirstPage()}>
          First
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => tablePrevPage()}
          disabled={!canTablePrevPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => tableNextPage()}
          disabled={!canTableNextPage()}
        >
          Next
        </Button>

        <Button variant="outline" size="sm" onClick={() => tableLastPage()}>
          Last
        </Button>
      </div>
    </div>
  );
}
