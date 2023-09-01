import Category from "@/components/Category";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}

async function getUsersData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: object;
  company: string;
}

interface MyParameters {
  user: User;
  id: number;
  title: string;
  body: string;
}

const Categories = async () => {
  // const categories = await getData();
  const [categories, users] = await Promise.all([getData(), getUsersData()]);
  console.log(categories);
  return (
    <div>
      {users.map((user: User, index: number) => (
        <p key={index}>{user.name}</p>
      ))}

      {categories.map((item: MyParameters) => (
        <h1 key={item.id}>
          <Category {...item} />
        </h1>
      ))}
    </div>
  );
};

export default Categories;
