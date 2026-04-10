import './styles/Nav.css'
function Nav() {
    return(
        <nav className="menu">
        <ul>
            <li>
                <a href="index.php">
                    <h1>Suite Store</h1>
                </a>
            </li>
            <div className="links">
                <li><a href="product.php">Products</a></li>
                <li><a href="category.php">Categories</a></li>
                <li><a href="history.php">History</a></li>
            </div>
        </ul>
    </nav>
    )
}
export default Nav