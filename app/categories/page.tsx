"use client";
import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";
import { useEffect, useState } from "react";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // const [categories, setCategories] = useState([]);
  // const [cursor, setCursor] = useState("");
  // const [take, setTake] = useState(10);
  // const [fetchDataOnMount, setFetchDataOnMount] = useState(false);

  // useEffect(() => {
  //   if (fetchDataOnMount) {
  //     fetchData(); // Ejecuta la lógica de solicitud de datos solo si fetchDataOnMount es true
  //   }
  // }, [fetchDataOnMount]); //

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/categories?cursor=${cursor}&take=${take}`
  //     );

  //     const data = await res.json();
  //     if (data.length > 0) {
  //       const lastCategory = data[data.length - 1];
  //       setCursor(lastCategory.id); // Update the cursor for the next page
  //     }
  //     setCategories(data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // const handleFetchDataClick = () => {
  //   // Al hacer clic en el botón, cambia el estado para permitir la ejecución del useEffect
  //   setFetchDataOnMount(true);
  // };

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
      <div className="mt-6 border-t border-gray-400 ">
        <CategoryList categories={categories} />
      </div>

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
