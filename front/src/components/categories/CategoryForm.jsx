import "./styles/CategoryForm.css";
import { useState } from "react";
import ProtectedInput from "../basics/ProtectedInput";

function CategoryForm({ onAdd }) {
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name, tax });
    setName("");
    setTax("");
  }

  return (
      <form id="form" className="fProduct" onSubmit={handleSubmit}>
        <div className="addProduct" id="addProduct">
          <ProtectedInput
            maxLength="30"
            className="categoriesInput"
            placeholder="Categories"
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ProtectedInput
            className="taxInput"
            placeholder="Tax"
            type="number"
            name="tax"
            id="tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <button type="submit" id="add">
          Add Category
        </button>
      </form>
  );
}

export default CategoryForm;
