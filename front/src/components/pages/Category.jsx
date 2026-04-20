import CategoryForm from "../categories/CategoryForm";
import CategoryTable from "../categories/CategoryTable";
import { useState, useEffect } from "react";
import { getCategories, deleteCategory, createCategory } from "../../services/categoryService";
function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(data => setCategories(data))
  }, [])

  async function handleDelete(code) {
  try {
    const res = await deleteCategory(code)
    if (res.error){
      alert(res.error)
      return
    }
    const filtered = categories.filter((c) => c.code !== code);
    setCategories(filtered);
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
}
async function handleAdd(category) {
  try {
    const res = await createCategory(category)
    if (res.error) {
      alert(res.error)
      return
    }
    const updated = await getCategories()
    setCategories(updated)
  } catch (error) {
    console.error("Erro ao adicionar:", error)
  }
}
  return (
    <>
    <div className="container">
      <CategoryForm onAdd={handleAdd}/>
      <CategoryTable categories={categories} onDelete={handleDelete}/>
    </div>
    </>
  );
}
export default Category;
