import Category from "./Category";

const CategoryList = ({ categories }) => {
  return (
    <ul>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoryList;
