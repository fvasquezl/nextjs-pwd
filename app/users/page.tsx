"use client";
import Pages from "@/components/Pages";
import { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const paginationFunc = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setData(data);
    };
    paginationFunc();
  }, []);

  return <>{data.length > 0 ? <Pages data={data} /> : <p>Loading</p>}</>;
};

export default Users;
