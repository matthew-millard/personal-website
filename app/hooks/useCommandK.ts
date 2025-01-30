import { Dispatch, SetStateAction, useEffect } from "react";

export default function useCommandK(
  setOpenSearch: Dispatch<SetStateAction<boolean>>,
) {
  return useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpenSearch(true);
      }
    };
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [setOpenSearch]);
}
