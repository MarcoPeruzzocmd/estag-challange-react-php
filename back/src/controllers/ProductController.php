<?php
require_once __DIR__ . '/../classes/ProductClass.php';
require_once __DIR__ . '/../controllers/CategoryController.php';
class ProductController
{
    private $product;
    private $myPDO;
    public function __construct($myPDO)
    {
        $this->product = new Product($myPDO);
        $this->myPDO = $myPDO;
    }
    public function indexProducts()
    {
        return $this->product->getProducts();
    }
    public function getProductsSelect()
    {
        return $this->product->getProductsSelect();
    }
    public function createProduct($name, $amount, $price, $category)
    {
        if (!preg_match('/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s]*$/', $name)) {
            return ['error' => 'The first character must be a letter.'];
        }
        if (empty($name) || empty($amount) || empty($price) || empty($category)) {
            return ['error' => 'Please fill in all fields.'];
        }
        if ($amount > 100000) {
            return ['error' => 'Product quantity must be at most 100000 units'];
        }
        if (!is_numeric($amount) || $amount < 0) {
            return ['error' => 'The quantity field must be a positive number'];
        }
        if (!is_numeric($price) || $price < 0) {
            return ['error' => 'The price field must be a positive number'];
        }
        if (strlen($name) > 30) {
            return ['error' => 'Product name must be at most 30 characters.'];
        }
        if ($this->existProduct($name)) {
            return ['error' => 'This product already exists.'];
        }
        $this->product->createProduct($name, $amount, $price, $category);
        return ['success' => 'Product created successfully'];
    }

    public function deleteProduct($code)
    {
        $sql = "SELECT * FROM order_item WHERE product_code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $orderItems = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($orderItems)) {
            return ['error' => 'This product cannot be deleted because it is associated with a cart or order'];
        }
        $this->product->deleteProduct($code);
        return ['success' => 'Product deleted'];
    }
    public function existProduct($name)
    {
        $normalized = strtolower(preg_replace('/\s+/', ' ', trim($name)));
        $sql = "SELECT COUNT(*) FROM products WHERE LOWER(REGEXP_REPLACE(TRIM(name), '\s+', ' ', 'g')) = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$normalized]);
        return $statement->fetchColumn() > 0;
    }
    public function getTaxByProductCode($code)
    {
        $sql = "SELECT c.tax FROM categories c
                INNER JOIN products p ON p.category_code = c.code
                WHERE p.code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['tax'] : null;
    }
    public function getProductByCode($code)
    {
        $sql = "SELECT * FROM products WHERE code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        return $statement->fetch(PDO::FETCH_ASSOC) ?: null;
    }
};
