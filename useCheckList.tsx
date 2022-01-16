import { useEffect, useState } from "react";

/**
This hook takes a given list of a generic T type and adds a checklist logic.

Example:
From a given list of notifications the user should be able to select one at a time or all of them at once to perform certain actions later, such as deleting.

**/

interface CheckInterface {
  checked?: boolean;
}

interface State<T extends CheckInterface> {
  list: Array<T>; // List of generic T type
  checkAll: () => void; // Check all items
  checkItem: (item: T) => void; // Checks a given item
}

export default function useCheckList<T extends CheckInterface>(
  list: Array<T>
): State<T> {
  // State
  const [checkList, setCheckList] = useState<T[]>(list);

  useEffect(() => {
    setCheckList(list);
  }, [list]);

  const checkAll = () => {
    const isOneChecked = checkList.find((item) => item.checked);
    setCheckList((state) =>
      state.map((item) => {
        return { ...item, checked: isOneChecked ? false : true };
      })
    );
  };

  const checkItem = (clickedItem: T) => {
    setCheckList((state) =>
      state.map((item) =>
        item === clickedItem ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return {
    list: checkList, // List of generic T type
    checkAll, // Check all items
    checkItem, // Checks a given item
  };
}
