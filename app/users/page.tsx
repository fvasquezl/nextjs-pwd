"use client";
import ReactPaginate from "react-paginate"; // for pagination
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
// import { IconContext } from "react-icons"; // for customizing icons
import { useEffect, useMemo, useState } from "react";
const data = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const Users = () => {
  const [page, setPage] = useState(0);
  const n = 3;

  const filterData = useMemo(() => {
    return data.filter((item, index) => {
      return index >= page * n && index < (page + 1) * n;
    });
  }, [page]);

  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item, index) => <li key={index}>Item #{item}</li>)}
      </ul>
      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(data.length / n)}
        breakLabel="..."
        previousLabel="< previous"
        nextLabel="next >"
      />
      ;
    </>
  );
};

export default Users;
