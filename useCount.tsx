import { useEffect, useState } from "react";
// Components
// Context
// Hooks
// Pages
// Resources
interface CountInterface {
  count: number;
}

interface State<T extends CountInterface> {
  list: Array<T>;
  incrementCount: (item: T) => void;
  decrementCount: (item: T) => void;
  setCount: (item: T, count: number) => void;
}

export default function useCheckList<T extends CountInterface>(
  list: Array<T>,
  allowAnyCount?: boolean
): State<T> {
  // State
  const [checkList, setCheckList] = useState<T[]>(list);

  useEffect(() => {
    setCheckList(list);
  }, [list]);

  const incrementCount = (clickedItem: T) => {
    setCheckList((state) =>
      state.map((item) =>
        item === clickedItem
          ? { ...item, count: item.count + 1 >= 0 ? item.count + 1 : 0 }
          : item
      )
    );
  };

  const decrementCount = (clickedItem: T) => {
    setCheckList((state) =>
      state.map((item) =>
        item === clickedItem
          ? allowAnyCount
            ? { ...item, count: item.count - 1 }
            : { ...item, count: item.count - 1 >= 0 ? item.count - 1 : 0 }
          : item
      )
    );
  };

  const setCount = (clickedItem: T, count: number) => {
    setCheckList((state) =>
      state.map((item) =>
        item === clickedItem
          ? allowAnyCount
            ? { ...item, count }
            : { ...item, count: count >= 0 ? count : 0 }
          : item
      )
    );
  };

  return {
    list: checkList,
    incrementCount,
    decrementCount,
    setCount,
  };
}
