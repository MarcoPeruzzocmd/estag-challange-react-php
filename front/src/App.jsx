import Nav from "./components/basics/Nav";
import Products from "./components/pages/Products";
import Category from "./components/pages/Category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Category/>}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;
