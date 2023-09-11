import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";

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
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default page;
