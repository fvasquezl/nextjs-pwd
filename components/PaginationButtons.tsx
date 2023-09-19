import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PaginationButtons = () => {
  return (
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

        <div>
          <ReactPaginate
            containerClassName={"paginationBttns"}
            activeClassName={"paginationActive"}
            pageCount={10}
            pageRangeDisplayed={3}
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
        </div>
      </div>
    </div>
  );
};

export default PaginationButtons;
