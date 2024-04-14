import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchFeatures } from "@/lib/api";
import {
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";

export const useFeatures = (initialPage = 1, initialPageSize = 10) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPage,
    pageSize: initialPageSize,
  });

  useEffect(() => {
    console.log("El número de la página ha cambiado: ", pagination.pageIndex);
  }, [pagination.pageIndex]);

  const featuresQuery = useQuery({
    queryKey: ["features", pagination],
    queryFn: () => fetchFeatures(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  console.log("metadata de la query: ", featuresQuery.data?.metada);

  const table = useReactTable({
    data: featuresQuery.data?.features || [],
    columns: columns,
    rowCount: featuresQuery.data?.metada.record_count,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const canTablePrevPage = () => {
    return pagination.pageIndex > 1 ? true : false;
  };

  const canTableNextPage = () => {
    return pagination.pageIndex < table.getPageCount() ? true : false;
  };

  const tableFirstPage = () => {
    setPagination({ ...pagination, pageIndex: 1 });
  };

  const tablePrevPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  };

  const tableNextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };

  const tableLastPage = () => {
    setPagination({
      ...pagination,
      pageIndex: featuresQuery.data?.metada.page_count || 1,
    });
  };

  return {
    featuresQuery,
    table,
    pagination,
    tableFirstPage,
    tablePrevPage,
    tableNextPage,
    tableLastPage,
    canTablePrevPage,
    canTableNextPage,
  };
};
