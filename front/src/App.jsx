import Nav from "./components/basics/Nav";
import Home from "./components/Home";
import Contato from "./components/Contato";
import Empresa from "./components/Empresa";
import {useState} from 'react'
import {BrowserRouter as Router, Switch, Routes, Route,Link} from 'react-router-dom'
function App() {
  return (
    <Router>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/empresa">Empresa</Link></li>
        <li><Link to="/contato">Contato</Link></li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
);
}

export default App;