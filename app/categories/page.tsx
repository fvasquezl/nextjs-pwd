"use client";
import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";
import { useEffect, useState } from "react";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories?cursor=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [page, setLoading]);

  useEffect(() => {
    if (data) {
      setPageCount(data.pagination.pageCount);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }
  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              List Categoriesd
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <AddCategory />
          </div>
        </div>
        <div className="mt-6 border-t border-gray-400 ">
          <CategoryList categories={data.items} />
        </div>
      </div>
      Page:{page}
      <br />
      Page Count: {pageCount}
      <br />
      <button disabled={page === 1} onClick={handlePrevious}>
        Previous
      </button>
      <button disabled={page === pageCount} onClick={handleNext}>
        Next
      </button>
    </>
  );
};

export default Categories;
