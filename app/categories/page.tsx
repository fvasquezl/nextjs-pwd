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

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium">1</span>
              to
              <span className="font-medium">10</span>
              of
              <span className="font-medium">97</span>
              results
            </p>
          </div>

          <ReactPaginate
            containerClassName={
              "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            }
            pageClassName={
              "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            }
            activeClassName={
              "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(items.length / n)}
            breakLabel="..."
            previousLabel="< previous"
            nextLabel="next >"
          />
        </div>
      </div>
    </>
  );
};





export default Categories;
