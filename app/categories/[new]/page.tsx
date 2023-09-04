import AddCategory from "@/components/AddCategory";
import CategoryList from "@/components/CategoryList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const page = async () => {
  const categories = await getData();
  console.log(categories);
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Categories App</h1>
        <AddCategory />
      </div>
      <CategoryList categories={categories} />
    </div>
  );
};

export default page;
