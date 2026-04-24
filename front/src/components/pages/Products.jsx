import ProductForm from "../products/ProductForm";
import ProductTable from "../products/ProductTable";
import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(code) {
    try {
      await deleteProduct(code);
      const filtered = products.filter((p) => p.code !== code);
      setProducts(filtered);
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleAdd(product) {
    try {
      await createProduct(product);
      const updated = await getProducts();
      setProducts(updated);
    } catch (error) {
      alert(error.message);
    }
  }
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  return (
    <div className="container">
      <ProductForm onAdd={handleAdd} categories={categories} />
      <ProductTable
        products={products}
        categories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
}
export default Products;
