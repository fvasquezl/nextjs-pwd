"use client";
import Pagination from "@mui/material/Pagination";
import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";

type Item = {
  id: number;
  title: string;
  body: string;
};

const User: React.FC<{}> = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const n = 10;

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

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
      return index < n * page && index >= n * (page - 1);
    });
  }, [items, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoading(true);
    setPage(value);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {filterData &&
            filterData.map((item: Item, index) => (
              <Root key={index}>
                <div>
                  <h2>{item.title}</h2>
                  <h3>{item.body}</h3>
                </div>
                <Divider />
              </Root>
            ))}

          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              shape="rounded"
              color="secondary"
              count={count}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default User;
