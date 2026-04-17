import ProductForm from "../products/ProductForm";
import ProductTable from "../products/ProductTable";
import { useState, useEffect } from "react";
import {
  getProducts,
  createProducts,
  deleteProduct,
} from "../../services/productServices";
import { getCategories } from "../../services/categoryService";
function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
    getCategories().then(setCategories);
  }, []);

  async function handleDelete(code) {
    try {
      const res = await deleteProduct(code);
      alert(JSON.stringify(res));
      const filtered = products.filter((p) => p.code !== code);
      setProducts(filtered);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }
  async function handleAdd(product) {
    await createProducts(product);
    const updated = await getProducts();
    setProducts(updated);
  }
  return (
    <div className="container">
      <ProductForm onAdd={handleAdd} categories={categories}/>
      <ProductTable
        products={products}
        categories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
}
export default Products;
