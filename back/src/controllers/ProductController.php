<?php
require_once __DIR__ . '/../classes/ProductClass.php';
require_once __DIR__ . '/../controllers/CategoryController.php';
class ProductController {
    private $product;
    private $categoryController;
    private $myPDO;
    public function __construct($myPDO) {
        $this->product = new Product($myPDO);
        $this->categoryController = new CategoryController($myPDO);
        $this->myPDO = $myPDO;
    }
    public function indexProducts(){
        return $this->product->getProducts();
    }
    public function getProductsSelect(){
        return $this->product->getProductsSelect();
    }
    public function createProduct($name, $amount, $price, $category) {
        if (!preg_match('/^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9\s]*$/', $name)){
           return 'O primeiro caractere precisa obrigatoriamente ser uma letra.';
        }
        if ($amount > 100000) {
            return 'A quantidade do produto deve ser de no máximo 100000 unidades';
        } 
        if (empty($name) || empty($amount) || empty($price) || empty($category)) {
            return 'Preencha todos os campos possíveis.';
        }
        if (!is_numeric($amount) || $amount < 0) {
            return'O campo de quantidade deve ser um número positivo';
        }
        if (!is_numeric($price) || $price < 0) {
            return 'O campo de preço deve ser um número positivo';
        }
        if (strlen($name) > 30) {
            return 'O nome do produto deve ter no mínimo 30 caracteres.';
        }
        if ($this->existProduct($name)) {
            return 'Esse produto já existe.';
        }
        $this->product->createProduct($name, $amount, $price, $category);
    }
    public function deleteProduct($code) {
        $sql = "SELECT * FROM order_item WHERE product_code = ?";
        $statement = $this->myPDO->prepare($sql);
        $statement->execute([$code]);
        $categories = $statement->fetchAll(PDO::FETCH_ASSOC);

        if(!empty($categories)){
            return 'Esse produto não pode ser deletado pois já está associado a um carrinho ou compra';
        }
        $this->product->deleteProduct($code);

    }
    public function existProduct($name)
    {
        $normalized = strtolower(preg_replace('/\s+/', ' ', trim($name)));
        foreach ($this->product->getProducts() as $prod) {
        $existingName = strtolower(preg_replace('/\s+/', ' ', trim($prod['name'])));
            if ($existingName == $normalized) {
                return true;
            }
        }
    }
    public function getTaxByProductCode($code) {
        $products = $this->indexProducts();
        $categoryController = $this->categoryController->indexCategories();
        foreach($products as $product){
            if($product['code'] == $code){
                foreach($categoryController as $category){
                    if($category['code'] == $product['category_code']){
                        return $category['tax'];
                    }
                }
            }
        }
    }
    public function getProductByCode($code) {
        $products = $this->indexProducts();
        foreach($products as $product){
            if($product['code'] == $code){
                return $product;
            }
        }
    }
};