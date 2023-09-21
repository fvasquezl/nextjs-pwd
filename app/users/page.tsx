"use client";

import { SetStateAction, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Item = {
  id: number;
  title: string;
  body: string;
};

const User: React.FC<{}> = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const n = 10;

  useEffect(() => {
    setLoading(true);
    const paginationFunc = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setCount(Math.ceil(data.length / n));
      setItems(data);
      setTimeout(() => setLoading(false), 500);
    };
    paginationFunc();
  }, []);

  const filterData = useMemo(() => {
    return items.filter((item, index) => {
      return index >= page * n && index < (page + 1) * n;
    });
  }, [items, page]);

  const handleChange = (selectedPage: { selected: SetStateAction<number> }) => {
    console.log(count, selectedPage.selected);
    setLoading(true);
    setPage(selectedPage.selected);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ul role="list" className="divide-y divide-gray-100">
            {filterData &&
              filterData.map((item: Item, index) => (
                <li
                  key={index}
                  className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-200 sm:px-6 lg:px-8"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="first-letter:capitalize font-semibold leading-6 text-gray-900">
                        {item.id}: {item.title}
                      </p>
                      <p className="first-letter:capitalize mt-1 text-sm leading-5 text-gray-500">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>

          <ReactPaginate
            containerClassName={"paginationBttns"}
            activeClassName={"paginationActive"}
            onPageChange={handleChange}
            forcePage={page}
            pageCount={count}
            previousLabel={
              <span className="paginationBttns">
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            }
            nextLabel={
              <span className="paginationBttns">
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            }
          />
        </>
      )}
    </>
  );
};

export default User;
