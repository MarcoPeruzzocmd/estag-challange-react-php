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
            return ['error' => 'O primeiro caractere precisa obrigatoriamente ser uma letra.'];
        }
        if (empty($name) || empty($amount) || empty($price) || empty($category)) {
            return ['error' => 'Preencha todos os campos possíveis.'];
        }
        if ($amount > 100000) {
            return ['error' => 'A quantidade do produto deve ser de no máximo 100000 unidades'];
        }
        if (!is_numeric($amount) || $amount < 0) {
            return ['error' => 'O campo de quantidade deve ser um número positivo'];
        }
        if (!is_numeric($price) || $price < 0) {
            return ['error' => 'O campo de preço deve ser um número positivo'];
        }
        if (strlen($name) > 30) {
            return ['error' => 'O nome do produto deve ter no máximo 30 caracteres.'];
        }
        if ($this->existProduct($name)) {
            return ['error' => 'Esse produto já existe.'];
        }
        $this->product->createProduct($name, $amount, $price, $category);
        return ['success' => 'Produto criado com sucesso'];
    }

    public function deleteProduct($code)
    {
        $sql = "SELECT * FROM order_item WHERE product_code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $orderItems = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($orderItems)) {
            return ['error' => 'Esse produto não pode ser deletado pois já está associado a um carrinho ou compra'];
        }
        $this->product->deleteProduct($code);
        return ['success' => 'Produto deletado'];
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
