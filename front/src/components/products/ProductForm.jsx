import "./styles/ProductForm.css";
import { useState, useEffect } from "react";
function ProductForm({ onAdd, categories }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [category_code, setCategoryCode] = useState("");
 
  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name, amount, price, category_code });
    setName("");
    setAmount("");
    setPrice("");
    setCategoryCode("");
  }
  return (
    <>
      <form
        action=""
        method="post"
        className="fProduct"
        onSubmit={handleSubmit}
      >
        <div className="inputCima">
          <input
            maxlength="30"
            placeholder="Product name"
            type="text"
            name="product"
            id="product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputBaixo">
          <input
            placeholder="Amount"
            type="number"
            name="amount"
            id="amount"
            className="amountInput"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            placeholder="Price"
            step="0.01"
            type="number"
            name="price"
            id="price"
            className="priceInput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            name="category"
            id="select"
            className="categoryInput"
            value={category_code}
            onChange={(e) => setCategoryCode(e.target.value)}
            categories={categories}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" name="add" id="addBtn">
          Add Product
        </button>
      </form>
    </>
  );
}
export default ProductForm;
