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
        <div className="links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
export default Nav;
