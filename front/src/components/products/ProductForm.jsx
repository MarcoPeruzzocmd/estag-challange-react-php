import "./styles/ProductForm.css";
import { useState } from "react";
import ProtectedInput from "../basics/ProtectedInput";
import ProtectedSelect from "../basics/ProtectedSelect";

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
      <form className="fProduct" onSubmit={handleSubmit}>
        <div className="inputCima">
          <ProtectedInput
            maxLength="30"
            placeholder="Product name"
            type="text"
            name="product"
            id="product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputBaixo">
          <ProtectedInput
            placeholder="Amount"
            type="number"
            name="amount"
            id="amount"
            className="amountInput"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ProtectedInput
            placeholder="Price"
            step="0.01"
            type="number"
            name="price"
            id="price"
            className="priceInput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <ProtectedSelect
            name="category"
            id="select"
            className="categoryInput"
            value={category_code}
            onChange={(e) => setCategoryCode(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.name}
              </option>
            ))}
          </ProtectedSelect>
        </div>
        <button type="submit" name="add" id="addBtn">
          Add Product
        </button>
      </form>
    </>
  );
}

export default ProductForm;
