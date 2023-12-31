import type { Table as TableType } from "@tanstack/react-table";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../icons";

type Props = {
  table: TableType<PlayDataModel> | TableType<FirstRecordRow>;
};

export default function PaginationRow({ table }: Props) {
  let pageCount = table.getPageCount();
  let currentPage = table.getState().pagination.pageIndex + 1;

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 bg-white rounded sm:rounded-tl-none sm:rounded-tr-none ">
      {/* Previous page buttons */}
      <div>
        <button
          className={`p-1 disabled:opacity-25`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to first page"
        >
          <ChevronsLeft />
        </button>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to previous page"
        >
          <ChevronLeft />
        </button>
      </div>

      {/* Pagination settings */}
      <div className="flex items-center justify-center flex-auto gap-8 py-4">
        <span className="flex flex-col items-center gap-1 xs:flex-row">
          <span className="hidden sm:inline">Go to page:</span>
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            value={currentPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 px-1 text-center border rounded sm:text-left"
            aria-label="Table page number"
          />
          <span>of {pageCount}</span>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border rounded"
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Next page buttons */}
      <div>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Go to next page"
        >
          <ChevronRight />
        </button>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Go to last page"
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
