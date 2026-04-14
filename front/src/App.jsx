import ProductTable from "./components/products/ProductTable";
import { useState } from "react";
import ProductForm from "./components/products/ProductForm";
import Nav from "./components/basics/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);

  function handleDelete(code) {}

  return (
    <>
    <Nav/>
      <div className="container">
        <ProductForm />
        <ProductTable products={products} onDelete={handleDelete} />
      </div>
    </>
  );
}
export default App;
