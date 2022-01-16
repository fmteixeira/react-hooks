import { useEffect, useState } from "react";
// Components
// Context
// Hooks
// Pages
// Resources

interface CheckInterface {
  checked?: boolean;
}

interface State<T extends CheckInterface> {
  list: Array<T>;
  checkAll: () => void;
  checkItem: (item: T) => void;
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
    list: checkList,
    checkAll,
    checkItem,
  };
}
