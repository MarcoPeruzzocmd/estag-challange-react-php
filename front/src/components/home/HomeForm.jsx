import "./styles/HomeForm.css";
import { getProducts } from "../../services/productServices";
import { useState, useEffect } from "react";

function HomeForm({onAdd, products, categories }) {
  const [product_code, setProductCode] = useState("");
  const [amount, setAmount] = useState("");
  const selectedProduct = products.find(
  (p) => p.code == product_code
);
const selectedCategory = categories.find(
  (c) => c.code == selectedProduct?.category_code)

function handleSubmit(e) {
  e.preventDefault();
  const orderItem = {
    product_code: selectedProduct.code,
    amount: amount,
    price: selectedProduct.price,
    tax: selectedCategory?.tax || 0
  };
  onAdd(orderItem);
  setProductCode("");
  setAmount("");
}
  return (
    <>
      <form action="" method="post" class="fProduct" onSubmit={handleSubmit}>
        <div class="inputCima">
          <select
            id="select"
            placeholder="Product"
            onChange={(e) => setProductCode(e.target.value)}
            products={products}
          >
            <option value="">Selecione uma categoria</option>
            {products.map((prod) => (
              <option key={prod.code} value={prod.code}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>
        <div class="inputBaixo">
          <input
            type="number"
            name=""
            id="amount"
            placeholder="Amount"
            class="amountInput"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            name=""
            id="tax"
            disabled
            placeholder="Tax value"
            class="taxInput"
            value={selectedCategory?.tax || ""}
          />
          <input
            type="text"
            name=""
            id="price"
            disabled
            placeholder="Price"
            class="priceInput"
            value={selectedProduct?.price || ""}  
          />
        </div>

        <button type="submit">
          Add product
        </button>
      </form>
    </>
  );
}
export default HomeForm;
