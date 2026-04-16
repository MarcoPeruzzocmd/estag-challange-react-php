import Nav from "./components/basics/Nav";
import Products from "./components/pages/Products";
import Category from "./components/pages/Category";
import Home from "./components/pages/Home";
import History from "./components/pages/History";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Category/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;
