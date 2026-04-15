import CategoryForm from "../categories/CategoryForm";
import CategoryTable from "../categories/CategoryTable";
import { useState } from "react";
function Category() {
  const [categories, setCategories] = useState([]);

  function handleDelete(code) {
    const filtered = categories.filter((c) => c.code !== code);
    setCategories(filtered);
  }
  return (
    <>
    <div className="container">
      <CategoryForm />
      <CategoryTable categories={categories} onDelete={handleDelete}/>
    </div>
    </>
  );
}
export default Category;
