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
  nextPage: () => void; // Go to next page
  previousPage: () => void; // Go to previous page
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

  const setPage = (newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) setActivePage(newPage);
  };

  const nextPage = () => {
    if (page + 1 >= 0 && page + 1 < pageCount) setActivePage(page + 1);
  }
  
  const previousPage = () => {
    if (page - 1 >= 0 && page - 1 < pageCount) setActivePage(page - 1);
  }

  useEffect(() => {
    const firstItemIndex = page * itemsPerPage;
    const lastItemIndex = page * itemsPerPage + itemsPerPage;
    setPageItems(list.slice(firstItemIndex, lastItemIndex));
  }, [list, page]);

  return {
    page, // Current page
    pageCount, // Total number of pages
    itemsPerPage, // Number of items per page
    pageItems, // Items from the current page
    setPage, // Set page number
    nextPage, // Go to next page
    previousPage // Go to previous page
  };
}
