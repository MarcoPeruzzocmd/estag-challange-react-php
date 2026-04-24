import "./styles/HomeForm.css";
import { useState } from "react";
import ProtectedInput from "../basics/ProtectedInput";
import ProtectedSelect from "../basics/ProtectedSelect";

function HomeForm({ onAdd, products, categories }) {
  const [product_code, setProductCode] = useState("");
  const [amount, setAmount] = useState("");

  const selectedProduct = products.find(
    (p) => p.code == product_code
  );

  const selectedCategory = categories.find(
    (c) => c.code == selectedProduct?.category_code
  );

  function handleSubmit(e) {
    e.preventDefault();
    const orderItem = {
      product_code: selectedProduct?.code || "",
      amount: amount,
      price: selectedProduct?.price || 0,
      tax: selectedCategory?.tax || 0,
    };
    onAdd(orderItem);
    setProductCode("");
    setAmount("");
  }

  return (
      <form className="fProduct" onSubmit={handleSubmit}>
        <div className="inputCima">
          <ProtectedSelect
            id="select"
            value={product_code}
            onChange={(e) => setProductCode(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {products.map((prod) => (
              <option key={prod.code} value={prod.code}>
                {prod.name}
              </option>
            ))}
          </ProtectedSelect>
        </div>
        <div className="inputBaixo">
          <ProtectedInput
            type="number"
            id="amount"
            placeholder="Amount"
            className="amountInput"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ProtectedInput
            type="text"
            id="tax"
            disabled
            placeholder="Tax value"
            className="taxInput"
            value={selectedCategory?.tax || ""}
          />
          <ProtectedInput
            type="text"
            id="price"
            disabled
            placeholder="Price"
            className="priceInput"
            value={selectedProduct?.price || ""}
          />
        </div>
        <button type="submit">Add product</button>
      </form>
  );
}

export default HomeForm;
