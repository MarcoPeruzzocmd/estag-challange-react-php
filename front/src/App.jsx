import Nav from "./components/basics/Nav";
import Products from "./components/pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
