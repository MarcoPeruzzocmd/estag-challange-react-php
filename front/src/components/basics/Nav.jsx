import "./styles/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link to="/">
            <a href="index.php">
              <h1>Suite Store</h1>
            </a>
          </Link>
        </li>
        <div className="links">
          <li>
            <Link to="/products">
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <a>Categories</a>
            </Link>
          </li>
          <li>
            <a href="history.php">History</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
export default Nav;
