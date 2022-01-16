import { useEffect, useState } from "react";

/**
Given a list of a generic T type, this hook will handle the pagination logic and provide navigation methods.

Example:
Objective is to navigate and display only 8 products per page from a list fetched from an api.
**/

interface State<T> {
  page: number; // Current page
  pageCount: number; // Total number of pages
  itemsPerPage: number; // Number of items per page
  pageItems: Array<T>; // Items from the current page
  setPage: (page: number) => void; // Set page number
}

export default function usePagination<T>(
  list: Array<T>, // List of a generic T type
  itemsPerPage: number // Number of items to display per page
): State<T> {
  // State
  const [page, setActivePage] = useState<number>(0);
  const [pageItems, setPageItems] = useState<T[]>([]);
  // Variables
  const pageCount = Math.ceil(list.length / itemsPerPage);

  const setPage = (page: number) => {
    if (page >= 0 && page < pageCount) setActivePage(page);
  };

  useEffect(() => {
    const firstItemIndex = page * itemsPerPage;
    const lastItemIndex = page * itemsPerPage + itemsPerPage;
    setPageItems(list.slice(firstItemIndex, lastItemIndex));
  }, [list, page]);

  return {
    page,
    pageCount,
    itemsPerPage,
    pageItems,
    setPage,
  };
}
