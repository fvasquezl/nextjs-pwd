"use client";
import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

const Categories = () => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const n = 10;

  const filterData = useMemo(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/categories");
      setItems(res.data);
      setLoading(false);
    };
    getData();

    return items.filter((item, index) => {
      return index >= page * n && index < (page + 1) * n;
    });
  }, [items, page]);

  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(items.length / n)}
        breakLabel="..."
        previousLabel="< previous"
        nextLabel="next >"
      />
    </>
  );
};





export default Categories;
