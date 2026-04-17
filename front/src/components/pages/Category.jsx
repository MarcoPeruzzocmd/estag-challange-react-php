import CategoryForm from "../categories/CategoryForm";
import CategoryTable from "../categories/CategoryTable";
import { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../../services/categoryService";
function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(data => setCategories(data))
  }, [])

  async function handleDelete(code) {
  try {
    const res = await deleteCategory(code)
    alert(JSON.stringify(res)) // 👈 veja o que vem
    const filtered = categories.filter((c) => c.code !== code);
    setCategories(filtered);
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
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
