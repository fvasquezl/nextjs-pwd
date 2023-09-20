"use client";
import Pagination from "@mui/material/Pagination";
import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";

const User = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const n = 10;

  useEffect(() => {
    const paginationFunc = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };
    paginationFunc();
  }, []);

  const filterData = useMemo(() => {
    return items.filter((item, index) => {
      return index < n * page && index >= n * (page - 1);
    });
  }, [items, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item, index) => (
            <li key={index}>
              <div>
                <h2>{item.id}</h2>
              </div>
              <h3>{item.title}</h3>
            </li>
          ))}
      </ul>
      <Stack spacing={2}>
        <Pagination
          variant="outlined"
          shape="rounded"
          color="secondary"
          count={Math.ceil(items.length / n)}
          page={page}
          onChange={handleChange}
        />{" "}
      </Stack>
    </>
  );
};

export default User;
