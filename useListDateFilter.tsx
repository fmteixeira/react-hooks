import { useEffect, useState } from "react";

/**
Given a list of a generic object T type with one key with a date value, this hook will filter the list using a given date range.

Example:
Objective is to filter a list of news based off creation date using a date range picker.
List with objects of a news type: [{ title: "New React version!", creationDate: Date }, ...]
Using the given date range, this will filter all the news by checking if the "creationDate" is within the range.
**/

interface State<T> {
  startDate: Date | null; // Current start date from date range
  endDate: Date | null; // Current end date from date range
  listByDate: T[]; // Filtered list
  setStartDate: (date: Date | null) => void; // Set the start date
  setEndDate: (date: Date | null) => void; // Set the end date
}

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export default function useListDateFilter<
  T extends object,
  K extends KeysMatching<T, Date>
>(
  list: T[], // List with objects of generic type T to be filtered
  dateKey: K, // Key with Date value from generic object T
  initialStartDate?: Date,
  initialEndDate?: Date
): State<T> {
  // Remove hours from Date values
  initialStartDate?.setHours(0, 0, 0, 0);
  initialEndDate?.setHours(0, 0, 0, 0);

  // State - Date Filter
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ?? null
  );
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);

  // State - List By Date
  const [listByDate, setListByDate] = useState<T[]>(list);

  useEffect(() => {
    // Filter list by date
    const newList = list.filter((item) => {
      // Clear Hours
      // @ts-ignore
      const date: Date = item[dateKey].setHours(0, 0, 0, 0);

      if (!(item[dateKey] instanceof Date)) {
      } else if (!startDate) {
        return item;
      } else if (!endDate && date >= startDate) {
        return item;
      } else if (
        startDate.getTime() === endDate?.getTime() &&
        date >= startDate
      ) {
        return item;
      } else if (endDate && date >= startDate && date <= endDate) {
        return item;
      }
    });
    setListByDate(newList);
  }, [list, startDate, endDate]);

  return {
    startDate, // Current start date from date range
    endDate, // Current end date from date range
    listByDate, // Filtered list
    setStartDate, // Set the start date
    setEndDate, // Set the end date
  };
}
