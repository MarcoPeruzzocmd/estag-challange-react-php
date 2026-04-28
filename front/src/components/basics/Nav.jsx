import "./styles/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">
            <h1>Suite Store</h1>
          </Link>
        </li>
        <li className="links">
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
