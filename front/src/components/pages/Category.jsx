import CategoryForm from "../categories/CategoryForm";
import CategoryTable from "../categories/CategoryTable";
import { useState, useEffect } from "react";
import { getCategories, deleteCategory, createCategory } from "../../services/categoryService";
function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [])

  async function handleDelete(code) {
    try {
      await deleteCategory(code);
      const filtered = categories.filter((c) => c.code !== code);
      setCategories(filtered);
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleAdd(category) {
    try {
      await createCategory(category);
      const updated = await getCategories();
      setCategories(updated);
    } catch (error) {
      alert(error.message);
    }
  }
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
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
