import ProductForm from "../products/ProductForm";
import ProductTable from "../products/ProductTable";
import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  function handleDelete(code) {
    const filtered = products.filter((p) => p.code !== code);
    setProducts(filtered);
  }

  return (
    <div className="container">
      <ProductForm />
      <ProductTable products={products} onDelete={handleDelete} />
    </div>
  );
}
export default Products;
