import { SetStateAction, useState } from "react";

export const usePagination = (
  perPageRecords: number,
  totalPageRecords: number
) => {
  const totalPages = Math.max(totalPageRecords / perPageRecords);
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const displayPAge = (pageNo: number) => {
    setCurrentPageIndex(pageNo);
    let end_page_index = perPageRecords * pageNo - 1;
    let start_page_index = perPageRecords * pageNo - perPageRecords;
    setStartPageIndex(start_page_index);

    if (end_page_index > totalPageRecords) {
      setEndPageIndex(totalPageRecords);
    } else {
      setEndPageIndex(end_page_index);
    }
  };
  return [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    displayPAge,
  ];
};
