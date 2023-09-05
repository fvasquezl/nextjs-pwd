import Category from "./Category";

interface CategoryProps {
  id: string;
  name: string;
  description: string;
}

const CategoryList = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <ul>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoryList;
